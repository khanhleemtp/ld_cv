import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: '1 1 0',
    flexDirection: 'column',
    margin: 12,
    height: theme.spacing(40),
  },
}));

const Column = ({ tasks, column, isDropDisabled, index }) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={classes.root}
        >
          <Typography variant="h6" {...provided.dragHandleProps}>
            {column.title}
          </Typography>
          <Droppable
            // direction="horizontal"
            droppableId={column.id}
            // type={column.id === 'column-3' ? 'done' : 'active'}
            // isDropDisabled={isDropDisabled}
            // CONDITION ALLOW REMOVE
          >
            {/*
          - Droppable child is func return react-component
          - React-beautiful-dnd not create DOM, you custom it
          - func with tham số provided cung cấp Droppable props mà bạn cần
           applies to component return mà bạn muốn drop 
           {...provied.droppableProps} mà bạn cần để thiết kế droppable
          - innerRef func  return DOM Node component
          - placeholder là react-element sd để tăng 
          không gian có sẵn trong droppable trong suốt quá trình drag
          - placeholder thêm vào như 1 child component of droppable
          - 
           */}
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  padding: '8px',
                  flexGrow: 1,
                  transition: 'ease background 0.2s',
                  minHeight: '100px',
                  background: snapshot.isDraggingOver ? 'skyblue' : 'white',
                }}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Paper>
      )}
    </Draggable>
  );
};

export default Column;
