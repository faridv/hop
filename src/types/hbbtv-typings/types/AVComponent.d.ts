    export class AVComponent {
      /**
       * The component tag identifies a component. The component tag identifier corresponds to the
       * component_tag in the component descriptor in the ES loop of the stream in the PMT [EN300468], or
       * undefined if the component is not carried in an MPEG-2 TS.
       *
       * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=210
       */
      public readonly componentTag: number;

      /**
       * The MPEG Program ID (PID) of the component in the MPEG2-TS in which it is carried, or undefined if
       * the component is not carried in an MPEG-2 TS.
       *
       * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=210
       */
      public readonly pid: number;

      /**
       * Type of the component stream. Valid values for this field are given by the constants listed in section
       * 7.16.5.1.1.
       *
       * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=210
       */
      public readonly type: number;

      /**
       * The encoding of the stream. The value of video format or audio format defined in section 3 of [MEDIA]
       * SHALL be used.
       *
       * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=210
       */
      public readonly encoding: string;

      /**
       * Flag indicating whether the component is encrypted or not.
       *
       * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=210
       */
      public readonly encrypted: boolean;
    }
