export default class TranslationHelper {

    private readonly dictionary: { [key: string]: string };

    constructor(translations) {
        this.dictionary = translations;
    }

    public get(key: string): string {
        return this.dictionary[key] !== 'undefined' && this.dictionary[key] ? this.dictionary[key] : key;
    }

}
