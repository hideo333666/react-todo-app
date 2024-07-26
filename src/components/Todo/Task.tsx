import React from 'react';

interface TaskProps {
    task: {
        id: string;
        content: string;
    };
    onDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDragStart }) => {
    return (
        <div className="task" draggable onDragStart={(event) => onDragStart(event, task.id)}>
            {task.content}
        </div>
    );
};

export default Task;
