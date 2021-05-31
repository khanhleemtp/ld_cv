import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ImageCropper from './ImageCropper';
import { useWatch } from 'react-hook-form';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
  },
  content: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  upload: {},
  wrapperImg: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    position: 'relative',
    '& button': {
      display: 'none',
    },
    '&:hover button': {
      display: 'flex',
    },
    '& .overlay': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      transition: 'all 0.5s ease',
      opacity: 0,
      borderRadius: '50%',
      zIndex: 1,
    },
    '&:hover .overlay': {
      opacity: 1,
    },
  },
  deleteBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    zIndex: 4,
  },
}));

export default function UploadImageDialog({
  open,
  setOpen,
  setValue,
  control,
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const [blob, setBlob] = useState(null);
  const [inputImg, setInputImg] = useState('');

  const getBlob = (blob) => {
    // pass blob up from the ImageCropper component
    setBlob(blob);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onInputChange = (e) => {
    // convert image file to base64 string
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        setInputImg(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const imageLink = useWatch({
    control,
    name: 'header.photo',
  });

  const classes = useStyles();
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        disableScrollLock={true}
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle id="form-dialog-title">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>Photo</Box>
            <Button onClick={handleClose} color="primary">
              <CloseOutlinedIcon />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent dividers className={classes.content}>
          {inputImg ? (
            <Box
              style={{
                position: 'relative',
                height: 300,
                width: 300,
              }}
            >
              <ImageCropper getBlob={getBlob} inputImg={inputImg} />
            </Box>
          ) : (
            <Box className={classes.wrapperImg}>
              <Button
                variant="contained"
                color="primary"
                className={classes.deleteBtn}
                onClick={() => setValue('header.photo', 'user.svg')}
              >
                <DeleteOutlineIcon />
              </Button>
              <img
                src={`${imageLink}`}
                alt="img"
                style={{
                  borderRadius: '50%',
                  width: 140,
                  height: 140,
                }}
              />
              <div className="overlay"></div>
            </Box>
          )}
        </DialogContent>
        <DialogActions
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
          }}
        >
          {inputImg ? (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  setInputImg('');
                }}
                color="primary"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  toBase64(blob).then((data) => setValue('header.photo', data));
                  setInputImg('');
                }}
                color="primary"
              >
                Accept
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                component="label"
                className={classes.upload}
              >
                Upload File
                <input type="file" hidden onChange={onInputChange} />
              </Button>
              <Button variant="contained" onClick={handleClose} color="primary">
                OK
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
