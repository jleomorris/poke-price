import { sets } from '../../setData';

const SetGallery = ({ setSearchTerm }) => {
  return (
    <div className='sets mb-5 z-20'>
      {sets.map((set) => (
        <button key={set.id} onClick={() => setSearchTerm(set.name)}>
          <p className=' opacity-80 hover:opacity-100 border border-gray-600 m-2 py-2 px-5 rounded-full'>
            {set.name}
          </p>
        </button>
      ))}
    </div>
  );
};

export default SetGallery;
