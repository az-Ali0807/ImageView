import "./App.css";

import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import CreateImage from "./pages/create";
import EditImage from "./pages/edit";
import ImageList from "./pages/ImageList";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ImageList />} />
          <Route path="/image/create" element={<CreateImage />} />
          <Route path="/image/edit" element={<EditImage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
