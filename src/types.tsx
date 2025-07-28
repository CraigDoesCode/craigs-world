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

export interface refreshResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
