import './playlist.css';
import { useState } from 'react';
import PlaylistItems from './playlist-items';

interface PlaylistItem {
  trackName: string;
  artistName: string;
}

export default function Playlist({ playlistItems }: { playlistItems: PlaylistItem[] }) {
  const [playlist] = useState<PlaylistItem[]>(playlistItems);
  return (
    <div id="playlist">
      <h1>Playlist</h1>
      {playlist && playlist.map((item) => (
        <PlaylistItems key={item.trackName} trackName={item.trackName} artistName={item.artistName} />
      ))}
      <button>SAVE</button>
    </div>
  );
}
