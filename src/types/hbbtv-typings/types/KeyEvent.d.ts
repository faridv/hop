/**
 * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=256
 */
export interface KeyEvent extends UIEvent {
  readonly shiftKey: boolean;
  readonly keyCode: number;
  readonly charCode: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=257
   *
   * @param typeArg
   * @param canBubbleArg
   * @param cancelableArg
   * @param ctrlKeyArg MAY be ignored
   * @param altKeyArg MAY be ignored
   * @param shiftKeyArg
   * @param metaKeyArg MAY be ignored
   * @param keyCodeArg
   * @param charCodeArg
   */
  initKeyEvent(
    typeArg: 'keydown' | 'keypress' | 'keyup',
    canBubbleArg: boolean,
    cancelableArg: boolean,
    ctrlKeyArg: boolean,
    altKeyArg: boolean,
    shiftKeyArg: boolean,
    metaKeyArg: boolean,
    keyCodeArg: number,
    charCodeArg: number
  ): void;
}

interface KeyEventInit extends EventModifierInit {
  code?: string;
  key?: string;
  location?: number;
  repeat?: boolean;
}

declare var KeyEvent: {
  prototype: KeyEvent;
  new(typeArg: 'keydown' | 'keypress' | 'keyup', eventInitDict?: KeyEventInit): KeyEvent;

  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_0: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_1: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_2: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_3: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_4: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_5: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_6: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_7: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_8: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_9: number;

  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_UP: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_DOWN: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_LEFT: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_RIGHT: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_ENTER: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=234
   */
  readonly VK_BACK: number;

  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_RED: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_GREEN: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_YELLOW: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_BLUE: number;

  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_PLAY: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_PAUSE: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_STOP: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_NEXT: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_PREV: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_PLAY_PAUSE: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_FAST_FWD: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_REWIND: number;

  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_HOME: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_MENU: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_GUIDE: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_TELETEXT: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_SUBTITLES: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_CHANNEL_UP: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_CHANNEL_DOWN: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_VOLUME_UP: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_VOLUME_DOWN: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=235
   */
  readonly VK_MUTE: number;
};
