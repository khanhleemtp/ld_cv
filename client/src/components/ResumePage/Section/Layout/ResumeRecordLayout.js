import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import ResumeSectionLayout from './ResumeSectionLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: ({ isActiveRecord }) =>
      isActiveRecord ? theme.palette.grey[100] : 'transparent',
    transition: 'all 0.2s ease',
    borderRadius: 4,
  },
}));
const ResumeRecordLayout = ({ children, titleComponent, settingComponent }) => {
  const [isActiveRecord, setIsActiveRecord] = useState(false);
  const handleOpenRecord = () => {
    setIsActiveRecord(true);
  };
  const handleCloseRecord = () => {
    setIsActiveRecord(false);
  };
  const classes = useStyles({ isActiveRecord });
  return (
    <Box className={classes.root} padding={1}>
      <ResumeSectionLayout
        type="title"
        settingComponent={settingComponent}
        isActiveRecord={isActiveRecord}
        handleCloseRecord={handleCloseRecord}
        handleOpenRecord={handleOpenRecord}
      >
        {titleComponent}
      </ResumeSectionLayout>

      {children}
    </Box>
  );
};

export default ResumeRecordLayout;
