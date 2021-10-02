// React
import { useState, useEffect } from 'react';
// Next
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
// Components
import CardSearch from '../../components/CardSearch';
import SetGallery from '../../components/SetGallery';
import PageContainer from '../../components/PageContainer';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isErrowShowing, setIsErrorShowing] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

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

  return (
    <div className='bg-blackLighter min-w-screen min-h-screen'>
      <div className='search flex flex-col justify-center items-center'>
        <div className='relative h-96 w-full'>
          <Image
            className='h-full w-full absolute top-0 left-0'
            layout='fill'
            objectFit='cover'
            src='https://res.cloudinary.com/jleomorris/image/upload/f_auto,q_auto/v1633172502/Pokemon-tcg-price-guide/home-background.jpg'
            alt='home background'
          />
          <div className='-bottom-20 -translate-x-1/2 absolute bg-gray-100 shadow-xl left-1/2 p-10 rounded-xl transform w-1/2 border border-gray-700'>
            <CardSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isErrorShowing={isErrowShowing}
              searchHistory={searchHistory}
            />
          </div>
        </div>
        <PageContainer>
          <div className='w-full mt-20 mb-10'>
            <SetGallery setSearchTerm={setSearchTerm} />
          </div>
          <Link
            href={{
              pathname: '/',
            }}
          >
            <a className='text-white border border-white rounded-xl py-4 px-6'>
              &#8592; Back to home
            </a>
          </Link>
        </PageContainer>
      </div>
    </div>
  );
};

export default Search;
