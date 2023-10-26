import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
// context
import AuthContextProvider from "./contexts/AuthContext";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={ <Home /> }
            />
            <Route
              path="/login"
              element={ <Login /> }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
