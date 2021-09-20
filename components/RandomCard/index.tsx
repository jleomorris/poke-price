import { useState, useEffect } from 'react';
import Image from 'next/image';

const RandomCard = ({ randomCard }) => {
  const [isNormal, setIsNormal] = useState<boolean>(false);
  const [isHoloFoil, setIsHoloFoil] = useState<boolean>(false);
  const [isReverseHoloFoil, setIsReverseHoloFoil] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    setCardTypes();
  }, []);

  // Set Card Types
  const setCardTypes = (): void => {
    if (randomCard.tcgplayer.prices.reverseHolofoil) {
      setIsReverseHoloFoil(true);
      setSelectedType('reverse holo foil');
    }
    if (randomCard.tcgplayer.prices.holofoil) {
      setIsHoloFoil(true);
      setSelectedType('holo foil');
    }
    if (randomCard.tcgplayer.prices.normal) {
      setIsNormal(true);
      setSelectedType('normal');
    }
  };

  return (
    <>
      <h2 className='text-7xl tracking-tighter mb-10 text-white'>
        Random Card
      </h2>
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
            src={randomCard.images.large}
            // className='h-full'
            alt='random card'
            layout='fixed'
            height={400}
            width={295}
            // objectFit='contain'
          />
        </div>
        <div className='p-3 bg-white bg-opacity-70'>
          <p className='font-bold text-4xl uppercase tracking-widest'>
            {randomCard.name}
          </p>
          <p className='text-xl uppercase tracking-widest'>
            {randomCard.set.name}
          </p>
          <p className='text-md uppercase tracking-widest'>
            Release date: {randomCard.set.releaseDate}
          </p>
          <p className='text-md uppercase tracking-widest'>
            No. printed: {randomCard.set.printedTotal}
          </p>
          <div className='inline-block shadow-inner p-4 mt-5 bg-white bg-opacity-80 m-1  rounded-xl'>
            <p className='font-bold text-xl'>Market Price</p>
            <p className='font-bold text-7xl'>
              $
              {(selectedType === 'holo foil' &&
                randomCard.tcgplayer?.prices?.holofoil?.market) ||
                (selectedType === 'reverse holo foil' &&
                  randomCard.tcgplayer?.prices?.reverseHolofoil?.market) ||
                (selectedType === 'normal' &&
                  randomCard.tcgplayer?.prices?.normal?.market)}
            </p>
          </div>
        </div>
        <div className=' rounded-r-xl overflow-hidden'>
          <div className='flex flex-col h-full'>
            <div className='shadow-inner p-4 bg-white bg-opacity-80 h-1/2 flex flex-col items-center'>
              <p className='font-bold text-xl'>Low Price</p>
              <p className='font-bold text-6xl text-red-500 '>
                $
                {(selectedType === 'holo foil' &&
                  randomCard.tcgplayer?.prices?.holofoil?.low) ||
                  (selectedType === 'reverse holo foil' &&
                    randomCard.tcgplayer?.prices?.reverseHolofoil?.low) ||
                  (selectedType === 'normal' &&
                    randomCard.tcgplayer?.prices?.normal?.low)}
              </p>
            </div>
            <div className='shadow-inner p-4 bg-white bg-opacity-80 h-1/2 flex flex-col items-center'>
              <p className='font-bold text-xl'>Mid Price</p>
              <p className='font-bold text-6xl text-yellow-500'>
                $
                {(selectedType === 'holo foil' &&
                  randomCard.tcgplayer?.prices?.holofoil?.mid) ||
                  (selectedType === 'reverse holo foil' &&
                    randomCard.tcgplayer?.prices?.reverseHolofoil?.mid) ||
                  (selectedType === 'normal' &&
                    randomCard.tcgplayer?.prices?.normal?.mid)}
              </p>
            </div>
            <div className='shadow-inner p-4 bg-white bg-opacity-80 h-1/2 flex flex-col items-center'>
              <p className='font-bold text-xl'>High Price</p>
              <p className='font-bold text-6xl text-green-500'>
                $
                {(selectedType === 'holo foil' &&
                  randomCard.tcgplayer?.prices?.holofoil?.high) ||
                  (selectedType === 'reverse holo foil' &&
                    randomCard.tcgplayer?.prices?.reverseHolofoil?.high) ||
                  (selectedType === 'normal' &&
                    randomCard.tcgplayer?.prices?.normal?.high)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RandomCard;
