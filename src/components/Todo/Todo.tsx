import React, { useState } from 'react';
import './Todo.scss';

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface ColumnProps {
  column: Column;
  tasks: Task[];
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  onAddTask: (columnId: string, taskContent: string) => void;
}

const ColumnComponent: React.FC<ColumnProps> = ({ column, tasks, onDragOver, onDrop, onAddTask }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

  const handleTaskContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskContent(event.target.value);
  };

  const handleAddTask = () => {
    if (newTaskContent.trim()) {
      onAddTask(column.id, newTaskContent.trim());
      setNewTaskContent('');
      setIsAddingTask(false);
    }
  };

  return (
    <div className="column" onDragOver={onDragOver} onDrop={(event) => onDrop(event, column.id)}>
      <h3>{column.title}</h3>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task"
            draggable
            onDragStart={(event) => event.dataTransfer.setData('taskId', task.id)}
          >
            {task.content}
          </div>
        ))}
      </div>
      {isAddingTask ? (
        <div className="add-task">
          <input
            type="text"
            value={newTaskContent}
            onChange={handleTaskContentChange}
            placeholder="タスク内容を入力"
          />
          <button onClick={handleAddTask}>追加</button>
        </div>
      ) : (
        <button className="add-task-button" onClick={handleAddTaskClick}>
          タスクを追加
        </button>
      )}
    </div>
  );
};

const TodoList: React.FC = () => {
  const initialTasks: { [key: string]: Task } = {
    'task-1': { id: 'task-1', content: 'プロジェクト計画' },
    'task-2': { id: 'task-2', content: 'キックオフミーティング' },
    'task-3': { id: 'task-3', content: 'テスト' },
  };

  const initialColumns: { [key: string]: Column } = {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: '作業中',
      taskIds: ['task-3'],
    },
    'column-3': {
      id: 'column-3',
      title: '完了',
      taskIds: [],
    },
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, columnId: string) => {
    const taskId = event.dataTransfer.getData('taskId');

    const startColumnId = Object.keys(columns).find((id) =>
      columns[id].taskIds.includes(taskId)
    )!;
    const startColumn = columns[startColumnId];
    const finishColumn = columns[columnId];

    if (startColumn === finishColumn) {
      return;
    }

    const newStartTaskIds = startColumn.taskIds.filter((id) => id !== taskId);
    const newFinishTaskIds = Array.from(finishColumn.taskIds);
    newFinishTaskIds.push(taskId);

    setColumns({
      ...columns,
      [startColumn.id]: {
        ...startColumn,
        taskIds: newStartTaskIds,
      },
      [finishColumn.id]: {
        ...finishColumn,
        taskIds: newFinishTaskIds,
      },
    });
  };

  const handleAddTask = (columnId: string, taskContent: string) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask: Task = { id: newTaskId, content: taskContent };

    setTasks((prevTasks) => ({
      ...prevTasks,
      [newTaskId]: newTask,
    }));

    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        taskIds: [...prevColumns[columnId].taskIds, newTaskId],
      },
    }));
  };

  return (
    <div className="todo-list">
      {Object.values(columns).map((column) => {
        const tasksForColumn = column.taskIds.map((taskId) => tasks[taskId]);
        return (
          <ColumnComponent
            key={column.id}
            column={column}
            tasks={tasksForColumn}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onAddTask={handleAddTask}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
