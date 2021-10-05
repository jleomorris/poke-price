import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const getDocumentHeight = () => {
  const docHeight = document.body.scrollHeight;
  return docHeight;
};

const useDocumentHeight = () => {
  const location = useLocation();
  const [documentHeight, setDocumentHeight] = useState(getDocumentHeight());

  useEffect(() => {
    const updateDocumentHeight = () => {
      setDocumentHeight(document.body.scrollHeight);
    };

    window.addEventListener('resize', updateDocumentHeight);

    return () => window.removeEventListener('resize', updateDocumentHeight);
  }, [location]);

  return { documentHeight: documentHeight };
};

export default useDocumentHeight;
