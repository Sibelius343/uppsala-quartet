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

export interface Video {
  videoId: string;
  videoTitle: string;
  videoDescription: string;
}

export interface MediaObject {
  videos: Video[];
  layout: LayoutItem[];
}

interface LayoutMediaItem {
  id: string;
  itemType: "MEDIA_ITEM";
  mediaItemId: string;
}

export type NewLayoutMediaItem = Omit<LayoutMediaItem, "id">;

export interface LayoutHeaderItem {
  id: string;
  itemType: "HEADER";
  headerText: string;
}

export type NewLayoutHeaderItem = Omit<LayoutHeaderItem, "id">;

export type LayoutItem = LayoutMediaItem | LayoutHeaderItem;

export type NewLayoutItem = NewLayoutHeaderItem | NewLayoutMediaItem;

export interface NewMediaLayout {
  layout: NewLayoutItem[];
}

export interface MediaLayout {
  layout: LayoutItem[];
}