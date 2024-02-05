import { playlistState } from "@/atom/playlistAtom";
import { useRecoilValue } from "recoil";
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="flex flex-col space-y-1 pb-28 px-8 text-white">
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
}

export default Songs;
