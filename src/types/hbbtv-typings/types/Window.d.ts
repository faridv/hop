/**
 * A strict subset of the DOM Window object representing the application.
 *
 * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=57
 */
export interface Window {
  /**
   * Cross-document messaging, as defined in section 8.2 of [HTML5], a subset. The client SHALL
   * support posting messages with the postMessage method as defined in chapter 8.2.3 of [HTML5],
   * prototype also listed below for reference.The MessageEvent interface defined in 8.1 of
   * [HTML5] SHALL be supported, except for the ports value which MAY be undefined if the
   * client does not support passing messages with ports.
   *
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=256
   */
  postMessage(message: any, targetOrigin: string): void;
}

