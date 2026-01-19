import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section.jsx";
import {
  fetchTopAlbums,
  fetchNewAlbums,
  fetchSongs,
  fetchGenres,
} from "./api/api";

function App() {
  const [topAlbumsData, setTopAlbumsData] = useState([]);
  const [newAlbumsData, setNewAlbumsData] = useState([]);
  const [songsData, setSongsData] = useState([]);
  const [genresData, setGenresData] = useState([]);

  const generateData = async () => {
    try {
      const data = await fetchTopAlbums();
      setTopAlbumsData(data);
      const newData = await fetchNewAlbums();
      setNewAlbumsData(newData);
      const songs = await fetchSongs();
      setSongsData(songs);
      const genres = await fetchGenres();
      setGenresData(genres);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    generateData();
  }, []);

  return (
    <div className="App">
      <Navbar searchData={[]} onFeedbackClick={() => {}} />
      <Hero />
      <div className="sectionWrapper">
        <Section title="Top Albums" data={topAlbumsData} type="album" />
        <Section title="New Albums" data={newAlbumsData} type="album" />
        <Section
          title="Songs"
          data={songsData}
          type="song"
          filterSource={genresData}
        />
      </div>
    </div>
  );
}

export default App;
