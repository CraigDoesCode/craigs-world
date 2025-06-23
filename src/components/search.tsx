import './search.css';
import SearchItem from './search-item';
import { useState } from 'react';

interface SearchItem {
  trackName: string;
  artistName: string;
}

const response = [
  {trackName: "Jackie Onasis", artistName: "Sammie Rae & Friends"},
  {trackName: "Superstition", artistName: "Stevie Wonder"},
  {trackName: "I'm Yours", artistName: "Jason Mraz"}
]
export default function Search() {
  const [searchResults] = useState<SearchItem[]>(response);


  return (
    <div id="search">
      <input id="search-input" type="text" placeholder="Search" />
      <div id="search-results">
        {searchResults && searchResults.map((result) => (
          <SearchItem trackName={result.trackName} artistName={result.artistName} />
        ))}
      </div>
    </div>
  );
}
