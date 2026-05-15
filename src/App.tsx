import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About/About';
import Header from './components/Header';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
