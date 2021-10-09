import { ReactNode, useEffect, useState } from 'react';
// Animation
import { motion } from 'framer-motion';
import { pageAnimation } from '../../animations';
import * as animationsImport from '../../animations';

interface IProps {
  children: ReactNode;
  variant: Variant;
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

const AnimationParent: React.FC<IProps> = ({ children, variant }) => {
  return (
    <motion.main
      variants={animations[VARIANT_MAPS[variant]]} // Pass the variant object into Framer Motion
      initial='hidden' // Set the initial state to variants.hidden
      animate='enter' // Animated state to variants.enter
      exit='exit' // Exit state (used later) to variants.exit
      transition={{ type: 'linear' }} // Set the transition to linear
      className='animation=parent'
    >
      {children}
    </motion.main>
  );
};

export default AnimationParent;
