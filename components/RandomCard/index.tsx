const RandomCard = ({ randomCard }) => {
  return (
    <>
      <h2 className='text-5xl font-bold mb-10'>Random Card</h2>

      <div className='flex bg-gray-800 rounded-xl shadow-lg'>
        <img src={randomCard.images.large} className='h-96' alt='random card' />
        <div className='p-5 bg-gray-800 rounded-r-xl'>
          <p className='font-bold text-4xl mb-5 mr-5 text-white'>
            {randomCard.name}
          </p>
          <div className='flex flex-wrap'>
            <div className='border-2 border-white m-2 ml-1 p-2 rounded-xl'>
              <p className='font-thin text-xl text-white'>
                Low Price (Holofoil){' '}
              </p>
              <p className='font-bold text-xl text-red-500 '>
                ${randomCard.tcgplayer?.prices?.holofoil?.low}
              </p>
            </div>
            <div className='border-2 border-white m-2 ml-1 p-2 rounded-xl'>
              <p className='font-thin text-xl text-white'>
                Mid Price (Holofoil){' '}
              </p>
              <p className='font-bold text-xl text-yellow-500'>
                ${randomCard.tcgplayer?.prices?.holofoil?.mid}
              </p>
            </div>
            <div className='border-2 border-white m-2 ml-1 p-2 rounded-xl'>
              <p className='font-thin text-xl text-white'>
                High Price (Holofoil){' '}
              </p>
              <p className='font-bold text-xl text-green-500'>
                ${randomCard.tcgplayer?.prices?.holofoil?.high}
              </p>
            </div>
            <div className='border-2 border-white m-2 ml-1 p-2 rounded-xl'>
              <p className='font-thin text-xl text-white'>
                Market Price (Holofoil){' '}
              </p>
              <p className='font-bold text-xl text-white'>
                ${randomCard.tcgplayer?.prices?.holofoil?.market}
              </p>
            </div>
            <div className='border-2 border-white m-2 ml-1 p-2 rounded-xl'>
              <p className='font-thin text-xl text-white'>Updated at </p>
              <p className='font-bold text-xl text-white'>
                {randomCard.tcgplayer?.updatedAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RandomCard;
