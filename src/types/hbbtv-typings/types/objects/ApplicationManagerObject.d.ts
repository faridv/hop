
    /**
     * 7.2.1 The application/oipfApplicationManager embedded object
    An OITF SHALL support a non-visual embedded object of type “application/oipfApplicationManager”, with
    the following JavaScript API, to enable applications to access the privileged functionality related to application lifecycle
    and management that is provided by the application model defined in this section.
    If one of the methods on the application/oipfApplicationManager is called by a webpage that is not a
    privileged DAE application, the OITF SHALL throw an error as defined in section 10.1.1.
    */
    export interface ApplicationManagerObject extends HTMLObjectElement {
        type: 'application/oipfApplicationManager';

        /**
         * The function that is called when the OITF is running low on available memory for running DAE
         * applications. The exact criteria when to generate such an event is implementation specific.
         */
        onLowMemory(): void;

        /**
         * The function that is called immediately prior to a `load` event being generated in the affected
         * application. The specified function is called with one argument `appl`, which provides a reference to the
         * affected application.
         */
        onApplicationLoaded(appl: OIPF.Application): void;

        /**
         * The function that is called immediately prior to an `unload` event being generated in the affected
         * application. The specified function is called with one argument `appl`, which provides a reference to the
         * affected application.
         */
        onApplicationUnloaded(appl: OIPF.Application): void;

        /**
         * Returns the current mode used by the OITF to visualize applications, whereby a return
         * value:
         * - `1` corresponds to the application visualization mode as defined by bullet 1) of
         *   section 4.4.6, i.e. multiple applications visible simultaneously with DAE
         *   applications managing their own size, position and visibility
         * - `2` corresponds to the application visualization mode as defined by bullet 2) of
         *   section 4.4.6, i.e. multiple applications visible simultaneously with OITF
         *   managing the size, position, visibility of applications
         * - `3` corresponds to the application visualization mode as defined by bullet 3) of
         *   section 4.4.6, i.e. only a single application visible at any time.
         */
        getApplicationVisualizationMode(): 1 | 2 | 3;

        /**
         * Get the application that the specified document is part of. If the document is not part of
         * an application, or the calling application does not have permission to access that
         * application, this method will return null.
         *
         * @param document The document for which the Application object should be obtained.
         */
        getOwnerApplication( document: Document ): OIPF.Application | null;

        /**
         * Get the applications that are children of the specified application.
         *
         * @param application The application whose children should be returned.
         */
        getChildApplications( application: OIPF.Application ): OIPF.ApplicationCollection;

        /**
         * Provide a hint to the execution environment that a garbage collection cycle should be
         * initiated. The OITF is not required to act upon this hint.
         */
        gc(): void;

        /**
         * The function that is called when the OITF fails to load the file containing the initial HTML document of
         * an application (e.g. due to an HTTP 404 error, an HTTP timeout, being unable to load the file from a
         * DSM-CC object carousel or due to the file not being either an HTML file). All properties of the
         * `Application` object referred to by appl SHALL have the value `undefined` and calling any methods
         * on that object SHALL fail.
         */
        onApplicationLoadError( appl: OIPF.Application ): void;

        onLowMemory(): void;
        onApplicationLoaded(): void;
        onApplicationUnloaded(): void;
        onLowMemonApplicationLoadErrorory(): void;
    }
