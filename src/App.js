import React from 'react';

import Header from './components/Header';
import Login from './pages/Login';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <Header />
      <GlobalStyles />
      <Login />
    </>
  );
}

export default App;
