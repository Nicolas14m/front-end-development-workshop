import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login';
import Registro from './components/Registro';
import NoEncontrado from './components/NoEncontrado';

import { store } from './store/store';
import { Provider } from 'react-redux';

//* React router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
