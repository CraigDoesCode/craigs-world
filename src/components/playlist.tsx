import './playlist.css';
import { useState } from 'react';
import PlaylistItems from './playlist-items';
import { Playlist } from '../types';

export default function PlaylistEditor({ playlist, setCurrentPlaylist }: { playlist: Playlist, setCurrentPlaylist: (playlist: Playlist) => void }) {
  return (
    <div id="playlist">
      <h1>Playlist</h1>
      {playlist?.items && playlist.items.map((item) => (
        <PlaylistItems key={item.trackName} trackName={item.trackName} artistName={item.artistName} />
      ))}
      <button>SAVE</button>
    </div>
  );
}
