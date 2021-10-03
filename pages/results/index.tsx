import { useEffect, useState, useRef } from 'react';
// Next
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
// Components
import PageContainer from '../../components/PageContainer';
import PriceCard from '../../components/PriceCard';
import Pagination from '../../components/Pagination';
import PageBanner from '../../components/PageBanner';
// Other
import { sets } from '../../setData';
// Utils
import { scrollTo } from '../../utils';

const API_URL: string = 'https://api.pokemontcg.io/v2/cards';

interface IProps {
  searchedCards: {}[];
}

const Results: React.FC<IProps> = ({ searchedCardData }) => {
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
  const CARD_LIMIT = 8;
  const [paginatedData, setPaginatedData] = useState();
  const [currentPage, setCurrentpage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const resultsRef = useRef();

  // On initial render set page count
  useEffect(() => {
    const pageCount = Math.ceil(searchedCardData.length / CARD_LIMIT);

    // debugger;

    setPageCount(pageCount);
  }, [searchedCardData.length]);

  // On initial render paginate data
  useEffect(() => {
    const slicedData = searchedCardData.slice(
      currentPage * CARD_LIMIT - CARD_LIMIT,
      currentPage * CARD_LIMIT
    );
    // debugger;
    setPaginatedData(slicedData);
  }, [currentPage]);

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
    const cards =
      paginatedData && paginatedData.length > 0 ? paginatedData : '';

    const ids: string[] = [];

    return cards.map((card, index) => {
      ids.push(card.id.split('-')[0]);
      if (index === cards.length - 1) {
        console.log(ids);
      }
      return (
        <>
          <div key={card.name} style={{ width: '500px' }} className='mx-5 my-8'>
            <PriceCard key={card.name} card={card} />
          </div>
        </>
      );
    });
  };

  return (
    <div className='bg-blackLighter min-w-screen min-h-screen'>
      <PageBanner linkTarget='search' />
      <PageContainer>
        <div className='results'>
          {searchedCardData.length === 0 && (
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
          {searchedCardData.length > 0 && (
            <section
              ref={resultsRef}
              id='search-results'
              className={`w-full flex flex-wrap xl:justify-center items-start relative`}
            >
              <h2 className='text-3xl md:text-5xl xl:text-7xl tracking-tighter mb-10 text-white w-full'>
                <span className='text-blue-400'>
                  {searchedCardData.length}{' '}
                </span>
                {`results for `}
                <span className='text-blue-400'>{`"${searchTerm}"`}</span>
              </h2>
              {paginatedData !== undefined &&
                paginatedData.length > 0 &&
                renderCards()}
            </section>
          )}
          <div className='my-5 text-white flex justify-center'>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentpage}
              pageCount={pageCount}
              resultsRef={resultsRef}
            />
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
  const searchedCardData = await data.data;

  return { props: { searchedCardData } };
}

export default Results;
