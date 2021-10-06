export const scrollTo = (target: string): void => {
  document.getElementById(target)!.scrollIntoView({ behavior: 'smooth' });
};

export const removeSpecialChars = (str: string): string =>
  str.replace(/[^a-zA-Z0-9]/g, '');
