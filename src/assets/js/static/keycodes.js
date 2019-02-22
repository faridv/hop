//
// if (typeof(KeyEvent) !== 'undefined') {
//     if (typeof(KeyEvent.VK_LEFT) !== 'undefined') {
//         var VK_LEFT = KeyEvent.VK_LEFT;
//         var VK_UP = KeyEvent.VK_UP;
//         var VK_RIGHT = KeyEvent.VK_RIGHT;
//         var VK_DOWN = KeyEvent.VK_DOWN;
//     }
//     if (typeof(KeyEvent.VK_ENTER) !== 'undefined') {
//         var VK_ENTER = KeyEvent.VK_ENTER;
//     }
//     if (typeof(KeyEvent.VK_RED) !== 'undefined') {
//         var VK_RED = KeyEvent.VK_RED;
//         var VK_GREEN = KeyEvent.VK_GREEN;
//         var VK_YELLOW = KeyEvent.VK_YELLOW;
//         var VK_BLUE = KeyEvent.VK_BLUE;
//     }
//     if (typeof(KeyEvent.VK_PLAY) !== 'undefined') {
//         var VK_PLAY = KeyEvent.VK_PLAY;
//         var VK_PAUSE = KeyEvent.VK_PAUSE;
//         var VK_STOP = KeyEvent.VK_STOP;
//     }
//     if (typeof(KeyEvent.VK_FAST_FWD) !== 'undefined') {
//         var VK_FAST_FWD = KeyEvent.VK_FAST_FWD;
//         var VK_REWIND = KeyEvent.VK_REWIND;
//     }
//     if (typeof(KeyEvent.VK_BACK) !== 'undefined') {
//         var VK_BACK = KeyEvent.VK_BACK;
//     }
//     if (typeof(KeyEvent.VK_0) !== 'undefined') {
//         var VK_0 = KeyEvent.VK_0;
//         var VK_1 = KeyEvent.VK_1;
//         var VK_2 = KeyEvent.VK_2;
//         var VK_3 = KeyEvent.VK_3;
//         var VK_4 = KeyEvent.VK_4;
//         var VK_5 = KeyEvent.VK_5;
//         var VK_6 = KeyEvent.VK_6;
//         var VK_7 = KeyEvent.VK_7;
//         var VK_8 = KeyEvent.VK_8;
//         var VK_9 = KeyEvent.VK_9;
//     }
// }
//
// if (typeof(VK_LEFT) === 'undefined') {
//     var VK_LEFT = 0x25;
//     var VK_UP = 0x26;
//     var VK_RIGHT = 0x27;
//     var VK_DOWN = 0x28;
// }
// if (typeof(VK_ENTER) === 'undefined') {
//     var VK_ENTER = 0x0d;
// }
// if (typeof(VK_RED) === 'undefined') {
//     var VK_RED = 0x74;
//     var VK_GREEN = 0x75;
//     var VK_YELLOW = 0x76;
//     var VK_BLUE = 0x77;
// }
// if (typeof(VK_PLAY) === 'undefined') {
//     var VK_PLAY = 0x50;
//     var VK_PAUSE = 0x51;
//     var VK_STOP = 0x53;
// }
// if (typeof(VK_FAST_FWD) === 'undefined') {
//     var VK_FAST_FWD = 0x46;
//     var VK_REWIND = 0x52;
// }
// if (typeof(VK_BACK) === 'undefined') {
//     var VK_BACK = 0xa6;
// }
// if (typeof(VK_0) === 'undefined') {
//     var VK_0 = 0x30;
//     var VK_1 = 0x31;
//     var VK_2 = 0x32;
//     var VK_3 = 0x33;
//     var VK_4 = 0x34;
//     var VK_5 = 0x35;
//     var VK_6 = 0x36;
//     var VK_7 = 0x37;
//     var VK_8 = 0x38;
//     var VK_9 = 0x39;
// }
//

var KeyEvent = typeof window['KeyEvent'] !== 'undefined' ? window['KeyEvent'] : {};

KeyEvent.VK_ENTER = KeyEvent.VK_ENTER || 13;
KeyEvent.VK_BACK = KeyEvent.VK_BACK || 461;

KeyEvent.VK_LEFT = KeyEvent.VK_LEFT || 37;
KeyEvent.VK_UP = KeyEvent.VK_UP || 38;
KeyEvent.VK_RIGHT = KeyEvent.VK_RIGHT || 39;
KeyEvent.VK_DOWN = KeyEvent.VK_DOWN || 40;

KeyEvent.VK_RED = KeyEvent.VK_RED || 403;
KeyEvent.VK_GREEN = KeyEvent.VK_GREEN || 404;
KeyEvent.VK_YELLOW = KeyEvent.VK_YELLOW || 405;
KeyEvent.VK_BLUE = KeyEvent.VK_BLUE || 406;

KeyEvent.VK_0 = KeyEvent.VK_0 || 48;
KeyEvent.VK_1 = KeyEvent.VK_1 || 49;
KeyEvent.VK_2 = KeyEvent.VK_2 || 50;
KeyEvent.VK_3 = KeyEvent.VK_3 || 51;
KeyEvent.VK_4 = KeyEvent.VK_4 || 52;
KeyEvent.VK_5 = KeyEvent.VK_5 || 53;
KeyEvent.VK_6 = KeyEvent.VK_6 || 54;
KeyEvent.VK_7 = KeyEvent.VK_7 || 55;
KeyEvent.VK_8 = KeyEvent.VK_8 || 56;
KeyEvent.VK_9 = KeyEvent.VK_9 || 57;

KeyEvent.VK_PLAY = KeyEvent.VK_PLAY || 415;
KeyEvent.VK_PAUSE = KeyEvent.VK_PAUSE || 19;
KeyEvent.VK_STOP = KeyEvent.VK_STOP || 413;

KeyEvent.VK_TOBEGIN = KeyEvent.VK_TOBEGIN || 423;
KeyEvent.VK_TOEND = KeyEvent.VK_TOEND || 425;
KeyEvent.VK_FAST_FWD = KeyEvent.VK_FAST_FWD || 417;
KeyEvent.VK_REWIND = KeyEvent.VK_REWIND || 412;
var _HbbTVEvents = {
    red: KeyEvent.VK_RED || 116,
    green: KeyEvent.VK_GREEN || 117,
    yellow: KeyEvent.VK_YELLOW || 118,
    blue: KeyEvent.VK_BLUE || 119,

    left: KeyEvent.VK_LEFT || 37,
    up: KeyEvent.VK_UP || 38,
    right: KeyEvent.VK_RIGHT || 39,
    down: KeyEvent.VK_DOWN || 40,
    enter: KeyEvent.VK_ENTER || 13,
    return: KeyEvent.VK_ENTER || 13,
    back: KeyEvent.VK_BACK || 461,

    play: KeyEvent.VK_PLAY || 415,
    pause: KeyEvent.VK_PAUSE || 19,
    stop: KeyEvent.VK_STOP || 413,
    fast_fwd: KeyEvent.VK_FAST_FWD || 417,
    rewind: KeyEvent.VK_REWIND || 412
};

// console.log(_HbbTVEvents);