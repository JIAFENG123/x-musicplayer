export interface SongItem {
  id: string
  preview: string
  title: string
  album: {
    cover_medium: string
  }
  time?: string
  songInfo?: {
    lyric: string
  }
}
