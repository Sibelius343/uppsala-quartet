import { useQuery } from "@tanstack/react-query";
import { YoutubeVideoData, YoutubeVideoItem } from "../interfaces/media";

const useYoutubeVideoData = (embedId: string, lazy: boolean = false) => {
  
  const getYoutubeVideoData = async () => {    
    const response = await fetch(`/api/videoDetails/${embedId}`);    
    const data: YoutubeVideoData = await response.json();
    if (data.videoDetails.items.length === 0) {
      throw new Error('Video not found');
    } else {
      return data;
    }
  }

  return useQuery(["videoInfo", embedId], getYoutubeVideoData, {
    staleTime: Infinity,
    select: (data: YoutubeVideoData): YoutubeVideoItem => (
      data.videoDetails.items[0]
    ),
    enabled: !lazy,
    retry: 1
  });
}

export default useYoutubeVideoData;