import { SetStateAction, useState, useEffect } from 'react';

interface Iprops {
  searchTerm: string;
  setSearchTerm: any;
}

const CardSearch: React.FC<Iprops> = ({ searchTerm, setSearchTerm }) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    console.log(value);
  }, [value]);

  const submitHandler = () => {
    alert(value);
    setSearchTerm(value);
    // e.preventDefault();
  };

  return (
    <div className='my-10 w-full bg-white bg-opacity-80 py-5 px-10 rounded-xl'>
      <h2 className='text-3xl font-thin'>Search For Card</h2>
      {/* <form onSubmit={(e) => submitHandler} action='/'> */}
      <input
        type='text'
        className='w-full my-3 p-3 rounded-xl shadow-inner'
        placeholder='Enter card name or number'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className='py-3 px-5 bg-white shadow-md rounded-xl'
        onClick={submitHandler}
      >
        Submit
      </button>
      {/* </form> */}
    </div>
  );
};

export default CardSearch;
