import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages
import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
