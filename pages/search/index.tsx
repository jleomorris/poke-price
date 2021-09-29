// Components
import CardSearch from '../../components/CardSearch';
// React
import { useState } from 'react';
// Next
import { useRouter } from 'next/router';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchedCards, setSearchedCards] = useState([]);
  const [isErrowShowing, setIsErrorShowing] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const router = useRouter();
  const {
    query: { searchTest },
  } = router;

  return (
    <div className='search'>
      <CardSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isErrorShowing={isErrowShowing}
        searchHistory={searchHistory}
      />
      <h1>{searchTest}</h1>
    </div>
  );
};

export default Search;
