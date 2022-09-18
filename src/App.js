import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import MovieList from './components/MovieList';


function App() {
  return (
    <>
    <Navbar/>
    <Banner/>
    <MovieList />
    </>
  );
}

export default App;
