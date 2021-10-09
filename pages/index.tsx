// Next
import Image from 'next/image';
import Link from 'next/link';
// Components
import Features from '../components/Features';
import Animate from '../components/Animate';

const Home: React.FC = () => {
  return (
    <Animate animationType='pageAnimation'>
      <main className='relative w-screen min-h-screen flex flex-wrap justify-center bg-gray-100'>
        <section className='w-full xl:min-h-screen relative flex flex-col xl:flex-row justify-start items-start'>
          <div className='bg-blackLighter p-10 md:p-20 w-full xl:w-6/12 flex flex-col justify-between xl:min-h-screen relative'>
            <h1 className='text-4xl md:text-5xl xl:text-8xl text-center xl:text-left text-white  mb-10 font-bold relative'>
              Quickly find a card price with{' '}
              <span className='text-blue-400'>PokePrice</span>
            </h1>
            <div className='my-10 xl:pb-20'>
              <Features />
            </div>
          </div>
          <div className='background-img w-full xl:w-6/12 flex flex-1 flex-col justify-end relative h-52 xl:min-h-full'>
            <div className='absolute top-0 left-0 h-full w-full'>
              <Image
                src='https://res.cloudinary.com/jleomorris/image/upload/f_auto,q_auto/v1633172502/Pokemon-tcg-price-guide/home-background.jpg'
                alt='background'
                objectFit='cover'
                layout='fill'
              />
            </div>
            <div className='image-overlay h-full w-full bg-gradient-to-r from-blackLighter absolute top-0 left-0' />
            <div className='inline-block mx-auto my-auto'>
              <Link href={{ pathname: '/search' }}>
                <a className='relative rounded-xl bg-black bg-opacity-60 hover:text-blue-400 border-2 hover:border-blue-400 px-10 py-5 text-white text-center'>
                  Get Started &#8594;
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Animate>
  );
};

export default Home;

export async function getStaticProps() {
  // const res = await fetch(API_URL);
  // const data = await res.json();
  // const cards = await data.data;

  // const random = await cards[Math.floor(Math.random() * cards.length)];
  // const randomCard = await Array(random);

  return {
    props: {
      // randomCard,
    },
  };
}
