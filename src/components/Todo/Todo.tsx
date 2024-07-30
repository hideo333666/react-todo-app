import React, { useState } from 'react';
import ColumnComponent from './ColumnComponent';
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

const TodoApp: React.FC = () => {
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
        const sourceColumnId = event.dataTransfer.getData('sourceColumnId');

        const sourceColumn = columns[sourceColumnId];
        const targetColumn = columns[columnId];

        // If dropped within the same column
        if (sourceColumnId === columnId) {
            const sourceTaskIndex = sourceColumn.taskIds.indexOf(taskId);
            sourceColumn.taskIds.splice(sourceTaskIndex, 1);
            targetColumn.taskIds.push(taskId);

            setColumns({
                ...columns,
                [sourceColumnId]: {
                    ...sourceColumn,
                    taskIds: sourceColumn.taskIds,
                },
            });
        }
    };

    const handleTaskDrop = (
        sourceColumnId: string,
        sourceTaskId: string,
        targetColumnId: string,
        targetIndex: number
    ) => {
        setColumns((prevColumns) => {
            const sourceColumn = prevColumns[sourceColumnId];
            const targetColumn = prevColumns[targetColumnId];
            const sourceTaskIndex = sourceColumn.taskIds.indexOf(sourceTaskId);

            // Remove task from source column
            sourceColumn.taskIds.splice(sourceTaskIndex, 1);
            // Add task to target column at the specified index
            targetColumn.taskIds.splice(targetIndex, 0, sourceTaskId);

            return {
                ...prevColumns,
                [sourceColumnId]: {
                    ...sourceColumn,
                    taskIds: sourceColumn.taskIds,
                },
                [targetColumnId]: {
                    ...targetColumn,
                    taskIds: targetColumn.taskIds,
                },
            };
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

    const handleAddColumn = () => {
        const newColumnId = `column-${Date.now()}`;
        const newColumn: Column = { id: newColumnId, title: `New Column`, taskIds: [] };

        setColumns((prevColumns) => ({
            ...prevColumns,
            [newColumnId]: newColumn,
        }));
    };

    return (
        <div className="todo-app">
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
                            onTaskDrop={handleTaskDrop}
                        />
                    );
                })}
                <button className="add-column-button" onClick={handleAddColumn}>
                    + もう一つリストを追加
                </button>
            </div>
        </div>
    );
};

export default TodoApp;
