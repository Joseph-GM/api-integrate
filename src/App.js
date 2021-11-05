import React from 'react';
import Users from './Users';
import UsersContextProvider from './UsersContext';

function App() {
  return (
    <UsersContextProvider>
      <Users />
    </UsersContextProvider>
  );
}

export default App;
