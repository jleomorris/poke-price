// React
import { useState, useEffect } from 'react';
// Components
import CardSearch from '../../components/CardSearch';
import SetGallery from '../../components/SetGallery';
import PageContainer from '../../components/PageContainer';
import PageBanner from '../../components/PageBanner';
import AnimationParent, { Variant } from '../../components/AnimationParent';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isErrowShowing, setIsErrorShowing] = useState<boolean>(false);
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
        <PageBanner linkTarget='home'>
          <div className='-bottom-20 -translate-x-1/2 absolute bg-gray-100 shadow-xl left-1/2 p-10 rounded-xl transform w-3/4 lg:w-1/2 border border-gray-700'>
            <CardSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isErrorShowing={isErrowShowing}
              searchHistory={searchHistory}
            />
          </div>
        </PageBanner>
        <AnimationParent variant={Variant.FADEUP}>
          <PageContainer>
            <div className='w-full mt-20 mb-10'>
              <SetGallery setSearchTerm={setSearchTerm} />
            </div>
          </PageContainer>
        </AnimationParent>
      </div>
    </div>
  );
};

export default Search;
