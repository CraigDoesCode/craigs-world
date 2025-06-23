import './search-item.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function SearchItem({ trackName, artistName }: { trackName: string, artistName: string }) {
  return (
    <div id="search-item">
      <div className="track-info">
        <p className="track-name">{trackName}</p>
        <p className="artist-name">{artistName}</p>
      </div>
      <div className="song-actions">
        <FontAwesomeIcon icon={faPlay} className="play-song" />
        <FontAwesomeIcon icon={faPlus} className="add-to-playlist" />
      </div>
    </div>
  );
}
