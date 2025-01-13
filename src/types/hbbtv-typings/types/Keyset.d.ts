/**
 * The Keyset object permits applications to define which key events they request to receive. There are two means of
 * defining this. Common key events are represented by constants defined in this class which are combined in a bit-wise
 * mask to identify a set of key events. Less common key events are not included in one of the defined constants and form
 * part of an array.
 *
 * The supported key events indicated through the capability mechanism in section 9.3 SHALL be the same as the
 * maximum set of key events available to the browser as indicated through this object
 *
 * The default set of key events available to broadcast-related applications shall be none. The default set of key events
 * available to broadcast-independent or service provider related applications which do not call `Keyset.setValue`
 * SHALL be all those indicated by the constants in this class which are supported by the OITF excluding those indicated
 * by `OTHER`.
 *
 * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
 */
export class Keyset {

  /**
   * Used to identify the `VK_RED` key event.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */
  readonly RED: number;

  /**
   * Used to identify the `VK_GREEN` key event.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */
  readonly GREEN: number;

  /**
   * Used to identify the `VK_YELLOW` key event.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */

  readonly YELLOW: number;
  /**
   * Used to identify the `VK_BLUE` key event.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */
  readonly BLUE: number;

  /**
   * Used to identify the `VK_UP`, `VK_DOWN`, `VK_LEFT`, `VK_RIGHT`, `VK_ENTER` and `VK_BACK` key events.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */
  readonly NAVIGATION: number;

  /**
   * Used to identify the `VK_PLAY`, `VK_PAUSE`, `VK_STOP`, `VK_NEXT`, `VK_PREV`, `VK_FAST_FWD`, `VK_REWIND`, `VK_PLAY_PAUSE` key events.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */
  readonly VCR: number;

  /**
   * Used to identify the `VK_PAGE_UP` and `VK_PAGE_DOWN` key events.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */
  readonly SCROLL: number;

  /**
   * Used to identify the `VK_INFO` key event.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */
  readonly INFO: number;

  /**
   * Used to identify the number events, 0 to 9.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */
  readonly NUMERIC: number;

  /**
   * Used to identify all alphabetic events.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */
  readonly ALPHA: number;

  /**
   * Used to indicate key events not included in one of the other constants in this class.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */
  readonly OTHER: number;

  /**
   * The value of the keyset which this DAE application will receive.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=60
   */
  public readonly value: number;

  /**
   * If the `OTHER` bit in the `value` property is set then this indicates those key events which are available
   * to the browser which are not included in one of the constants defined in this class, If the OTHER bit in
   * the `value` property is not set then this property is meaningless.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=61
   */
  public readonly otherKeys: number[];

  /**
   * In combination with `maximumOtherKeys`, this indicates the maximum set of key events which are
   * available to the browser. When a bit in this `maximumValue` has value 0, the corresponding key events
   * are never available to the browser.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=61
   */
  public readonly maximumValue: number;

  /**
   * If the `OTHER` bit in the `maximumValue` property is set then, in combination with `maximumValue`, this
   * indicates the maximum set of key events which are available to the browser. For key events which are
   * not included in one of the constants defined in this class, if they are not listed in this array then they are
   * never available to the browser. If the `OTHER` bit in the value property is not set then this property is
   * meaningless.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=61
   */
  public readonly maximumOtherKeys: number[];

  /**
   * Sets the value of the keyset which this DAE application requests to receive. Where
   * more than one DAE application is running, the events delivered to the browser
   * SHALL be the union of the events requested by all running DAE applications. Under
   * these circumstances, applications may receive events which they have not
   * requested to receive.
   *
   * The return value indicates which keys will be delivered to this DAE application
   * encoded as bit-wise mask of the constants defined in this class
   *
   * @param value     The value is a number which is a bit-wise mask of the constants
   *                  defined in this class. For example;
   *                  ```
   *                  myKeyset = myApplication.privateData.keyset;
   *                  myKeyset.setValue(0x00000013);
   *                  myKeyset.setValue(myKeyset.INFO | myKeyset.NUMERIC);
   *                  ```
   * @param otherKeys If the `value` parameter has the `OTHER`
   *                  bit set then it is used to indicate the key events that the application
   *                  wishes to receive which are not represented by constants defined in
   *                  this class.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=61
   */
  setValue(value: number, otherKeys?: number[]): number;
}
