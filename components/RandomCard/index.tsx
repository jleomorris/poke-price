import { useState, useEffect } from 'react';
const RandomCard = ({ randomCard }) => {
  const [isHoloFoil, setIsHoloFoil] = useState<boolean>(false);
  const [isReverseHoloFoil, setIsReverseHoloFoil] = useState<boolean>(false);

  useEffect(() => {
    if (randomCard.tcgplayer.prices.holofoil) setIsHoloFoil(true);
    if (randomCard.tcgplayer.prices.reverseHolofoil) setIsReverseHoloFoil(true);
  }, []);

  return (
    <>
      <h2 className='text-7xl tracking-tighter mb-10 text-white'>
        Random Card
      </h2>
      <div className=''>
        <div className='tabs ml-3 flex'>
          {isHoloFoil && (
            <p className='mr-2 px-4 py-2 bg-white bg-opacity-70 rounded-t-xl'>
              Holofoil
            </p>
          )}
          {isReverseHoloFoil && (
            <p className='mr-2 px-4 py-2 bg-white bg-opacity-70 rounded-t-xl'>
              Reverse Holofoil
            </p>
          )}
        </div>
        <div className='h-96 flex bg-white bg-opacity-70 shadow-lg rounded-xl'>
          <img
            src={randomCard.images.large}
            className='h-full'
            alt='random card'
          />
          <div className='p-3'>
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
              <p className='font-bold text-xl'>Market Price (Holofoil) </p>
              <p className='font-bold text-7xl'>
                ${randomCard.tcgplayer?.prices?.holofoil?.market}
              </p>
              {/* <div className='shadow-inner p-4 bg-white bg-opacity-80 m-1 flex flex-col items-center rounded-r-xl'>
              <p className='font-bold text-xl'>Updated at </p>
              <p className='font-bold text-6xl'>
                {randomCard.tcgplayer?.updatedAt}
              </p>
            </div> */}
            </div>
          </div>
          <div className=' rounded-r-xl overflow-hidden'>
            <div className='flex flex-col h-full'>
              <div className='shadow-inner p-4 bg-white bg-opacity-80 h-1/2 flex flex-col items-center'>
                <p className='font-bold text-xl'>Low Price (Holofoil) </p>
                <p className='font-bold text-6xl text-red-500 '>
                  ${randomCard.tcgplayer?.prices?.holofoil?.low}
                </p>
              </div>
              <div className='shadow-inner p-4 bg-white bg-opacity-80 h-1/2 flex flex-col items-center'>
                <p className='font-bold text-xl'>Mid Price (Holofoil) </p>
                <p className='font-bold text-6xl text-yellow-500'>
                  ${randomCard.tcgplayer?.prices?.holofoil?.mid}
                </p>
              </div>
              <div className='shadow-inner p-4 bg-white bg-opacity-80 h-1/2 flex flex-col items-center'>
                <p className='font-bold text-xl'>High Price (Holofoil) </p>
                <p className='font-bold text-6xl text-green-500'>
                  ${randomCard.tcgplayer?.prices?.holofoil?.high}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RandomCard;
