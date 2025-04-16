import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';



function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*  /menu, /order, /login */}
      </Routes>
      <Footer />
    </>

  )
}

export default App
