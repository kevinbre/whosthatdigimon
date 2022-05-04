import { Home } from "./pages/Home"
import { useEffect } from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  useEffect(() => {
    <Home />
  },[])
  return (
    <div className="App d-flex justify-content-center align-items-center">
      <Home />
    </div>
  );
}

export default App;
