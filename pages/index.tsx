import { useState, useEffect, DOMElement } from 'react';
// Next
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// Styling
import homeStyles from '../styles/Home.module.css';
// Components
import PriceCard from '../components/PriceCard';
import CardSearch from '../components/CardSearch';
import Features from '../components/Features';

const Home: React.FC = ({ randomCard }) => {
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
        <div className='bg-blackLighter p-20 w-full xl:w-6/12 flex flex-col justify-between min-h-screen relative'>
          <h1 className='text-6xl text-white md:text-8xl mb-10 xl:w-3/4 font-bold relative'>
            Quickly find a card price with{' '}
            <span className='text-blue-400'>PokePrice</span>
          </h1>
          <Features />
        </div>
        <div className='background-img flex flex-col justify-end relative xl:w-6/12 min-h-screen'>
          <img
            className='object-cover h-full w-full absolute top-0 left-0 '
            src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.japanpowered.com%2Fimages%2Fpokemon-trading-cards.jpg&f=1&nofb=1'
            alt='home background'
          />
          <div className='image-overlay h-full w-full bg-gradient-to-r from-blackLighter absolute top-0 left-0' />
          <div className='inline-block mx-auto my-auto'>
            <Link href={{ pathname: '/search' }}>
              <a className='relative rounded-xl bg-blackLighter hover:text-blue-400 border-2 hover:border-blue-400 px-10 py-5 text-white text-center'>
                Get Started &#8594;
              </a>
            </Link>
          </div>
        </div>
      </section>
    </main>
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
