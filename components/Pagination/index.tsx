// Utils
// import { scrollTo } from '../../utils';
// Types
import { IProps } from './types';

const Pagination: React.FC<IProps> = ({
  currentPage,
  setCurrentPage,
  pageCount,
  resultsRef,
}) => {
  const buttonStyles = 'border border-white rounded-full py-2 px-4';

  const previousPageHandler = (): void => {
    setCurrentPage(currentPage - 1);
    resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    // window.scrollTo(0, 0);
    // scrollTo('search-results');
  };

  const nextPageHandler = (): void => {
    setCurrentPage(currentPage + 1);
    resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    // window.scrollTo(0, 0);
    // scrollTo('search-results');
  };

  return (
    <div className='pagination space-x-3 flex justify-center items-center'>
      <>
        <button
          className={`${buttonStyles} ${
            currentPage === 1 ? ' cursor-auto opacity-30' : ''
          }`}
          onClick={previousPageHandler}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>
          Page <span className='font-bold text-blue-400'>{currentPage}</span> of{' '}
          <span className='font-bold text-blue-400'>
            {pageCount === 0 ? 1 : pageCount}
          </span>
        </div>
        <button
          className={`${buttonStyles} ${
            currentPage === pageCount || (currentPage === 1 && pageCount === 0)
              ? 'opacity-30 cursor-auto'
              : ''
          }`}
          onClick={nextPageHandler}
          disabled={
            currentPage === pageCount || (currentPage === 1 && pageCount === 0)
          }
        >
          Next
        </button>
      </>
    </div>
  );
};

export default Pagination;
