import { SetStateAction, useState, useEffect } from 'react';
// Next
import Link from 'next/link';
import Router from 'next/router';

interface Iprops {
  searchTerm: string;
  setSearchTerm: any;
  isErrorShowing: boolean;
  searchHistory: string[];
}

const CardSearch: React.FC<Iprops> = ({
  searchTerm,
  setSearchTerm,
  isErrorShowing,
  searchHistory,
}) => {
  const [value, setValue] = useState<string>('');

  const submitHandler = () => {
    setSearchTerm(value);
    setValue('');

    // e.preventDefault();
  };

  useEffect(() => {
    console.log('CardSearch.searchTerm', searchTerm);
    if (searchTerm !== '') {
      Router.push({
        pathname: '/results',
        query: { searched: searchTerm },
      });
    }
  }, [searchTerm]);

  const inputKeyHandler = (e) => {
    if (e.keyCode === 13) {
      submitHandler();
    }
  };

  const renderSearchHistory = () => {
    const searchHistoryReversed = searchHistory.slice().reverse();

    return searchHistoryReversed.map((item) => (
      <>
        <button onClick={() => setSearchTerm(item)}>
          <p
            className='capitalize border hover:text-blue-400  text-white hover:border-blue-400 border-white py-2 px-4 rounded-full ml-0 m-2'
            key={item}
          >
            {item}
          </p>
        </button>
      </>
    ));
  };

  return (
    <div className='my-10 py-10 px-14 rounded-3xl relative'>
      <h1 className='text-4xl text-center mb-3 font-thin text-white'>Search</h1>
      <div className='relative'>
        <div className='magnification-icon-container absolute rounded-full p-2 bg-gray-200'>
          <button onClick={submitHandler}>
            <svg
              width='23'
              height='19'
              viewBox='0 0 16 15'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g transform='translate(.5)' stroke='#242424' fill='none'>
                <circle cx='5.5' cy='5.5' r='4.75'></circle>
                <rect
                  transform='rotate(-45 11.357 11.457)'
                  x='11.107'
                  y='8.207'
                  width='1'
                  height='6.5'
                  rx='.5'
                ></rect>
              </g>
            </svg>
          </button>
        </div>
        <input
          type='text'
          className='w-full my-3 p-3 rounded-full pl-5 shadow-inner'
          placeholder='Enter card name or number'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => inputKeyHandler(e)}
        />
      </div>
      <button
        className='py-3 px-8 bg-white shadow-md rounded-full mx-auto block'
        onClick={submitHandler}
      >
        Submit
      </button>
      {isErrorShowing && (
        <p className='mt-5 text-red-500 font-bold text-center'>
          No results found, please try another search.
        </p>
      )}
      {searchHistory && (
        <>
          <h2 className='mt-5 mb-3 text-white'>Previous searches</h2>
          {renderSearchHistory()}
        </>
      )}
    </div>
  );
};

export default CardSearch;
