import Head from 'next/head';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';

const API_URL: string = 'https://api.pokemontcg.io/v2/cards';

const Home: React.FC = ({ randomCard }) => {
  console.log('home.randomCard', randomCard);

  return (
    <main className='w-screen min-h-screen flex justify-center items-center bg-gray-100'>
      <Head>
        <title>Pokemon TCG Price Guide</title>
        <meta
          name='description'
          content='Pokemon TCG price guide made with Next.js'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='md:w-5/12 border border-blue-500 min-h-screen h-screen relative'>
        <div className='image-overlay h-full w-full bg-gradient-to-r from-black absolute top-0 left-0'></div>
        <h1 className='text-8xl text-white font-bold absolute top-10 left-10 z-0'>
          Pokemon TCG <span className='text-purple-500'>Price Guide</span>
        </h1>
        <img
          className='object-cover h-screen'
          src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.japanpowered.com%2Fimages%2Fpokemon-trading-cards.jpg&f=1&nofb=1'
          alt='home background'
        />
      </section>
      <section className='p-20 md:w-7/12 border border-blue-500 min-h-screen flex flex-col justify-center items-center'></section>
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
