// Components
import { sets } from '../../setData';
import Set from '../Set';
// Types
import { IProps } from './types';

const SetGallery: React.FC<IProps> = ({ setSearchTerm }) => {
  return (
    <div className='sets mb-5 z-20 w-full flex flex-wrap justify-center'>
      {sets.map((set) => (
        <Set key={set.name} set={set} setSearchTerm={setSearchTerm} />
      ))}
    </div>
  );
};

export default SetGallery;
