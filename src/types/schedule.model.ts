export interface ISchedule {
  d: number;
  description: string;
  duration: number;
  episodeTitle: string;
  mediaId: string;
  poster: string;
  start: string;
  thumbnail: string;
  programTitle?: string;
  isCurrent?: boolean;
}
