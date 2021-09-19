const CardSearch = () => {
  return (
    <div className='my-10 w-1/2 bg-white bg-opacity-80 py-5 px-10 rounded-xl'>
      <h2 className='text-3xl font-thin'>Search For Card</h2>
      <input
        type='text'
        className='w-full my-5 p-3 rounded-xl shadow-inner'
        placeholder='Enter card name or number'
      />
    </div>
  );
};

export default CardSearch;
