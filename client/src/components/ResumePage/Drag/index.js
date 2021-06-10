import React, { useState } from 'react';
import { useResume } from '../../../contexts/useResume';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MuiCheckBox from '../Mui/MuiCheckBox';
import ControlPointOutlinedIcon from '@material-ui/icons/ControlPointOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResumeDrag = () => {
  const { fields, handleDrag } = useResume();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        endIcon={<ControlPointOutlinedIcon />}
      >
        Điều khiển
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-slide-title">LD Kéo thả</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Kéo thả,chọn để di chuyển các phần
          </DialogContentText>
          <DragDropContext onDragEnd={handleDrag}>
            <Droppable droppableId="test-items">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {fields.map((item, index) => {
                    return (
                      <Draggable
                        key={`test[${index}]`}
                        draggableId={`item-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                            key={item.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            flexGrow={1}
                          >
                            <Box padding={1}></Box>
                            <Box
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'skyblue',
                              }}
                              {...provided.dragHandleProps}
                            >
                              <Box flexGrow={1}>
                                <Typography variant="h6" align="center">
                                  {item.name}
                                </Typography>
                              </Box>
                              <Box>
                                <MuiCheckBox
                                  nameField={`sections.${index}.enabled`}
                                />
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Xong
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResumeDrag;
