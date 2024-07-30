import React from 'react';
import Header from './components/Header/header';
import TodoApp from './components/Todo/Todo';

const App: React.FC = () => {
    return (
        <div className="App">
            <header>
                <Header />
            </header>
            <main>
                <TodoApp />
            </main>
        </div>
    );
};

export default App;
