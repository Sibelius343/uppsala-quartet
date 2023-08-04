import { useQuery } from "@tanstack/react-query";
import { YoutubeVideoData, YoutubeVideoItem } from "../interfaces/media";

const useYoutubeVideoData = (embedId: string, lazy: boolean = false) => {
  
  const getYoutubeVideoData = async () => {    
    const response = await fetch(`/api/videoDetails/${embedId}`);    
    return response.json();
  }

  return useQuery(["videoInfo", embedId], getYoutubeVideoData, {
    staleTime: Infinity,
    select: (data: YoutubeVideoData): YoutubeVideoItem => (
      data.videoDetails.items[0]
    ),
    enabled: !lazy
  });
}

export default useYoutubeVideoData;