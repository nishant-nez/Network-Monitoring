import { BrowserRouter, Routes, Route } from 'react-router-dom';

//contexts
import DeviceContextProvider from './contexts/DeviceContext';
//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Switch from './pages/Switch';
import AP from './pages/AP';
import Other from './pages/Other';
import Domain from './pages/Domain';
import NotFound from './pages/NotFound';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DeviceContextProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={ <Home /> }
            />
            <Route
              exact
              path="/login"
              element={ <Login /> }
            />
            <Route
              exact
              path="/switch"
              element={ <Switch /> }
            />
            <Route
              exact
              path="/ap"
              element={ <AP /> }
            />
            <Route
              exact
              path="/other"
              element={ <Other /> }
            />
            <Route
              exact
              path="/domain"
              element={ <Domain /> }
            />
            <Route
              path="*"
              element={ <NotFound /> }
            />
          </Routes>
        </DeviceContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
