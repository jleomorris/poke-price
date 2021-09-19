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
      <h2 className='text-5xl font-bold mb-10'>Random Card</h2>
      <div className='border border-blue-500'>
        <div className='tabs border border-red-600 flex'>
          {isHoloFoil && (
            <p className='mr-2 px-4 py-2 rounded-t-xl border border-gray-300 shadow-xl'>
              Holofoil
            </p>
          )}
          {isReverseHoloFoil && (
            <p className='mr-2 px-4 py-2 rounded-t-xl border border-gray-300 shadow-xl'>
              Reverse Holofoil
            </p>
          )}
        </div>
        <div className='h-96 flex bg-gradient-to-r from-black shadow-lg rounded-xl'>
          <img
            src={randomCard.images.large}
            className='h-full'
            alt='random card'
          />
          <div className=' '>
            <p className='font-bold text-4xl text-white uppercase tracking-widest p-5'>
              {randomCard.name}
            </p>
            <div className='flex flex-wrap justify-center'>
              <div className='m-5 shadow-inner p-4 bg-white bg-opacity-80 m-1 flex flex-col items-center rounded-xl'>
                <p className='font-bold text-xl'>Market Price (Holofoil) </p>
                <p className='font-bold text-6xl'>
                  ${randomCard.tcgplayer?.prices?.holofoil?.market}
                </p>
              </div>
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
