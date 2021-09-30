export const scrollTo = (target: string): void => {
  document.getElementById(target)!.scrollIntoView({ behavior: 'smooth' });
};
