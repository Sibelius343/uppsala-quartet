export interface Performer {
  id: string;
  name: string;
  instrument: string;
  bio: string;
  picUri: string;
}

export interface PerformerObject {
  performers: Performer[];
}