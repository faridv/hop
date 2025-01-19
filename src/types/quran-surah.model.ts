export interface Surah {
  id: number;
  title: string;
  type: string;
  verses: number;
}


export interface Ayah {
  number: number;
  text: string;
}

export interface SurahDetail {
  number: number;
  name: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}
