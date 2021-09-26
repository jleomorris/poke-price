import { useState, useEffect, DOMElement } from 'react';
// Next
import Head from 'next/head';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
// Components
import PriceCard from '../components/PriceCard';
import CardSearch from '../components/CardSearch';
import Features from '../components/Features';

const API_URL: string = 'https://api.pokemontcg.io/v2/cards';

const Home: React.FC = ({ randomCard }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchedCards, setSearchedCards] = useState([]);
  const [isErrowShowing, setIsErrorShowing] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // When search term is set fetch data
  useEffect(() => {
    console.log('RandomCard.searchTerm.length', searchTerm.length);
    console.log('RandomCard.searchTerm', searchTerm);

    if (searchTerm.length > 0) {
      const fetchSearchTerm = async () => {
        const res = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}`,
          {
            method: 'GET',
            headers: {
              'X-Api-Key': process.env.NEXT_PUBLIC_POKEMON_TCG_KEY!,
            },
          }
        );

        if (!res.ok) {
          const message = `An error has occured: ${res.status}`;
          throw new Error(message);
        }

        const data = await res.json();
        const cards = await data.data;

        return cards;
      };

      fetchSearchTerm().then((result) => {
        // console.log('RandomCard.fetchedCards', result)
        setSearchedCards(result);
        if (result.length > 0) {
          scrollTo('search-results');
          setIsErrorShowing(false);

          // Limit search history to last 10 searches
          const slicedSearchHistory = searchHistory.slice(
            searchHistory.length >= 9 ? searchHistory.length - 9 : 0,
            searchHistory.length
          );

          setSearchHistory([...slicedSearchHistory, searchTerm]);
        } else {
          setIsErrorShowing(true);
        }
      });
      // .then((result) => {
      //   console.log('RESULT', result);
      //   scrollTo('search-results');
      // });
    }
  }, [searchTerm]);

  // On app first render set search history state based on local storage
  useEffect(() => {
    const localSearchHistory = localStorage.getItem('searchHistory');

    if (localSearchHistory) {
      setSearchHistory(JSON.parse(localSearchHistory));
    }
  }, []);

  // Set search history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    console.log('home.searchHistory', searchHistory);
  }, [searchHistory]);

  const scrollTo = (target: string): void => {
    document.getElementById(target)!.scrollIntoView({ behavior: 'smooth' });
  };

  const renderCards = () => {
    const cards = (searchedCards.length > 0 && searchedCards) || randomCard;

    // debugger;

    return cards.map((card) => (
      <>
        <div className='mx-5 my-10 w-full xl:w-5/12'>
          <PriceCard key={card.name} card={card} />
        </div>
      </>
    ));
  };

  const renderRandomCard = () => {
    const cards = randomCard;

    return cards.map((card) => (
      <>
        <PriceCard key={card.name} card={card} />
      </>
    ));
  };

  return (
    <main className='relative w-screen min-h-screen flex flex-wrap justify-center bg-gray-100'>
      <Head>
        <title>Pokemon TCG Price Guide</title>
        <meta
          name='description'
          content='Pokemon TCG price guide made with Next.js'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='w-full xl:min-h-screen relative flex justify-start items-start'>
        <div className='p-20 w-full xl:w-7/12 flex flex-col justify-between border min-h-screen border-blue-500 relative'>
          <h1 className='text-6xl text-black md:text-8xl mb-10 xl:w-3/4 font-bold relative'>
            Quickly find a card price with{' '}
            <span className='text-blue-400'>PokePrice</span>
          </h1>
          <Features />
          <div className='card-search-container absolute z-10 w-2/3 lg:w-1/2'>
            <CardSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isErrorShowing={isErrowShowing}
              searchHistory={searchHistory}
            />
          </div>
        </div>
        <div className='background-img relative xl:w-5/12 min-h-screen border border-red'>
          <img
            className='object-cover h-full w-full absolute top-0 left-0 '
            src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.japanpowered.com%2Fimages%2Fpokemon-trading-cards.jpg&f=1&nofb=1'
            alt='home background'
          />
          <div className='image-overlay h-full w-full bg-gradient-to-t from-white absolute top-0 left-0'></div>
        </div>
      </section>
      {searchedCards.length > 0 && (
        <section
          id='search-results'
          className={`p-5 sm:p-20 w-full bg-black bg-opacity-90 min-h-screen flex flex-wrap xl:justify-center items-start relative`}
        >
          <h2 className='text-3xl md:text-5xl xl:text-7xl tracking-tighter mb-10 text-white w-full'>
            <span className='text-blue-400'>{searchedCards.length} </span>
            {`results for `}
            <span className='text-blue-400'>{`"${searchTerm}"`}</span>
          </h2>
          {renderCards()}
        </section>
      )}
    </main>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const cards = await data.data;

  const random = await cards[Math.floor(Math.random() * cards.length)];
  const randomCard = await Array(random);

  return {
    props: {
      randomCard,
    },
  };
}
