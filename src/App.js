import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import MovieList from "./components/MovieList";
import Favourites from "./components/Favourites";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Navbar/> */}
    {/* <Banner/> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={ 
        <>
        <Banner/>
        <MovieList /> 
        </>} />
        <Route path="fav" element={ <Favourites /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
