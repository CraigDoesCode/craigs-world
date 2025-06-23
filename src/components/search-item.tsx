import './search-item.css';

export default function SearchItem({ trackName, artistName }: { trackName: string, artistName: string }) {
  return (
    <div id="search-item">
      <div className="track-info">
        <p className="track-name">{trackName}</p>
        <p className="artist-name">{artistName}</p>
      </div>
    </div>
  );
}
