export interface Playlist {
    name: string;
    description: string;
    items: PlaylistItem[];
}

export interface PlaylistItem {
    trackName: string;
    artistName: string;
}
export interface SearchItem {
    trackName: string;
    artistName: string;
}