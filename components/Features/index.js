const features = [
  {
    title: 'Card prices from TCGPlayer',
    img: 'https://res.cloudinary.com/jleomorris/image/upload/f_auto,q_auto/v1632359543/Pokemon-tcg-price-guide/TCG-player-logo.png',
  },
  {
    title: 'Find cards by name, type, release date, legality, and more',
    img: 'https://res.cloudinary.com/jleomorris/image/upload/v1632359656/Pokemon-tcg-price-guide/magnifying-glass.svg',
  },
  {
    title: 'Developed using PokemonTCG API',
    img: 'https://res.cloudinary.com/jleomorris/image/upload/f_auto,q_auto/v1632194237/Pokemon-tcg-price-guide/gengar.png',
  },
];

const Features = () => {
  return (
    <div>
      <section className='features flex flex-wrap border border-blue-500 w-full'>
        {features.map((feature) => (
          <div
            key={feature.title}
            className='feature flex flex-col items-center border border-red-500 m-2 w-30% text-center'
          >
            <div className='h-20 border border-green-500'>
              <img src={feature.img} alt='feature' className='h-full' />
            </div>
            <p className='mt-5 text-2xl'>{feature.title}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Features;
