import { makeStyles } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Box from '@material-ui/core/Box';
import useResumeLayoutSection from './useResumeLayoutSection';

const useStyles = makeStyles((theme) => ({
  popper: {
    position: 'absolute',
    left: '50%',
    top: ({ record }) => (record === 'header' ? '-10px' : '-20px'),
    borderRadius: '20px',
    transform: 'translate(-50%,-50%)',
    background: theme.palette.grey[100],
    display: 'flex',
    alignItems: 'center',
    opacity: ({ open }) => (open ? 1 : 0),
    cursor: 'pointer',
  },

  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flex: '1 1 0',
    minWidth: '140px',
    background: ({ open }) =>
      open ? `${theme.palette.grey[100]}` : `transparent`,
    borderRadius: '4px',
    '&:hover': {
      border: ({ open, isSectionTitle }) =>
        !(isSectionTitle && open)
          ? `1px solid ${theme.palette.secondary.main}`
          : '1px solid transparent',
    },
    border: ({ open, isSectionTitle }) =>
      open && !isSectionTitle
        ? `1px solid ${theme.palette.secondary.main}`
        : `1px solid transparent`,
    // width: '100%',

    margin: theme.spacing(0.5),
  },

  icon: {
    fontSize: '18px',
    alignItems: 'center',
    marginLeft: '8px',
    marginRight: '8px',
  },
}));

const ResumeSectionLayout = ({
  settingComponent,
  record,
  children,
  type,
  isActiveRecord,
  handleCloseRecord,
  handleOpenRecord,
}) => {
  const { isActiveSection, handleCloseSection, handleOpenSection } =
    useResumeLayoutSection();
  const isSectionTitle = type === 'title';
  const open = isSectionTitle ? isActiveRecord : isActiveSection;
  const handleClose = isSectionTitle ? handleCloseRecord : handleCloseSection;
  const handleOpen = isSectionTitle ? handleOpenRecord : handleOpenSection;
  const classes = useStyles({ open, record, isSectionTitle });

  return (
    <ClickAwayListener
      onClickAway={handleClose}
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
    >
      <Box
        padding={1}
        paddingBottom={0}
        paddingTop={0}
        onClick={handleOpen}
        className={classes.root}
      >
        <Fade in={open}>
          <div className={classes.popper}>{settingComponent}</div>
        </Fade>
        {children}
      </Box>
    </ClickAwayListener>
  );
};

export default ResumeSectionLayout;
