import { currentTrackIdState, isPlayingState } from "@/atom/songAtom";
import useSpotify from "@/hooks/useSpotify";
import { millisToMinitesAndSeconds } from "@/lib/time";
import { useRecoilState } from "recoil";

function Song({ order, track }) {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>

        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />

        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>

          {track.track.artists?.map((artist, index, array) => (
            <span key={index}>
              <p className="w-40" style={{ display: "inline" }}>
                {artist.name}
              </p>
              {index < array.length - 1 && <span>, </span>}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 lg:w-96 hidden md:inline">
          {track.track.album.name}
        </p>
        <p>{millisToMinitesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
