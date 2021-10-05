import { useRef } from 'react';

export interface IProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageCount: number;
  resultsRef: React.MutableRefObject<HTMLDivElement>;
}
