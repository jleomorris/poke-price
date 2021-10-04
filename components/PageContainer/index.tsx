import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const PageContainer: React.FC<IProps> = ({ children }) => {
  return <div className='page-container p-10 md:p-20'>{children}</div>;
};

export default PageContainer;
