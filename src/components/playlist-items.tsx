import './playlist-items.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Playlist } from '../types';

export default function PlaylistItems({ trackName, artistName, playlist, setPlaylist }: { trackName: string, artistName: string, playlist: Playlist, setPlaylist: (playlist: Playlist) => void }) {
  
  const handleDelete = () => {
    setPlaylist({ ...playlist, items: playlist.items.filter((item) => item.trackName !== trackName) });
  }

  return (
    <div id="search-item">
      <div className="track-info">
        <p className="track-name">{trackName}</p>
        <p className="artist-name">{artistName}</p>
      </div>
      <FontAwesomeIcon icon={faTrash} className="delete-item" onClick={handleDelete} />
    </div>
  );
}
