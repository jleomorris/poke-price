const CardSearch = () => {
  return (
    <div className='my-10 border border-blue-500 w-1/2'>
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
