import { SetStateAction, useState, useEffect } from 'react';
// Next
import Link from 'next/link';
import Router from 'next/router';
// Types
import { Iprops } from './types';
// Utils
import { removeSpecialChars } from '../../utils';

const CardSearch: React.FC<Iprops> = ({
  searchTerm,
  setSearchTerm,
  isErrorShowing,
  searchHistory,
}) => {
  const [value, setValue] = useState<string>('');

  const submitHandler = (): void => {
    const parsedValue = removeSpecialChars(value);
    setSearchTerm(parsedValue);
    setValue('');

    // e.preventDefault();
  };

  useEffect((): void => {
    console.log('CardSearch.searchTerm', searchTerm);
    if (searchTerm !== '') {
      Router.push({
        pathname: '/results',
        query: { searched: searchTerm },
      });
    }
  }, [searchTerm]);

  const inputKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      submitHandler();
    }
  };

  const renderSearchHistory = () => {
    const searchHistoryReversed = searchHistory.slice().reverse();

    return searchHistoryReversed.map((item, index) => (
      <>
        <button onClick={() => setSearchTerm(item)}>
          <p className='text-blue-400 mr-1' key={item}>
            {item}
            {index !== searchHistoryReversed.length - 1 ? ',' : ''}
          </p>
        </button>
      </>
    ));
  };

  return (
    <div className='w-full relative'>
      <h1 className='text-4xl text-center mb-3 font-thin'>Search</h1>
      <div className='relative'>
        <div className='magnification-icon-container absolute rounded-full p-2 bg-gray-200 '>
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
          className='w-full my-3 p-3 rounded-full pl-5 shadow-inner border border-gray-400'
          placeholder='Enter card name or number'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => inputKeyHandler(e)}
        />
      </div>
      {/* <button
        className='py-3 px-8 bg-white shadow-md rounded-full mx-auto block'
        onClick={submitHandler}
      >
        Submit
      </button> */}
      {isErrorShowing && (
        <p className='mt-5 text-red-500 font-bold text-center'>
          No results found, please try another search.
        </p>
      )}
      {searchHistory && (
        <>
          <p className='mr-2 inline-block'>Previous searches: </p>
          {/* <div className='inline-block'> */}
          {renderSearchHistory()}
          {/* </div> */}
        </>
      )}
    </div>
  );
};

export default CardSearch;
