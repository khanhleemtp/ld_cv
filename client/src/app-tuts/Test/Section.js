import { Box, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import ContainerSection from './ContainerSection';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: ({ isActiveSection }) =>
      isActiveSection ? theme.palette.grey[100] : 'transparent',
    transition: 'all 0.2s ease',
    borderRadius: 4,
  },
}));
const Section = ({ children, title, ...props }) => {
  const [isActiveSection, setIsActiveSection] = useState(false);
  const classes = useStyles({ isActiveSection });
  return (
    <Box className={classes.root} padding={1}>
      <ContainerSection
        {...props}
        type="title"
        isActiveSection={isActiveSection}
        setIsActiveSection={setIsActiveSection}
      >
        {title}
      </ContainerSection>
      {children}
    </Box>
  );
};

export default Section;
