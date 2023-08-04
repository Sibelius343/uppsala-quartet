export interface YoutubeVideoThumbnail {
  height: number;
  width: number;
  url: string;
}

export interface YoutubeVideoItem {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadCastContent: string;
    localized: {
      description: string;
      title: string;
    };
    publishedAt: string;
    thumbnails: {
      default: YoutubeVideoThumbnail;
      high: YoutubeVideoThumbnail;
      medium: YoutubeVideoThumbnail;
      standard: YoutubeVideoThumbnail;
    };
    title: string;
  }
}

export interface YoutubeVideoData {
  videoDetails: {
    etag: string;
    items: YoutubeVideoItem[];
    kind: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
  }
}

export interface Media {
  videoIds: string[];
}

export interface MediaObject {
  videoIds: string[];
}