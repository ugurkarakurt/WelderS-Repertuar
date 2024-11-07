export interface Song {
  soloTab: string | undefined;
  id: number;
  artist: string;
  title: string;
  chordsHTML?: JSX.Element;
}
