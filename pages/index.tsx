import { useState, useEffect } from 'react';
// Next
import Head from 'next/head';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
// Components
import PriceCard from '../components/PriceCard';
import CardSearch from '../components/CardSearch';

const API_URL: string = 'https://api.pokemontcg.io/v2/cards';

const Home: React.FC = ({ randomCard }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchedCards, setSearchedCards] = useState([]);

  useEffect(() => {
    console.log('RandomCard.searchTerm.length', searchTerm.length);
    console.log('RandomCard.searchTerm', searchTerm);

    if (searchTerm.length > 0) {
      const fetchSearchTerm = async () => {
        const res = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}`
        );
        const data = await res.json();
        const cards = await data.data;

        return cards;
      };

      fetchSearchTerm().then((result) =>
        // console.log('RandomCard.fetchedCards', result)
        setSearchedCards(result)
      );
    }
  }, [searchTerm]);

  const renderCards = () => {
    const cards = searchedCards || randomCard;

    return cards.map((card) => (
      <>
        <div className='mx-5 my-10 w-full xl:w-5/12'>
          <PriceCard key={card.name} card={card} />
        </div>
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

      <section className='p-5 sm:p-20 w-full xl:min-h-screen relative flex flex-col justify-center items-center'>
        <img
          className='object-cover h-full w-full absolute top-0 left-0 '
          src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.japanpowered.com%2Fimages%2Fpokemon-trading-cards.jpg&f=1&nofb=1'
          alt='home background'
        />
        <div className='image-overlay h-full w-full bg-gradient-to-r from-black absolute top-0 left-0'></div>
        <h1 className='text-6xl md:text-8xl text-center text-white font-bold relative'>
          Pokemon TCG <span className='text-blue-400'>Price Guide</span>
        </h1>
        <div className='w-2/3 lg:w-1/3'>
          <CardSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </section>
      {searchedCards.length > 0 && (
        <section
          className={`p-5 sm:p-20 w-full bg-black bg-opacity-90 min-h-screen flex flex-wrap xl:justify-center items-start relative`}
        >
          <h2 className='text-3xl md:text-5xl xl:text-7xl tracking-tighter mb-10 text-white w-full'>
            {`Search results for `}
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
