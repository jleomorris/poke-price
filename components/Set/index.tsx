import { useEffect, useState } from 'react';
// Next
import Image from 'next/image';
// Types
import { IProps } from './types';
import { SetDataType } from './types';

const dummyData = {
  id: 'base1',
  name: 'Base',
  series: 'Base',
  printedTotal: 102,
  total: 102,
  legalities: {
    unlimited: 'Legal',
  },
  ptcgoCode: 'BS',
  releaseDate: '1999/01/09',
  updatedAt: '2020/08/14 09:35:00',
  images: {
    symbol: 'https://images.pokemontcg.io/base1/symbol.png',
    logo: 'https://images.pokemontcg.io/base1/logo.png',
  },
};

const Set: React.FC<IProps> = ({ set, setSearchTerm }) => {
  const [setData, setSetData] = useState<SetDataType>(dummyData);

  // Set image url on component render
  useEffect(() => {
    const fetchSetData = async () => {
      let apiUrl = `https://api.pokemontcg.io/v2/sets/${set.id}`;

      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-Api-Key': process.env.NEXT_PUBLIC_POKEMON_TCG_KEY!,
        },
      });

      if (res.ok) {
        //
      }

      if (!res.ok) {
        const message = `An error has occured: ${res.status}`;
        // throw new Error(message);
        console.log('Set.fetchSetData.error', message);
      }

      const data = await res.json();
      const setData = await data.data;

      return setData;
    };

    fetchSetData().then((result) => {
      setSetData(result);
    });
  }, [set.id]);

  return (
    <div className='set m-3 w-1/3 sm:w-auto'>
      <button
        key={set.id}
        onClick={() => setSearchTerm(set.name)}
        className='relative z-0 sm:m-5'
      >
        <p className='filter bg-gray-800 bg-opacity-80 text-lg relative z-10 text-white hover:text-blue-400 m-2 py-1 px-3 rounded-md sm:rounded-full'>
          {set.name}
        </p>
        {setData?.images?.symbol && (
          <div className='h-20 w-20 bg-500 absolute top-1/2 left-1/2 transform -translate-x-1/2	-translate-y-1/2'>
            <Image
              src={setData.images.symbol}
              objectFit='contain'
              layout='fill'
              alt='set symbol'
            />
            {/* <div className='image-overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-30' /> */}
          </div>
        )}
      </button>
    </div>
  );
};

export default Set;
