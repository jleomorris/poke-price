// Next
import Image from 'next/image';

const features = [
  {
    title: 'Card prices from TCGPlayer',
    img: 'https://res.cloudinary.com/jleomorris/image/upload/f_auto,q_auto/v1632359543/Pokemon-tcg-price-guide/TCG-player-logo.png',
  },
  {
    title: 'Find cards by name and set',
    img: 'https://res.cloudinary.com/jleomorris/image/upload/v1632359656/Pokemon-tcg-price-guide/magnifying-glass.svg',
  },
  {
    title: 'Developed using PokemonTCG API',
    img: 'https://res.cloudinary.com/jleomorris/image/upload/f_auto,q_auto/v1632194237/Pokemon-tcg-price-guide/gengar.png',
  },
];

const Features: React.FC = () => {
  return (
    <div>
      <section className='features flex flex-wrap justify-center w-full'>
        {features.map((feature) => (
          <div
            key={feature.title}
            className='feature flex flex-col items-center m-2 w-1/4 lg:w-30% text-center'
          >
            <div className='h-24 sm:h-32 w-32 sm:w-40 relative'>
              <Image
                src={feature.img}
                alt='feature'
                objectFit='contain'
                layout='fill'
              />
            </div>
            <p className='mt-5 text-sm lg:text-2xl text-white'>
              {feature.title}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Features;
