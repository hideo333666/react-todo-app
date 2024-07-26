import React, { useState } from 'react';

interface AddTaskFormProps {
    columnId: string;
    onAddTask: (columnId: string, taskContent: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ columnId, onAddTask }) => {
    const [newTaskContent, setNewTaskContent] = useState('');

    const handleTaskContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskContent(event.target.value);
    };

    const handleAddTask = () => {
        if (newTaskContent.trim()) {
            onAddTask(columnId, newTaskContent.trim());
            setNewTaskContent('');
        }
    };

    return (
        <div className="add-task">
            <input
                type="text"
                value={newTaskContent}
                onChange={handleTaskContentChange}
                placeholder="タスク内容を入力"
            />
            <button onClick={handleAddTask}>追加</button>
        </div>
    );
};

export default AddTaskForm;
