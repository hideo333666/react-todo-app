// src/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <h1>ToDo App</h1>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
};

export default Header;
