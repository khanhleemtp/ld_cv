import { ClickAwayListener, Fade, makeStyles, Box } from '@material-ui/core';
import React, { useState } from 'react';
import HeaderSetting from '../Setting/HeaderSetting';
import SectionSetting from '../Setting/SectionSetting';

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
    background: ({ open, type }) =>
      open ? `${theme.palette.grey[100]}` : `transparent`,
    borderRadius: '4px',
    '&:hover': {
      // background: theme.palette.grey[100],
      border: ({ open, type }) =>
        !(type === 'title' && open)
          ? `1px solid ${theme.palette.secondary.main}`
          : '1px solid transparent',
    },
    border: ({ open, type }) =>
      open && type !== 'title'
        ? `1px solid ${theme.palette.secondary.main}`
        : `1px solid transparent`,
    width: '100%',
  },

  icon: {
    fontSize: '18px',
    alignItems: 'center',
    marginLeft: '8px',
    marginRight: '8px',
  },
}));

const ContainerSection = ({
  type,
  setIsActiveSection,
  isActiveSection,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  if (type === 'title') {
    return (
      <WrapperSection
        open={isActiveSection}
        setOpen={setIsActiveSection}
        type={type}
        {...props}
      />
    );
  }
  return <WrapperSection open={open} setOpen={setOpen} {...props} />;
};

const WrapperSection = ({
  children,
  record,
  remove,
  append,
  control,
  index,
  open,
  setOpen,
  type,
  setValue,
  watch,
}) => {
  //   const [open, setOpen] = useState(false);
  const classes = useStyles({ open, record, type });
  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpen(false);
      }}
    >
      <Box
        padding={1}
        paddingBottom={0}
        paddingTop={0}
        onClick={() => {
          setOpen(true);
        }}
        className={classes.root}
      >
        <Fade in={open}>
          <div className={classes.popper}>
            {record === 'header' && (
              <HeaderSetting
                control={control}
                setValue={setValue}
                watch={watch}
              />
            )}
            {record !== 'header' && (
              <SectionSetting append={append} index={index} remove={remove} />
            )}
          </div>
        </Fade>
        {children}
      </Box>
    </ClickAwayListener>
  );
};

export default ContainerSection;
