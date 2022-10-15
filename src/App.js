import "./App.css";
import Navbar from "./components1/Navbar";
import Banner from "./components1/Banner";
import MovieList from "./components1/MovieList";
import Favourites from "./components1/Favourites";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components class component implementation
//components1 functional component implementation

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
              <Banner />
              <MovieList />
            </>} />
          <Route path="fav" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
