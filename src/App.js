import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frame from './pages/Frame/Frame';
import Home from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/frame" element={<Frame />} />
          <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
