declare namespace OIPF {
    export class AVVideoComponent extends AVComponent {
      /**
       * Indicates the aspect ratio of the video or undefined if the aspect ratio is not known. Values SHALL be
       * equal to width divided by height, rounded to a float value with two decimals, e.g. 1.78 to indicate 16:9
       * and 1.33 to indicate 4:3.
       *
       * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=210
       */
      public readonly aspectRatio: number;
    }
  }