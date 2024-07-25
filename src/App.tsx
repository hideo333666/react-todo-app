// src/App.tsx
import React from 'react';
import Header from './header';
import TodoApp from './components/Todo/Todo';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <TodoApp />
        </div>
    );
};

export default App;
