import { Application } from './Application';

/**
 * The ApplicationCollection class represents a collection of Application objects. Next to the properties and
 * methods defined below an ApplicationCollection object SHALL support the array notation to access the
 * Application objects in this collection
 *
 * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=59
 */
export class ApplicationCollection {
  /**
   * The number of items in the collection.
   */
  public readonly length: number;

  /**
   * Return the item at position `index` in the collection, or `undefined` if no item is present
   * at that position.
   *
   * @param index The index of the application to be returned.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=59
   */
  item(index: number): Application | undefined;
}
