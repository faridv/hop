/**
 * The Application class is used to implement the characteristics of a DAE application.
 * If the document of an application is modified (or even replaced entirely), the Application object SHALL be retained.
 * This means that the permission set granted when the application is created applies to all “edits” of the document or other
 * pages in the application, until the application is destroyed.
 *
 * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=56
 */
export class Application {
  /**
   * `true` if the application is visible, `false` otherwise. The value of this property is not affected by the
   * application's Z-index or position relative to other applications. Only calls to the `show()` and `hide()`
   * methods will affect its value.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=56
   */
  public readonly visible: boolean;

  /**
   * true if the application is in the list of currently active applications, false otherwise (as defined in
   * section 4.3.8).
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=56
   */
  public readonly active: boolean;

  /**
   * `StringCollection` object containing the names of the permissions granted to this application.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=57
   */
  public readonly permissions: OIPF.StringCollection;

  /**
   * `true` if the application receives cross application events before any other application, `false` otherwise.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=57
   */
  public readonly isPrimaryReceiver: boolean;

  /**
   * A strict subset of the DOM Window object representing the application.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=57
   */
  public readonly window: OIPF.Window;

  /**
   * Access the current application’s private data object.
   *
   * If the application accessing the `private` property is not the current application, the OITF SHALL throw
   * an error with the message property set to the value `"SecurityError"`.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=57
   */
  public readonly privateData: OIPF.ApplicationPrivateData;

  onApplicationActivated(): void;

  onApplicationDeactivated(): void;

  onApplicationShown(): void;

  onApplicationHidden(): void;

  onApplicationPrimaryReceiver(): void;

  onApplicationNotPrimaryReceiver(): void;

  onApplicationTopmost(): void;

  onApplicationNotTopmost(): void;

  onApplicationDestroyRequest(): void;

  onKeyPress(): void;

  onKeyUp(): void;

  onKeyDown(): void;

  /**
   * If the application visualization mode as defined by method
   * `getApplicationVisualizationMode()` in section 7.2.1.2, is:
   *
   * 1. Make the application visible.
   * 2. Make the application visible. Calling this method from the application itself may
   *    have no effect.
   * 3. Request to make the application visible.
   *
   * This method only affects the visibility of an application. In the case where more than
   * one application is visible, calls to this method will not affect the z-index of the
   * application with respect to any other visible applications.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=57
   */
  show(): void;

  /**
   * If the application visualization mode as defined by method
   * `getApplicationVisualizationMode()` in section 7.2.1.2, is:
   *
   * 1. Make the application invisible.
   * 2. Make the application invisible. Calling this method from the application itself may
   *    have no effect.
   * 3. Request to make the application invisible.
   *
   * Calling this method has no effect on the lifecycle of the application.
   *
   * Note: Broadcast independent applications should not call this method. Doing so may
   * result in only the background being visible to the user
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=58
   */
  hide(): void;

  /**
   * Move the application to the front of the active applications list. If the application has
   * been hidden using `Application.hide()`, this method does not cause the
   * application to be shown.
   *
   * If the application visualization mode as defined by method
   * `getApplicationVisualizationMode()` in section 7.2.1.2, is:
   *
   * 1. The application’s `Window` object SHALL be moved to the top of the stack of visible
   *    applications. In addition, the application’s `Window` object SHALL gain input focus if
   *    argument `gainFocus` has value `true`.
   * 2. The application’s `Window` object SHALL be moved to the top of the stack of visible
   *    applications. In addition, the application’s `Window` object SHALL gain input focus if
   *    argument `gainFocus` has value `true`. Calling this method from the application itself
   *    MAY have no effect.
   * 3. Request to make the application’s `Window` object visible. Once visible, the
   *    application SHALL be given input focus, irrespective of the value for argument
   *    `gainFocus`.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=58
   */
  activateInput(gainFocus?: boolean): void;

  /**
   * Remove the application from the active applications list. This has no effect on the
   * lifecycle of the application and MAY have no effect on the resources it uses.
   * Applications which are not active will receive no cross-application events, unless their
   * `Application` object is the target of the event (as for the events defined in [section
   * 7.2.6](http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=61)). Applications may still be manipulated via their `Application` object or their
   * DOM tree.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=58
   */
  deactivateInput(): void;

  /**
   * Create a new application and add it to the application tree. Calling this method does
   * not automatically show the newly-created application.
   *
   * This call is asynchronous and may return before the new application is fully loaded.
   * An `ApplicationLoaded` event will be targeted at the `Application` object when the
   * new application has fully loaded.
   *
   * If the application cannot be created, this method SHALL return `null`.
   *
   * @param uri The URI of the first page of the application to be created.
   * @param createChild Flag indicating whether the new application is a child of the current
   *                    application. A value of `true` indicates that the new application
   *                    should be a child of the current application; a value of `false`
   *                    indicates that it should be a sibling.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=58
   */
  createApplication(uri: string, createChild: boolean): Application | null;

  /**
   * Terminate the application, detach it from the application tree, and make any
   * resources used available to other applications. When an application is terminated,
   * any child applications shall also be terminated.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=59
   */
  destroyApplication(): void;
}

