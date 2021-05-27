import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Bookmark from '@material-ui/icons/Bookmark';

/* Draggable
    - return func 
    - cung cấp cho compoment {...provided.draggableProps}
muốn phản hồi move từ người dùng
- {...provided.dragHandleProps} kiểm soát thực thể
    */

/* 
//Draggable
const draggableSnapshot = {
    isDragging: true,
    draggingOver: 'column-1'
}
const droppableSnapshot = {
    isDraggingOver: true,
    draggingOverWith: 'task-1'
}
*/
const Task = ({ task, index }) => {
  const isDragDisabled = task.id === 'task-1';
  return (
    <div>
      <Draggable
        draggableId={task.id}
        index={index}
        // isDragDisabled={isDragDisabled}

        // CONDITION ALLOW REMOVE
      >
        {(provided, snapshot) => {
          const styles = {
            backgroundColor: isDragDisabled
              ? 'lightgrey'
              : snapshot.isDragging
              ? 'lightgreen'
              : 'transparent',
            border: ' 1px dotted lightgrey',
            borderRadius: '4px',
            margin: 10,
            padding: 8,
            display: 'flex',
            alignItem: 'center',
            flexGrow: 1,
          };

          const otherProps = {
            ...provided.draggableProps,
            style: {
              ...provided.draggableProps.style,
              ...styles,
            },
          };

          return (
            <div
              {...otherProps}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
            >
              <div>
                <Bookmark />
              </div>
              {task.content}
            </div>
          );
        }}
      </Draggable>
    </div>
  );
};

export default Task;
