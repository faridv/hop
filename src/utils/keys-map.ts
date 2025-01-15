interface KeyMap {
  [key: string]: number;
}

const KeyEvent: any = (window as any)['KeyEvent'] !== undefined ? (window as any)['KeyEvent'] : {};

const isFirefox = typeof navigator !== 'undefined'
  ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0
  : false;

export const specialKeyMap: KeyMap = { // Special key
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  '⇪': 20,
  ',': 188,
  '.': 190,
  '/': 191,
  '`': 192,
  '-': isFirefox ? 173 : 189,
  '=': isFirefox ? 61 : 187,
  ';': isFirefox ? 59 : 186,
  '\'': 222,
  '[': 219,
  ']': 221,
  '\\': 220
};

export const HbbtvKeyEvents: KeyMap = {
  red: KeyEvent.VK_RED || 403, // 116
  green: KeyEvent.VK_GREEN || 404, // 117
  yellow: KeyEvent.VK_YELLOW || 405, // 118
  blue: KeyEvent.VK_BLUE || 406, // 119

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
