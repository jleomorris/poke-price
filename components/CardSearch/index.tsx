import { SetStateAction, useState, useEffect } from 'react';

interface Iprops {
  searchTerm: string;
  setSearchTerm: any;
}

const CardSearch: React.FC<Iprops> = ({ searchTerm, setSearchTerm }) => {
  const [value, setValue] = useState<string>('');

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  const submitHandler = () => {
    setSearchTerm(value);
    // e.preventDefault();
  };

  return (
    <div className='my-10 w-full bg-black bg-opacity-90 py-10 px-14 rounded-3xl relative'>
      <h2 className='text-4xl text-white text-center mb-3 font-thin'>Search</h2>
      {/* <form onSubmit={(e) => submitHandler} action='/'> */}
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
        />
      </div>
      <button
        className='py-3 px-8 bg-white shadow-md rounded-full mx-auto block'
        onClick={submitHandler}
      >
        Submit
      </button>
      {/* </form> */}
    </div>
  );
};

export default CardSearch;
