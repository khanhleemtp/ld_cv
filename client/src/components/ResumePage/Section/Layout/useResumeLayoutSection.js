import { useState } from 'react';

const useResumeLayoutSection = () => {
  const [isActiveSection, setIsActiveSection] = useState(false);

  const handleOpenSection = () => {
    setIsActiveSection(true);
  };

  const handleCloseSection = () => {
    setIsActiveSection(false);
  };

  return {
    isActiveSection,
    handleOpenSection,
    handleCloseSection,
  };
};

export default useResumeLayoutSection;
