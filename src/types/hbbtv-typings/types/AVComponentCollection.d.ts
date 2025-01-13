declare namespace OIPF {
    export class AVComponentCollection {
      /**
       * The number of items in the collection.
      */
      public readonly length: number;
  
      /**
       * Return the item at position index in the collection.
       *
       * @param index The index of the item to be returned
       *
       * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=211
       */
      item( index: number ): OIPF.AVComponent;
    }
  }