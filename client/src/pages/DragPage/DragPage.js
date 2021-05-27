import React, { useState } from 'react';
import Column from './Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Box from '@material-ui/core/Box';

/* 
React-beautiful-dnd
tạo bởi 3 kiểu component
    DragDropContext: wrap 1 phần của app mà chúng ta muốn drag and drop
        Droppable: tạo ra vùng mà chúng ta có thể dropped lên và nó gồm draggale
            Draggable: là 1 component mà chúng ta có thể bỏ ra vào các droppable và trong droppable
*/

/* result object 
    - contain: draggableId
    const result = {
        draggableId: 'task-1',
        type: 'TYPE',
        reason: 'DROP', // DROP or CANCEL : live options
        source: {
            droppableId: 'column-1',
            index: 0,
        },
        destionation: {
            droppabledId: 'column-1',
            index: 1 
            // null : outside
        }
    }
*/

/* 

// onDragStart
const start = {
  draggableId: 'task-1',
  type: 'TYPE',
  source: {
    droppableId: "column-1",
    index: 0,
  },
}

// onDragUpdate
const update= {
  ...start,
  destination: {
    droppabledId: 'column-1',
    index: 1,
  }
}

// onDragEnd
const result = {
  ...update,
  reason: "DROP"
}
*/

const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Have breakfast',
    },
    'task-2': {
      id: 'task-2',
      content: 'Watching TV',
    },
    'task-3': {
      id: 'task-3',
      content: 'Have lunch',
    },
    'task-4': {
      id: 'task-4',
      content: 'Charge Invoice',
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Process',
      taskIds: [],
    },
    // 'column-3': {
    //   id: 'column-3',
    //   title: 'Done',
    //   taskIds: [],
    // },
  },
  // reOrdering of columns
  columnsOrder: ['column-1', 'column-2'],
};

const DragPage = () => {
  const [data, setData] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState(null);

  // const onDragStart = () => {
  //   document.querySelector('.MuiPaper-rounded').style.backgroundColor =
  //     '#d74690';
  //   document.querySelector('.MuiPaper-rounded').style.transition =
  //     'all 0.2s ease';
  // };

  const onDragStart = (start) => {
    const homeIndex = data.columnsOrder.indexOf(start.source.droppableId);
    setHomeIndex(homeIndex);
  };

  const onDragUpdate = (update) => {
    const { destination } = update;
    const opacity =
      destination && destination.index !== 0
        ? destination.index / Object.keys(data.tasks).length
        : 0.8;
    document.querySelector('.MuiPaper-rounded').style.opacity = opacity;
  };

  const onDragEnd = (result) => {
    setHomeIndex(null);
    // func đồng bộ update dựa trên state mà là kq drag and drop
    // TODO reorder our column
    document.querySelector('.MuiPaper-rounded').style.backgroundColor =
      'inherit';
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnsOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newData = {
        ...data,
        columnsOrder: newColumnOrder,
      };
      setData(newData);
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    if (start === finish) {
      const column = data.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newData);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newData);
  };

  return (
    <DragDropContext
      // //   // call when drag starts
      onDragStart={onDragStart}
      // //   // call st changes during a drag như item đến vị trí mới
      // onDragUpdate={onDragUpdate}
      //   // call in end drag
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Box
            display="flex"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              width: 720,
              margin: 12,
              padding: 12,
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {data.columnsOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId, index) => data.tasks[taskId]
              );
              return (
                <Column
                  tasks={tasks}
                  column={column}
                  key={column.id}
                  // isDropDisabled={index < homeIndex}
                  index={index}
                />
              );
            })}
            {/* {provided.placeholder} */}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragPage;
