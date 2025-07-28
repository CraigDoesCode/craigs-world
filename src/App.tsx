import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import PlaylistEditor from './components/playlist'
import Search from './components/search'
import UserInfo from './components/user-info'
import { Playlist, SearchItem, refreshResponse } from './types'




function App() {
  const [insult, setInsult] = useState("")
  const [isPreview, setIsPreview] = useState(true)
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>({name: "New Playlist", description: "New Playlist", items: []})
  const [profile, setProfile] = useState<any>(null)
  const [accessToken, setAccessToken] = useState<string>(() =>{
    const aToken = localStorage.getItem('access_token')
    return aToken || ""
  })
  const [retryCount, setRetryCount] = useState<number>(0)
  const [clientId, setClientId] = useState<string>(() =>import.meta.env.VITE_SPOTIFY_CLIENT_ID || "");
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code") || "";

  const generateInsult = async () => {
    const newInsult = "Don't be silly you're great! no instults here, check back in a couple of weeks to see the progress \n silly goose 🪿"

    setInsult(newInsult)
  }

   useEffect(() => {
     const params = new URLSearchParams(window.location.search);
     if (params.get("preview") === "true") {
       setIsPreview(true);
     }
   }, []);

    async function redirectToAuthCodeFlow(clientId: string) {
      const verifier = generateCodeVerifier(128);
      console.log("verifier", verifier);
      const challenge = await generateCodeChallenge(verifier);
      console.log("challenge", challenge);
      localStorage.setItem("verifier", verifier);

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("response_type", "code");
      params.append("redirect_uri", "http://[::1]:3000/");
      params.append("scope", "user-read-private user-read-email");
      params.append("code_challenge_method", "S256");
      params.append("code_challenge", challenge);

      document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    function generateCodeVerifier(length: number) {
      let text = "";
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    async function generateCodeChallenge(codeVerifier: string) {
      const data = new TextEncoder().encode(codeVerifier);
      console.log("data", data);
      const digest = await window.crypto.subtle.digest("SHA-256", data);
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    async function getAccessToken(clientId: string, code: string) {
      const verifier = localStorage.getItem("verifier");
      console.log("verifier", verifier);

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", "http://[::1]:3000/");
      params.append("code_verifier", verifier!);

      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      const resultJson = await result.json()
      console.log("access result: ", resultJson)

      const { access_token, refresh_token } = resultJson;
      // console.log("access_token", access_token);

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token)
    }

    async function getRefreshToken () {
      const url = "https://accounts.spotify.com/api/token";
      console.log('fooooooook')
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: localStorage.getItem('refresh_token') || "",
          client_id: clientId
        }),
      }

      const body = await fetch(url, payload);
      const response: refreshResponse = await body.json()
      localStorage.setItem('access_token', response.access_token);
      if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token)
      }
    }

    async function fetchProfile(token: string) {
      if (retryCount >=2) {
        console.log("retry limit")
      }
      console.log("fetching profile");

      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response status:", result.status);
      // if (result.status === 401) {
      //   console.log("refreshing token");
      //   await getRefreshToken();
      //   setRetryCount(() => retryCount + 1);
      //   await fetchProfile(accessToken)
      // }
      const profileData = await result.json();
      console.log("Profile data:", profileData);
      if (!profileData.error) {
        setProfile(profileData);
      }
      setRetryCount(0);
    }

    async function checkCode(code: string, clientId: string) {
      if (!code) {
        console.log("no code");
        redirectToAuthCodeFlow(clientId);
      } else {
        console.log("code found");
        try {
          console.log(accessToken === "undefined" )
          if (accessToken === "undefined") {
            console.log('no access token')
            await getAccessToken(clientId, code);
            setAccessToken(() =>localStorage.getItem('access_token') || "")
          }

          if (accessToken) {
            await fetchProfile(accessToken);
          } else {
            console.log("no access token");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    }

    useEffect(() => {
      checkCode(code, clientId);
    }, []);




  return (
    <>
      <Header />
      <UserInfo userName={profile?.id} imgUrl={profile?.images[0]?.url}/>
      <div className="main">
        {isPreview && (
          <>
            <Search
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              currentPlaylist={currentPlaylist}
              setCurrentPlaylist={setCurrentPlaylist}
            />
            <PlaylistEditor
              playlist={currentPlaylist}
              setCurrentPlaylist={setCurrentPlaylist}
            />
          </>
        )}
      </div>
      {!isPreview && (
        <div className="card">
          <p>
            My site (soon to be spotify project) is not ready yet, <br />
            so in the mean time you can click this button to generate an insult.
          </p>
          <button onClick={() => generateInsult()}>Insult Yourself</button>
        </div>
      )}
      <p className="read-the-docs">{insult}</p>
    </>
  );
}

export default App
