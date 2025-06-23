import './search-item.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Playlist } from '../types';

export default function SearchItem({ 
  trackName, 
  artistName, 
  currentPlaylist, 
  setCurrentPlaylist }: { 
    trackName: string, 
    artistName: string, 
    currentPlaylist: Playlist, 
    setCurrentPlaylist: (playlist: Playlist) => void }) {

  const handleAddToPlaylist = () => {
    setCurrentPlaylist({ ...currentPlaylist, items: [...currentPlaylist.items, { trackName, artistName }] });
  }

  return (
    <div id="search-item">
      <div className="track-info">
        <p className="track-name">{trackName}</p>
        <p className="artist-name">{artistName}</p>
      </div>
      <div className="song-actions">
        <FontAwesomeIcon icon={faPlay} className="play-song" />
        <FontAwesomeIcon icon={faPlus} className="add-to-playlist" onClick={handleAddToPlaylist} />
      </div>
    </div>
  );
}
