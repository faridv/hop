export {};

declare global {
    interface String {
        toPersianDigits(): string;
        toEnglishDigits(): string;
    }
}


String.prototype.toPersianDigits = function () {
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return this.replace(/[0-9]/g, function (w) {
        return id[+w];
    });
};

String.prototype.toEnglishDigits = function () {
    const id = {'۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'};
    return this.replace(/[^0-9.]/g, function (w) {
        return id[w] || w;
    });
};
