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
    onTaskDrop: (
        sourceColumnId: string,
        sourceTaskId: string,
        targetColumnId: string,
        targetIndex: number
    ) => void;
}

const ColumnComponent: React.FC<ColumnProps> = ({
    column,
    tasks,
    onDragOver,
    onDrop,
    onAddTask,
    onTaskDrop,
}) => {
    const [isAddingTask, setIsAddingTask] = useState(false);

    const handleAddTaskClick = () => {
        setIsAddingTask(true);
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, taskId: string) => {
        event.dataTransfer.setData('taskId', taskId);
        event.dataTransfer.setData('sourceColumnId', column.id);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetTaskIndex: number) => {
        event.preventDefault();
        const sourceTaskId = event.dataTransfer.getData('taskId');
        const sourceColumnId = event.dataTransfer.getData('sourceColumnId');
        onTaskDrop(sourceColumnId, sourceTaskId, column.id, targetTaskIndex);
    };

    return (
        <div
            className="column"
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, column.id)}
        >
            <h2>{column.title}</h2>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <div
                        key={task.id}
                        draggable
                        onDragStart={(event) => handleDragStart(event, task.id)}
                        onDrop={(event) => handleDrop(event, index)}
                        onDragOver={(event) => event.preventDefault()}
                    >
                        <Task task={task} />
                    </div>
                ))}
            </div>
            {isAddingTask ? (
                <AddTaskForm columnId={column.id} onAddTask={onAddTask} />
            ) : (
                <button className="add-task__button" onClick={handleAddTaskClick}>
                    タスクを追加
                </button>
            )}
        </div>
    );
};

export default ColumnComponent;
