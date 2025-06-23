import './playlist-items.css';

export default function PlaylistItems({ trackName, artistName }: { trackName: string, artistName: string }) {
  return (
    <div id="search-item">
      <div className="track-info">
        <p className="track-name">{trackName}</p>
        <p className="artist-name">{artistName}</p>
      </div>
    </div>
  );
}
