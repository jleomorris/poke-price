import React, { useEffect, useState, useRef } from 'react';
// Next
import { useRouter } from 'next/router';
// Components
import PageContainer from '../../components/PageContainer';
import PriceCard from '../../components/PriceCard';
import Pagination from '../../components/Pagination';
import PageBanner from '../../components/PageBanner';
// Other
import { sets } from '../../setData';
// Utils
// import { scrollTo } from '../../utils';
import { NextPageContext } from 'next';

const API_URL: string = 'https://api.pokemontcg.io/v2/cards';

interface IProps {
  searchedCardData: {}[];
}

const dummyPaginatedData = [
  {
    id: 'basep-19',
    name: "Sabrina's Abra",
    supertype: 'Pokémon',
    subtypes: ['Basic'],
    level: '15',
    hp: '40',
    types: ['Psychic'],
    evolvesTo: ['Kadabra'],
    attacks: [
      {
        name: 'Pound',
        cost: ['Colorless'],
        convertedEnergyCost: 1,
        damage: '10',
        text: '',
      },
      {
        name: 'Synchronize',
        cost: ['Psychic', 'Colorless'],
        convertedEnergyCost: 2,
        damage: '40',
        text: "This attack can't be used unless Sabrina's Abra and the Defending Pokémon have the same number of Energy cards attached to them.",
      },
    ],
    weaknesses: [
      {
        type: 'Psychic',
        value: '×2',
      },
    ],
    set: {
      id: 'basep',
      name: 'Wizards Black Star Promos',
      series: 'Base',
      printedTotal: 53,
      total: 53,
      legalities: {
        unlimited: 'Legal',
      },
      ptcgoCode: 'PR',
      releaseDate: '1999/07/01',
      updatedAt: '2020/08/14 09:35:00',
      images: {
        symbol: 'https://images.pokemontcg.io/basep/symbol.png',
        logo: 'https://images.pokemontcg.io/basep/logo.png',
      },
    },
    number: '19',
    artist: 'Atsuko Nishida',
    rarity: 'Promo',
    nationalPokedexNumbers: [63],
    legalities: {
      unlimited: 'Legal',
    },
    images: {
      small: 'https://images.pokemontcg.io/basep/19.png',
      large: 'https://images.pokemontcg.io/basep/19_hires.png',
    },
    tcgplayer: {
      url: 'https://prices.pokemontcg.io/tcgplayer/basep-19',
      updatedAt: '2021/10/04',
      prices: {
        normal: {
          low: 18.98,
          mid: 20.3,
          high: 45,
          market: 24.18,
          directLow: 9.47,
        },
      },
    },
    cardmarket: {
      url: 'https://prices.pokemontcg.io/cardmarket/basep-19',
      updatedAt: '2021/10/04',
      prices: {
        averageSellPrice: 4.45,
        lowPrice: 0.99,
        trendPrice: 5.5,
        germanProLow: null,
        suggestedPrice: null,
        reverseHoloSell: null,
        reverseHoloLow: null,
        reverseHoloTrend: 4.34,
        lowPriceExPlus: 3.5,
        avg1: 9.99,
        avg7: 4.45,
        avg30: 4.5,
        reverseHoloAvg1: 4.4,
        reverseHoloAvg7: 2.59,
        reverseHoloAvg30: 2.59,
      },
    },
  },
];

const Results: React.FC<IProps> = ({ searchedCardData }) => {
  const router = useRouter();
  const {
    query: { searched },
  } = router;

  const [searchTerm, setSearchTerm] = useState<string | string[]>('');
  // const [isErrowShowing, setIsErrorShowing] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(['']);
  const [isSearchHistorySet, setIsSearchHistorySet] = useState<boolean>(false);
  const CARD_LIMIT: number = 8;
  const [paginatedData, setPaginatedData] = useState(dummyPaginatedData);
  const [currentPage, setCurrentpage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const resultsRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    console.log('results.searchedcarddata', searchedCardData);
  }, [searchedCardData]);

  // On initial render set page count
  useEffect(() => {
    const pageCount = Math.ceil(searchedCardData.length / CARD_LIMIT);
    setPageCount(pageCount);
  }, [searchedCardData.length]);

  // When currrent page changes update paginate data
  useEffect(() => {
    const slicedData = searchedCardData.slice(
      currentPage * CARD_LIMIT - CARD_LIMIT,
      currentPage * CARD_LIMIT
    );
    setPaginatedData(slicedData as any);
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
    // Limit search history to last 10 searches
    const slicedSearchHistory: string[] = searchHistory!.slice(
      searchHistory!.length >= 9 ? searchHistory!.length - 9 : 0,
      searchHistory!.length
    )!;

    console.log('results.slicedSearchHistory', slicedSearchHistory);

    // Only store search term to history if it returns results and is not the same as the last search
    if (
      isSearchHistorySet === true &&
      searchedCardData.length !== 0 &&
      slicedSearchHistory[slicedSearchHistory.length - 1] !== searched
    ) {
      setSearchHistory([...slicedSearchHistory, searched] as string[]);
    }
  }, [isSearchHistorySet]);

  // Set search history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const renderCards = () => {
    const cards =
      paginatedData && paginatedData.length > 0
        ? paginatedData
        : dummyPaginatedData;

    const ids: string[] = [];

    return cards.map((card, index) => {
      ids.push(card.id.split('-')[0]);
      if (index === cards.length - 1) {
        console.log(ids);
      }
      return (
        <>
          <div
            key={card.name}
            style={{ width: '500px' }}
            className='mx-5 my-2 sm:my-8'
          >
            <PriceCard key={card.name} card={card as any} />
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
              <h2 className='text-3xl text-center sm:text-left md:text-5xl xl:text-7xl tracking-tighter mb-10 text-white w-full'>
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
              className={`w-full flex flex-wrap justify-center items-start relative`}
            >
              <h2 className='text-3xl text-center sm:text-left md:text-5xl xl:text-7xl tracking-tighter mb-10 text-white w-full'>
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

export async function getServerSideProps(context: NextPageContext) {
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
