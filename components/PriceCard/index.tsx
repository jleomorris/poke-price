import { useState, useEffect } from 'react';
// Next
import Image from 'next/image';
// Types
import { IProps } from './types';
// Utils
import { convertToDecimals } from '../../utils';
// Hooks
import useWindowSize from '../../hooks/useWindowSize';

const PriceCard: React.FC<IProps> = ({ card }) => {
  const [isNormal, setIsNormal] = useState<boolean>(false);
  const [isHoloFoil, setIsHoloFoil] = useState<boolean>(false);
  const [isReverseHoloFoil, setIsReverseHoloFoil] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('');

  const { screenWidth } = useWindowSize();

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
      <div className='tabs sm:ml-2 flex'>
        {isNormal && (
          <button
            className={`mr-2 px-2 sm:px-4 py-1 sm:py-2 bg-white ${
              selectedType === 'normal' ? '' : 'bg-opacity-50'
            } rounded-t-xl`}
            onClick={() => setSelectedType('normal')}
          >
            Normal
          </button>
        )}
        {isHoloFoil && (
          <button
            className={`mr-2 px-2 sm:px-4 py-1 sm:py-2 bg-white ${
              selectedType === 'holo foil' ? '' : 'bg-opacity-50'
            } rounded-t-xl`}
            onClick={() => setSelectedType('holo foil')}
          >
            Holofoil
          </button>
        )}
        {isReverseHoloFoil && (
          <button
            className={`mr-2 px-2 sm:px-4 py-1 sm:py-2 bg-white ${
              selectedType === 'reverse holo foil' ? '' : 'bg-opacity-50'
            } rounded-t-xl`}
            onClick={() => setSelectedType('reverse holo foil')}
          >
            Reverse Holofoil
          </button>
        )}
      </div>
      <div className='flex flex-col sm:flex-row shadow-lg rounded-xl'>
        <div className='relative pt-2 mx-auto sm:mx-0 my-4 sm:my-0'>
          <Image
            src={card.images.small}
            // className='h-full'
            alt='random card'
            layout='fixed'
            // height={screenWidth > 400 ? 260 : 100}
            height={260}
            // width={screenWidth > 400 ? 200 : 60}
            width={200}
            objectFit='contain'
          />
        </div>
        <div className='flex flex-col m-0 sm:m-2 w-full rounded-xl overflow-hidden'>
          <div className='p-3 bg-white bg-opacity-70 flex justify-between'>
            <div>
              <p className='font-bold text-md uppercase tracking-widest'>
                {card.name}
              </p>
              <p className='text-sm uppercase tracking-widest'>
                {card.set.name}
              </p>
              <p className='text-sm uppercase tracking-widest'>
                {card.set.releaseDate}
              </p>
              <p className='text-sm uppercase tracking-widest'>
                #{card.set.printedTotal}
              </p>
            </div>
            <div className='inline-block border ml-3 flex flex-col items-center justify-center border-gray-500 p-2 bg-white bg-opacity-80 rounded-xl'>
              <p className='font-bold text-md'>Market</p>
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
          <div className='w-full flex rounded-b-xl overflow-hidden'>
            <div className='shadow-inner p-4 bg-white bg-opacity-80 flex flex-grow flex-col items-center'>
              <p className='font-bold text-md text-center'>Low</p>
              <p className='font-bold text-lg text-red-500 '>
                $
                {(selectedType === 'holo foil' &&
                  card.tcgplayer?.prices?.holofoil?.low) ||
                  (selectedType === 'reverse holo foil' &&
                    card.tcgplayer?.prices?.reverseHolofoil?.low) ||
                  (selectedType === 'normal' &&
                    card.tcgplayer?.prices?.normal?.low)}
              </p>
            </div>
            <div className='shadow-inner p-4 bg-white bg-opacity-80 flex flex-grow flex-col items-center'>
              <p className='font-bold text-md text-center'>Mid</p>
              <p className='font-bold text-lg text-yellow-500'>
                $
                {(selectedType === 'holo foil' &&
                  card.tcgplayer?.prices?.holofoil?.mid) ||
                  (selectedType === 'reverse holo foil' &&
                    card.tcgplayer?.prices?.reverseHolofoil?.mid) ||
                  (selectedType === 'normal' &&
                    card.tcgplayer?.prices?.normal?.mid)}
              </p>
            </div>
            <div className='shadow-inner p-4 bg-white bg-opacity-80 flex flex-grow flex-col items-center'>
              <p className='font-bold text-md text-center'>High</p>
              <p className='font-bold text-lg text-green-500'>
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
    </>
  );
};

export default PriceCard;
