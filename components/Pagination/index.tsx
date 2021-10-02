const Pagination = ({ currentPage, setCurrentPage, pageCount }) => {
  const buttonStyles = 'border border-white rounded-full py-2 px-4';

  return (
    <div className='pagination space-x-3 flex justify-center items-center'>
      <>
        <button
          className={`${buttonStyles} ${currentPage === 1 ? 'opacity-30' : ''}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>
          Page <span className='font-bold text-blue-400'>{currentPage}</span> of{' '}
          <span className='font-bold text-blue-400'>{pageCount}</span>
        </div>
        <button
          className={`${buttonStyles} ${
            currentPage === pageCount ? 'opacity-30' : ''
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </>
    </div>
  );
};

export default Pagination;
