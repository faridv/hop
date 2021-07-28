export interface SurahList {
    id: number;
    title: string;
    verses: number;
    type: string;
}

export interface Ayah {
    number: number;
    text: string;
}

export interface QuranEdition {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
}

export interface Surah {
    number: number;
    name: string;
    relevationType: string;
    numberOfAyahs: number;
    ayahs: Ayah[];
    edition: QuranEdition;
}
