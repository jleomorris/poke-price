import { ReactNode, useEffect, useState } from 'react';
// Animation
import { motion } from 'framer-motion';
import { pageAnimation } from '../../animations';
import * as animationsImport from '../../animations';

interface IProps {
  children: ReactNode;
  variant: Variant;
  child?: boolean;
}

export enum Variant {
  PAGE,
  FADEUP,
}

const animations: { [key: string]: any } = animationsImport;

const VARIANT_MAPS: Record<Variant, string> = {
  [Variant.PAGE]: 'pageAnimation',
  [Variant.FADEUP]: 'fadeUp',
};

const AnimationChild: React.FC<IProps> = ({ children, variant, child }) => {
  return (
    <motion.main
      variants={animations[VARIANT_MAPS[variant]]} // Pass the variant object into Framer Motion
      transition={{ type: 'linear' }} // Set the transition to linear
      className='animation-child'
    >
      {children}
    </motion.main>
  );
};

export default AnimationChild;
