// Next
import Head from 'next/head';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
// Components
import RandomCard from '../components/RandomCard';
import CardSearch from '../components/CardSearch';

const API_URL: string = 'https://api.pokemontcg.io/v2/cards';

const Home: React.FC = ({ randomCard }) => {
  console.log('home.randomCard', randomCard);

  return (
    <main className='w-screen min-h-screen flex flex-wrap justify-center bg-gray-100'>
      <Head>
        <title>Pokemon TCG Price Guide</title>
        <meta
          name='description'
          content='Pokemon TCG price guide made with Next.js'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='xl:w-5/12 border border-blue-500 w-full min-h-screen relative'>
        <div className='image-overlay h-full w-full bg-gradient-to-r from-black absolute top-0 left-0'></div>
        <h1 className='text-6xl md:text-8xl w-2/3 xl:w-3/4 text-white font-bold absolute top-10 left-10 z-0'>
          Pokemon TCG <span className='text-blue-400'>Price Guide</span>
        </h1>
        <img
          className='object-cover h-full'
          src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.japanpowered.com%2Fimages%2Fpokemon-trading-cards.jpg&f=1&nofb=1'
          alt='home background'
        />
      </section>
      <section className='p-20 xl:w-7/12 border border-blue-500 min-h-screen flex flex-col justify-center items-center'>
        <RandomCard randomCard={randomCard} />
        <CardSearch />
      </section>
    </main>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const cards = await data.data;

  const randomCard = await cards[Math.floor(Math.random() * cards.length)];

  return {
    props: {
      randomCard,
    },
  };
}
