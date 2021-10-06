import { useState, useEffect } from 'react';
// Next
import Image from 'next/image';
// Types
import { IProps } from './types';
// Utils
import { convertToDecimals } from '../../utils';

const PriceCard: React.FC<IProps> = ({ card }) => {
  const [isNormal, setIsNormal] = useState<boolean>(false);
  const [isHoloFoil, setIsHoloFoil] = useState<boolean>(false);
  const [isReverseHoloFoil, setIsReverseHoloFoil] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    // Set Card Types
    const setCardTypes = (): void => {
      if (card.tcgplayer?.prices.reverseHolofoil) {
        setIsReverseHoloFoil(true);
        setSelectedType('reverse holo foil');
      }
      if (card.tcgplayer?.prices.holofoil) {
        setIsHoloFoil(true);
        setSelectedType('holo foil');
      }
      if (card.tcgplayer?.prices.normal) {
        setIsNormal(true);
        setSelectedType('normal');
      }
    };

    setCardTypes();
  }, [
    card.tcgplayer?.prices.holofoil,
    card.tcgplayer?.prices.normal,
    card.tcgplayer?.prices.reverseHolofoil,
  ]);

  return (
    <>
      <div className='tabs ml-2 flex'>
        {isNormal && (
          <button
            className={`mr-2 px-4 py-2 bg-white ${
              selectedType === 'normal' ? '' : 'bg-opacity-50'
            } rounded-t-xl`}
            onClick={() => setSelectedType('normal')}
          >
            Normal
          </button>
        )}
        {isHoloFoil && (
          <button
            className={`mr-2 px-4 py-2 bg-white ${
              selectedType === 'holo foil' ? '' : 'bg-opacity-50'
            } rounded-t-xl`}
            onClick={() => setSelectedType('holo foil')}
          >
            Holofoil
          </button>
        )}
        {isReverseHoloFoil && (
          <button
            className={`mr-2 px-4 py-2 bg-white ${
              selectedType === 'reverse holo foil' ? '' : 'bg-opacity-50'
            } rounded-t-xl`}
            onClick={() => setSelectedType('reverse holo foil')}
          >
            Reverse Holofoil
          </button>
        )}
      </div>
      <div className='flex shadow-lg rounded-xl'>
        <div className='relative w-48 pt-2'>
          <Image
            src={card.images.small}
            // className='h-full'
            alt='random card'
            layout='fixed'
            height={260}
            width={200}
            objectFit='contain'
          />
        </div>
        <div className='flex m-2 rounded-xl overflow-hidden'>
          <div className='p-3 bg-white bg-opacity-70'>
            <p className='font-bold text-md uppercase tracking-widest'>
              {card.name}
            </p>
            <p className='text-sm uppercase tracking-widest'>{card.set.name}</p>
            <p className='text-sm uppercase tracking-widest'>
              {card.set.releaseDate}
            </p>
            <p className='text-sm uppercase tracking-widest'>
              #{card.set.printedTotal}
            </p>
            <div className='inline-block border border-gray-500 p-2 mt-5 bg-white bg-opacity-80 rounded-xl'>
              <p className='font-bold text-md'>Market Price</p>
              <p className='font-bold text-2xl'>
                $
                {(selectedType === 'holo foil' &&
                  convertToDecimals(
                    card.tcgplayer?.prices?.holofoil?.market,
                    2
                  )) ||
                  (selectedType === 'reverse holo foil' &&
                    convertToDecimals(
                      card.tcgplayer?.prices?.reverseHolofoil?.market,
                      2
                    )) ||
                  (selectedType === 'normal' &&
                    convertToDecimals(
                      card.tcgplayer?.prices?.normal?.market,
                      2
                    ))}
              </p>
            </div>
          </div>
          <div className=' rounded-r-xl overflow-hidden w-32'>
            <div className='flex flex-col h-full'>
              <div className='shadow-inner p-4 bg-white bg-opacity-80 h-1/2 flex flex-col items-center'>
                <p className='font-bold text-md text-center'>Low</p>
                <p className='font-bold text-2xl text-red-500 '>
                  $
                  {(selectedType === 'holo foil' &&
                    card.tcgplayer?.prices?.holofoil?.low) ||
                    (selectedType === 'reverse holo foil' &&
                      card.tcgplayer?.prices?.reverseHolofoil?.low) ||
                    (selectedType === 'normal' &&
                      card.tcgplayer?.prices?.normal?.low)}
                </p>
              </div>
              <div className='shadow-inner p-4 bg-white bg-opacity-80 h-1/2 flex flex-col items-center'>
                <p className='font-bold text-md text-center'>Mid</p>
                <p className='font-bold text-2xl text-yellow-500'>
                  $
                  {(selectedType === 'holo foil' &&
                    card.tcgplayer?.prices?.holofoil?.mid) ||
                    (selectedType === 'reverse holo foil' &&
                      card.tcgplayer?.prices?.reverseHolofoil?.mid) ||
                    (selectedType === 'normal' &&
                      card.tcgplayer?.prices?.normal?.mid)}
                </p>
              </div>
              <div className='shadow-inner p-4 bg-white bg-opacity-80 h-1/2 flex flex-col items-center'>
                <p className='font-bold text-md text-center'>High</p>
                <p className='font-bold text-2xl text-green-500'>
                  $
                  {(selectedType === 'holo foil' &&
                    card.tcgplayer?.prices?.holofoil?.high) ||
                    (selectedType === 'reverse holo foil' &&
                      card.tcgplayer?.prices?.reverseHolofoil?.high) ||
                    (selectedType === 'normal' &&
                      card.tcgplayer?.prices?.normal?.high)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceCard;
