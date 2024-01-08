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
import DeviceDetails from './pages/DeviceDetails';
import Profile from './pages/Profile'
import EmailContextProvider from './contexts/EmailContext';
import NetworkMap from './pages/NetworkMap';
// import NetworkMap from './pages/MapNew';
// import DeviceDetails from './pages/TestPage';
// 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DeviceContextProvider>
          <EmailContextProvider>
            <Routes>
              <Route
                exact
                path="/map"
                element={ <NetworkMap /> }
              />
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
                path="/device/:id"
                element={ <DeviceDetails /> }
              />
              <Route
                exact
                path="/domain"
                element={ <Domain /> }
              />
              <Route
                exact
                path="/profile"
                element={ <Profile /> }
              />
              <Route
                path="*"
                element={ <NotFound /> }
              />
            </Routes>
          </EmailContextProvider>
        </DeviceContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
