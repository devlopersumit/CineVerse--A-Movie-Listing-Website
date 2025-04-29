import './css/App.css'
import NavBar from './Components/NavBar';
import Favorites from './Pages/Favorites';
import Home from './Pages/Home';
import MovieDetails from './Pages/MovieDetails';
import Footer from './Components/Footer';
import {Routes, Route} from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContexts';

function App() {
  return (
    <div className="app">
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
