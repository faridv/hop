export class SurahList {
    id: number;
    title: string;
    verses: number;
    type: string;
}

export class Ayah {
    number: number;
    text: string;
}

export class QuranEdition {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
}

export class Surah {
    number: number;
    name: string;
    relevationType: string;
    numberOfAyahs: number;
    ayahs: Ayah[];
    edition: QuranEdition;
}