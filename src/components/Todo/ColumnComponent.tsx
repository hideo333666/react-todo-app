import React, { useState } from 'react';
import Task from './Task';
import AddTaskForm from './AddTaskForm';
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

const ColumnComponent: React.FC<ColumnProps> = ({
    column,
    tasks,
    onDragOver,
    onDrop,
    onAddTask,
}) => {
    const [isAddingTask, setIsAddingTask] = useState(false);

    const handleAddTaskClick = () => {
        setIsAddingTask(true);
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, taskId: string) => {
        event.dataTransfer.setData('taskId', taskId);
    };

    return (
        <div
            className="column"
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, column.id)}
        >
            <h3>{column.title}</h3>
            <div className="task-list">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} onDragStart={handleDragStart} />
                ))}
            </div>
            {isAddingTask ? (
                <AddTaskForm columnId={column.id} onAddTask={onAddTask} />
            ) : (
                <button className="add-task-button" onClick={handleAddTaskClick}>
                    タスクを追加
                </button>
            )}
        </div>
    );
};

export default ColumnComponent;
