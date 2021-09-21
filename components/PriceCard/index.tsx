import { useState, useEffect } from 'react';
import Image from 'next/image';

const PriceCard = ({ card }) => {
  const [isNormal, setIsNormal] = useState<boolean>(false);
  const [isHoloFoil, setIsHoloFoil] = useState<boolean>(false);
  const [isReverseHoloFoil, setIsReverseHoloFoil] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    setCardTypes();
  }, []);

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

  return (
    <>
      <div className='tabs ml-3 flex'>
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
      <div className='h-96 flex shadow-lg rounded-xl'>
        {/* <img
          src={randomCard.images.large}
          className='h-full'
          alt='random card'
          /> */}
        <div className='relative'>
          <Image
            src={card.images.small}
            // className='h-full'
            alt='random card'
            layout='fixed'
            height={400}
            width={295}
            // objectFit='contain'
          />
        </div>
        <div className='p-3 bg-white bg-opacity-70 w-1/3 border border-blue-500'>
          <p className='font-bold text-3xl uppercase tracking-widest'>
            {card.name}
          </p>
          <p className='text-xl uppercase tracking-widest'>{card.set.name}</p>
          <p className='text-md uppercase tracking-widest'>
            Release date: {card.set.releaseDate}
          </p>
          <p className='text-md uppercase tracking-widest'>
            No. printed: {card.set.printedTotal}
          </p>
          <div className='inline-block shadow-inner p-4 mt-5 bg-white bg-opacity-80 m-1  rounded-xl'>
            <p className='font-bold text-xl'>Market Price</p>
            <p className='font-bold text-5xl'>
              $
              {(selectedType === 'holo foil' &&
                card.tcgplayer?.prices?.holofoil?.market) ||
                (selectedType === 'reverse holo foil' &&
                  card.tcgplayer?.prices?.reverseHolofoil?.market) ||
                (selectedType === 'normal' &&
                  card.tcgplayer?.prices?.normal?.market)}
            </p>
          </div>
        </div>
        <div className=' rounded-r-xl overflow-hidden w-1/3 border border-red-500'>
          <div className='flex flex-col h-full'>
            <div className='shadow-inner p-4 bg-white bg-opacity-80 h-1/2 flex flex-col items-center'>
              <p className='font-bold text-xl'>Low Price</p>
              <p className='font-bold text-5xl text-red-500 '>
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
              <p className='font-bold text-xl'>Mid Price</p>
              <p className='font-bold text-5xl text-yellow-500'>
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
              <p className='font-bold text-xl'>High Price</p>
              <p className='font-bold text-5xl text-green-500'>
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
