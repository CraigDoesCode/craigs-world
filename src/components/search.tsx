import './search.css';
import SearchItem from './search-item';
import { Playlist, SearchItem as SearchItemType } from '../types';
const response = [
  {trackName: "Jackie Onasis", artistName: "Sammie Rae & Friends"},
  {trackName: "Superstition", artistName: "Stevie Wonder"},
  {trackName: "I'm Yours", artistName: "Jason Mraz"}
]
export default function Search({ 
  searchResults, setSearchResults, 
  currentPlaylist, 
  setCurrentPlaylist }: {
     searchResults: SearchItemType[], 
     setSearchResults: (results: SearchItemType[]) => void, 
     currentPlaylist: Playlist, 
     setCurrentPlaylist: (playlist: Playlist) => void }) {

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (query.length > 2) {
    const filteredResults = response.filter(result => 
      result.trackName.toLowerCase().includes(query.toLowerCase()) ||
      result.artistName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }

  return (
    <div id="search">
      <input id="search-input" type="text" placeholder="Search" onChange={handleSearch} />
      <div id="search-results">
        {searchResults && searchResults.map((result) => (
          <SearchItem key={result.trackName} trackName={result.trackName} artistName={result.artistName} currentPlaylist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist} />
        ))}
      </div>
    </div>
  );
}
