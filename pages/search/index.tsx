// Components
import CardSearch from '../../components/CardSearch';
// React
import { useState, useEffect } from 'react';
// Next
import Link from 'next/link';
import { useRouter } from 'next/router';
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
      <PageContainer>
        <div className='search flex flex-col justify-center items-center'>
          <div className='w-2/3'>
            <CardSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isErrorShowing={isErrowShowing}
              searchHistory={searchHistory}
            />
          </div>
          <div>
            <SetGallery setSearchTerm={setSearchTerm} />
          </div>
        </div>
        <div className='my-5'>
          <Link
            href={{
              pathname: '/',
            }}
          >
            <a className='text-white border border-white rounded-xl py-4 px-6'>
              &#8592; Back to home
            </a>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
};

export default Search;
