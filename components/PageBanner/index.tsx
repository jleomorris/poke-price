import { ReactElement } from 'react';
// Next
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  children?: ReactElement;
  linkTarget: string;
}

const PageBanner: React.FC<IProps> = ({ children, linkTarget }) => {
  return (
    <div className='relative h-72 lg:h-96 p-10 w-full'>
      <Image
        className='h-full w-full absolute top-0 left-0'
        layout='fill'
        objectFit='cover'
        src='https://res.cloudinary.com/jleomorris/image/upload/f_auto,q_auto/v1633172502/Pokemon-tcg-price-guide/home-background.jpg'
        alt='home background'
      />
      <Link
        href={{
          pathname: `/${linkTarget === 'home' ? '' : linkTarget}`,
        }}
      >
        <a className='relative text-white border border-white rounded-xl py-4 px-6 bg-black bg-opacity-60'>
          &#8592; {`Back to ${linkTarget}`}
        </a>
      </Link>
      {children}
    </div>
  );
};

export default PageBanner;
