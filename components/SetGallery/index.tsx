import { sets } from '../../setData';
import Set from '../Set';

const SetGallery = ({ setSearchTerm }) => {
  return (
    <div className='sets mb-5 z-20 w-full flex flex-wrap justify-center'>
      {sets.map((set) => (
        <Set key={set.name} set={set} setSearchTerm={setSearchTerm} />
      ))}
    </div>
  );
};

export default SetGallery;
