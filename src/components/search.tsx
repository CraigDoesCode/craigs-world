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
export default function Search({ searchResults, setSearchResults }: { searchResults: SearchItem[], setSearchResults: (results: SearchItem[]) => void  }) {

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const filteredResults = response.filter(result => 
      result.trackName.toLowerCase().includes(query.toLowerCase()) ||
      result.artistName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  }

  return (
    <div id="search">
      <input id="search-input" type="text" placeholder="Search" onChange={handleSearch} />
      <div id="search-results">
        {searchResults && searchResults.map((result) => (
          <SearchItem key={result.trackName} trackName={result.trackName} artistName={result.artistName} />
        ))}
      </div>
    </div>
  );
}
