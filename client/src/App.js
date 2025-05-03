import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import MultiPageQuillEditor from './components/MultiPageQuillEditor';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar/>}>
            <Route index element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/document" element={<MultiPageQuillEditor/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
