import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Music, Heart } from "lucide-react";

export const MusicPlayerContent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);

  const playlist = [
    { id: 0, title: "Windows XP Startup", artist: "Microsoft", duration: "0:04", album: "Windows Sounds" },
    { id: 1, title: "Notify", artist: "Microsoft", duration: "0:02", album: "Windows Sounds" },
    { id: 2, title: "Error", artist: "Microsoft", duration: "0:01", album: "Windows Sounds" },
    { id: 3, title: "Exclamation", artist: "Microsoft", duration: "0:01", album: "Windows Sounds" },
    { id: 4, title: "Windows Logoff", artist: "Microsoft", duration: "0:03", album: "Windows Sounds" },
  ];

  const toggleLike = (id: number) => {
    setLiked(liked.includes(id) ? liked.filter(l => l !== id) : [...liked, id]);
  };

  return (
    <div className="bg-gradient-to-br from-[#2d1b4e] to-[#1a1a2e] min-h-[400px] text-white flex">
      {/* Sidebar */}
      <div className="w-48 bg-black/30 p-4">
        <h3 className="text-sm font-bold mb-4 text-gray-400">Library</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2 p-2 bg-white/10 rounded cursor-pointer">
            <Music className="w-4 h-4" /> All Songs
          </li>
          <li className="flex items-center gap-2 p-2 hover:bg-white/10 rounded cursor-pointer">
            <Heart className="w-4 h-4" /> Liked
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Playlist */}
        <div className="flex-1 p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-4">Windows Sounds Collection</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-white/10">
                <th className="text-left py-2 w-8">#</th>
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Album</th>
                <th className="text-right py-2">Duration</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>
              {playlist.map((track, index) => (
                <tr
                  key={track.id}
                  className={`hover:bg-white/10 cursor-pointer ${currentTrack === index ? "bg-white/20" : ""}`}
                  onClick={() => setCurrentTrack(index)}
                >
                  <td className="py-2 text-gray-400">{index + 1}</td>
                  <td className="py-2">
                    <div>
                      <p className={currentTrack === index ? "text-green-400" : ""}>{track.title}</p>
                      <p className="text-gray-400 text-xs">{track.artist}</p>
                    </div>
                  </td>
                  <td className="py-2 text-gray-400">{track.album}</td>
                  <td className="py-2 text-right text-gray-400">{track.duration}</td>
                  <td className="py-2">
                    <button onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}>
                      <Heart className={`w-4 h-4 ${liked.includes(track.id) ? "fill-pink-500 text-pink-500" : "text-gray-400"}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Player Bar */}
        <div className="bg-black/50 p-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="font-medium">{playlist[currentTrack].title}</p>
            <p className="text-xs text-gray-400">{playlist[currentTrack].artist}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-1 hover:text-green-400">
              <Shuffle className="w-4 h-4" />
            </button>
            <button className="p-1 hover:text-white">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-white text-black rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button className="p-1 hover:text-white">
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="p-1 hover:text-green-400">
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex justify-end">
            <div className="w-32 h-1 bg-gray-600 rounded">
              <div className="w-1/3 h-full bg-green-400 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
