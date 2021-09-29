import { useState, useEffect, DOMElement } from 'react';
// Next
import Head from 'next/head';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
import Link from 'next/link';
// Components
import PriceCard from '../components/PriceCard';
import CardSearch from '../components/CardSearch';
import Features from '../components/Features';

const API_URL: string = 'https://api.pokemontcg.io/v2/cards';

const sets = [
  { name: 'Detective Pikachu', id: 'det1' },
  { name: 'Dragons Exalted', id: 'bw6' },
  { name: 'Heart Gold & Soul Silver', id: 'hgss1' },
  { name: 'Dragon Majesty', id: 'sm75' },
  { name: 'Crimson Invasion', id: 'sm4' },
  { name: 'Hidden Fates', id: 'sm115' },
  { name: 'Team Up', id: 'sm9' },
  { name: 'Shiny Vault', id: 'sma' },
  { name: 'Legendary Treasures', id: 'bw11' },
  { name: 'Pop Series 5', id: 'pop5' },
  { name: 'Evolutions', id: 'xy12' },
  { name: 'Boundaries Crossed', id: 'bw7' },
  { name: 'Burning Shadows', id: 'sm3' },
  { name: 'Team Rocket Returns', id: 'ex7' },
  { name: 'Rebel Clash', id: 'swsh2' },
  { name: 'Vivid Voltage', id: 'swsh4' },
  { name: 'Base', id: 'base1' },
  { name: 'Crystal Guardians', id: 'ex14' },
  { name: 'Holon Phantoms', id: 'ex13' },
  { name: 'Team Rocket', id: 'base5' },
  { name: 'Power Keepers', id: 'ex16' },
  { name: 'Arceus', id: 'pl4' },
  { name: 'Gym Challenge', id: 'gym2' },
  { name: 'Gym Heroes', id: 'gym1' },
  { name: 'Firered & Leafgreen', id: 'ex6' },
  { name: 'Expedition Base Set', id: 'ecard1' },
  { name: 'Base Set 2', id: 'base4' },
  { name: 'Legendary Collection', id: 'base6' },
  { name: 'Secret Wonders', id: 'dp3' },
  { name: 'XY Black Star Promos', id: 'xyp' },
  { name: 'Mysterious Treasures', id: 'dp2' },
  { name: 'Breakpoint', id: 'xy9' },
  { name: 'Generations', id: 'g1' },
  { name: 'Dragon', id: 'ex3' },
  { name: 'Stormfront', id: 'dp7' },
  { name: 'SWSH Black Star Promos', id: 'swshp' },
  { name: 'Evolving Skies', id: 'swsh7' },
  { name: 'Call Of Legends', id: 'col1' },
  { name: 'Deoxys', id: 'ex8' },
  { name: 'Skyridge', id: 'ecard3' },
  { name: 'Ancient Origins', id: 'xy7' },
];

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

    const ids = [];

    return cards.map((card, index) => {
      ids.push(card.id.split('-')[0]);
      if (index === cards.length - 1) {
        console.log(ids);
      }
      return (
        <>
          <div className='mx-5 my-10 w-full xl:w-5/12'>
            <PriceCard key={card.name} card={card} />
          </div>
        </>
      );
    });
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

      <Link
        href={{
          pathname: '/search',
          query: { searchTest: 'bulbasaur' },
        }}
      >
        <a>Search page</a>
      </Link>

      <section className='w-full xl:min-h-screen relative flex justify-start items-start'>
        <div className='p-20 w-full xl:w-6/12 flex flex-col justify-between border min-h-screen border-blue-500 relative'>
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
        <div className='background-img flex flex-col justify-end relative xl:w-6/12 min-h-screen border border-red'>
          <img
            className='object-cover h-full w-full absolute top-0 left-0 '
            src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.japanpowered.com%2Fimages%2Fpokemon-trading-cards.jpg&f=1&nofb=1'
            alt='home background'
          />
          <div className='image-overlay h-full w-full bg-gradient-to-t from-white absolute top-0 left-0' />
          <div className='sets mb-5 z-20'>
            {sets.map((set) => (
              <button key={set.id} onClick={() => setSearchTerm(set.name)}>
                <p className=' bg-blue-400 font-bold opacity-80 hover:opacity-100 shadow-md m-1 py-1 px-3 rounded-full'>
                  {set.name}
                </p>
              </button>
            ))}
          </div>
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
