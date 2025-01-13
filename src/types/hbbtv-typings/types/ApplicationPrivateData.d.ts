import { Keyset } from './Keyset';

/**
 * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=59
 */
export class ApplicationPrivateData {
  /**
   * The object representing the user input events sent to the DAE application.
   */
  public readonly keyset: Keyset;

  /**
   * Let application developer query information about the current memory available to the
   * application. This is used to help during application development to find application
   * memory leaks and possibly allow an application to make decisions related to its
   * caching strategy (e.g. for images).
   *
   * Returns the available memory to the application or -1 if the information is not available.
   * For example:
   * ```
   * debug("[APP] free mem = " +
   * appman.getOwnerApplication(window.document).privateData.getFreeMem() + "\n");
   * ```
   */
  getFreeMem(): number;
}
