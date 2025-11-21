import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import ImageList from './pages/ImageList';
import CreateImage from './pages/create';
import EditImage from './pages/edit';
import './App.css'

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<ImageList />} />
          <Route path="/image/create" element={<CreateImage />} />
          <Route path="/image/edit" element={<EditImage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
