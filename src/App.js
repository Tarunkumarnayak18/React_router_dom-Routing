import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import GitHubFinder from "./component/GitHubFinder";
import MovieFinder from "./component/MovieFinder";
import WeatherFinder from "./component/WeatherFinder";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="githubfinder" element={<GitHubFinder />} />
          <Route path="moviefinder" element={<MovieFinder />} />
          <Route path="weatherfinder" element={<WeatherFinder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
