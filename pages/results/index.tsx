import { useEffect, useState } from 'react';
// Next
import { useRouter } from 'next/router';
import Link from 'next/link';
// Components
import PageContainer from '../../components/PageContainer';
import PriceCard from '../../components/PriceCard';
// Other
import { sets } from '../../setData';
// Utils
import { scrollTo } from '../../utils';

const API_URL: string = 'https://api.pokemontcg.io/v2/cards';

interface IProps {
  searchedCards: {}[];
}

const Results: React.FC<IProps> = ({ searchedCards }) => {
  const router = useRouter();
  const {
    query: { searched },
  } = router;

  const [searchTerm, setSearchTerm] = useState<string | string[]>('');
  const [isErrowShowing, setIsErrorShowing] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(['']);
  const [isSearchHistorySet, setIsSearchHistorySet] = useState(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (searched) {
      setSearchTerm(searched);
    }
  }, []);

  // Set search history state based on local storage on component render
  useEffect(() => {
    const localSearchHistory = localStorage.getItem('searchHistory');

    if (localSearchHistory) {
      setSearchHistory(JSON.parse(localSearchHistory));
      setIsSearchHistorySet(true);
    }
  }, []);

  // Once searchHistory is set from local storage add the search term to it
  useEffect(() => {
    if (isSearchHistorySet === true) {
      // Limit search history to last 10 searches
      const slicedSearchHistory: string[] = searchHistory.slice(
        searchHistory.length >= 9 ? searchHistory.length - 9 : 0,
        searchHistory.length
      );

      setSearchHistory([...slicedSearchHistory, searched]);
    }
  }, [isSearchHistorySet]);

  // Set search history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const renderCards = () => {
    const cards = searchedCards.length > 0 ? searchedCards : '';

    const ids: string[] = [];

    return cards.map((card, index) => {
      ids.push(card.id.split('-')[0]);
      if (index === cards.length - 1) {
        console.log(ids);
      }
      return (
        <>
          <div key={card.name} className='mx-5 my-10 w-full xl:w-5/12'>
            <PriceCard key={card.name} card={card} />
          </div>
        </>
      );
    });
  };

  return (
    <div className='bg-blackLighter min-w-screen min-h-screen'>
      <PageContainer>
        <div className='results'>
          {searchedCards.length === 0 && (
            <section
              id='search-results'
              className={`w-full flex flex-wrap xl:justify-center items-start relative`}
            >
              <h2 className='text-3xl md:text-5xl xl:text-7xl tracking-tighter mb-10 text-white w-full'>
                <span className='text-blue-400'>No </span>
                {`results for `}
                <span className='text-blue-400'>{`"${searchTerm}"`}</span>
              </h2>
            </section>
          )}
          {searchedCards.length > 0 && (
            <section
              id='search-results'
              className={`w-full flex flex-wrap xl:justify-center items-start relative`}
            >
              <h2 className='text-3xl md:text-5xl xl:text-7xl tracking-tighter mb-10 text-white w-full'>
                <span className='text-blue-400'>{searchedCards.length} </span>
                {`results for `}
                <span className='text-blue-400'>{`"${searchTerm}"`}</span>
              </h2>
              {renderCards()}
            </section>
          )}
          <div className='my-5'>
            <Link
              href={{
                pathname: '/search',
              }}
            >
              <a className='text-white border border-white rounded-xl py-4 px-6'>
                &#8592; Back to search
              </a>
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export async function getServerSideProps(context) {
  console.log('context.query.searched ===', context.query.searched);
  const searchTerm = context.query.searched;

  // By default request is for cards by name - q=name
  let apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}`;

  // If search term is a set - query=set.id
  sets.forEach((set) => {
    if (set.name === searchTerm) {
      apiUrl = `https://api.pokemontcg.io/v2/cards?q=set.id:${set.id}`;
    }
  });

  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'X-Api-Key': process.env.NEXT_PUBLIC_POKEMON_TCG_KEY!,
    },
  });

  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    console.log('results.getServerSideProps.fetchError', message);
  }

  const data = await res.json();
  const searchedCards = await data.data;

  return { props: { searchedCards } };
}

export default Results;
