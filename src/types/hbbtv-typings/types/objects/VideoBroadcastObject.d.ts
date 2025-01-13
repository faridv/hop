/**
 * The OITF SHALL support the video/broadcast embedded object with the following properties and methods, which
 SHALL adhere to the tuner related security requirements in section 10.1.3.1. The MIME type of this object SHALL be
 “video/broadcast”.

 * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=145
 */
export interface VideoBroadcastObject extends HTMLObjectElement {
  type: 'video/broadcast';

  /**
   * The width of the area used for rendering the video object. This property is only writable if property
   fullScreen has value false. Changing the width property corresponds to changing the width property
   through the HTMLObjectElement interface, and must have the same effect as changing the width through
   the DOM Level 2 Style interfaces (i.e. CSS2Properties interface style.width), at least for values
   specified in pixels.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=150
   */
  width: string;

  /**
   * The height of the area used for rendering the video object. This property is only writable if property
   fullScreen has value false. Changing the height property corresponds to changing the height
   property through the HTMLObjectElement interface, and must have the same effect as changing the
   height through the DOM Level 2 Style interfaces (i.e. CSS2Properties interface style.height), at least
   for values specified in pixels.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=150
   */
  height: string;

  /**
   * Returns true if this video object is in full-screen mode, false otherwise. The default value is false.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=150
   */
  readonly fullScreen: boolean;

  /**
   * The function that is called when a request to switch a tuner to another channel resulted in an error
   preventing the broadcasted content from being rendered. The specified function is called with the
   arguments channel and errorState. This function may be called either in response to a channel change
   initiated by the application, or a channel change initiated by the OITF (see section 7.13.1.1). These
   arguments are defined as follows:
   - Channel channel – the Channel object to which a channel switch was requested, but for which
   the error occurred. This object SHALL have the same properties as the channel that was requested,
   except that for channels of type ID_DVB_* the values for the onid and tsid properties SHALL be
   extracted from the transport stream when one was found (e.g. when errorState is 12).
   - Number errorState – error code detailing the type of error:
   - 0 channel not supported by tuner.
   - 1 cannot tune to given transport stream (e.g. no signal)
   - 2 tuner locked by other object.
   - 3 parental lock on channel.
   - 4 encrypted channel, key/module missing.
   - 5 unknown channel (e.g. can’t resolve DVB or ISDB triplet).
   - 6 channel switch interrupted (e.g. because another channel switch was activated before
   the previous one completed).
   - 7 channel cannot be changed, because it is currently being recorded.
   - 8 cannot resolve URI of referenced IP channel.
   - 9 insufficient bandwidth.
   - 10 channel cannot be changed by nextChannel()/prevChannel() methods either
   because the OITF does not maintain a favourites or channel list or because the
   video/broadcast object is in the Unrealized state.
   - 11 insufficient resources are available to present the given channel (e.g. a lack of
   available codec resources).
   - 12 specified channel not found in transport stream.
   - 100 unidentified error.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=150
   */
  onChannelChangeError(channel: OIPF.Channel, errorState: number): void;

  /**
   * The current play state of the video/broadcast object. Valid values are:
   Value Description
   - 0 unrealized; the application has not made a request to start presenting a channel or
   has stopped presenting a channel and released any resources. The content of the
   video/broadcast object should be transparent but if not shall be an opaque black
   rectangle. Control of media presentation is under the control of the OITF, as
   defined in annex H.2.
   - 1 connecting; the terminal is connecting to the media source in order to begin
   playback. Objects in this state may be buffering data in order to start playback.
   Control of media presentation is under the control of the application, as defined in
   annex H.2. The content of the video/broadcast object is implementation dependent.
   - 2 presenting; the media is currently being presented to the user. The object is in this
   state regardless of whether the media is playing at normal speed, paused, or
   playing in a trick mode (e.g. at a speed other than normal speed). Control of media
   presentation is under the control of the application, as defined in annex H.2. The
   video/broadcast object contains the video being presented.
   - 3 stopped; the terminal is not presenting media, either inside the video/broadcast
   object or in the logical video plane. The logical video plane is disabled. The content
   of the video/broadcast object SHALL be an opaque black rectangle. Control of
   media presentation is under the control of the application, as defined in annex H.2

   See section 7.13.1.1 for a description of the state model for a video/broadcast object.

   NOTE: Implementations where the content of the video/broadcast object is transparent in the
   unrealized state will give a better user experience than ones where it is black. This happens for an
   application with video in the background between when it includes a video/broadcast object in the page
   and when a call to bindToCurrentChannel() completes. Applications which do not need to call
   bindToCurrentChannel() should not do so. The current channel can be obtained from the
   currentChannel property on the Application object which is the same as that on the
   video/broadcast object under most normal conditions.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=151
   */
  playState: number;

  /**
   *         The function that is called when the play state of the video/broadcast object changes. The specified
   function is called with the arguments state and error. This function may be called either in response to
   an initiated by the application, an action initiated by the OITF or an error (see section 7.13.1.1). These
   arguments are defined as follows:

   Number state – the new state of the video/broadcast object
   - 0 unrealized; the user (or application) has not made a request to start presenting a
   channel or has stopped presenting a channel and released any resources.
   - 1 connecting; the receiver is connecting to the media source in order to begin presenting.
   Objects in this state may be buffering data in order to start playback.
   - 2 presenting; the media is currently being presented to the user. The object is in this state
   regardless of whether the media is playing at normal speed, paused, or playing in a trick
   mode (e.g. at a speed other than normal speed).

   Number error – if the state has changed due to an error, this field contains an error code detailing the
   type of error. See the definition of onChannelChangeError above for valid values. If no error has
   occurred, this argument SHALL take the value undefined.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=152
   */
  onPlayStateChange(state: number, error: number): void;

  /**
   * The function that is called when a request to switch a tuner to another channel has successfully
   completed. This function may be called either in response to a channel change initiated by the application,
   or a channel change initiated by the OITF (see section 7.13.1.1). The specified function is called with
   argument channel, which is defined as follows:
   - Channel channel – the channel to which the tuner switched. This object SHALL have the same
   properties with the same values as the currentChannel object (see 7.13.7.1).

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=152
   */
  onChannelChangeSucceeded: (channel: OIPF.Channel) => void;

  /**
   * The function that is called when the value of fullScreen changes. The default value is null.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=152
   */
  onFullScreenChange: () => void | null;

  /**
   * The function that is called when the video object gains focus.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=153
   */
  onfocus(): void;

  /**
   * The function that is called when the video object loses focus.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=153
   */
  onblur(): void;

  /**
   * Setting the value of the data property SHALL have no effect on the video/broadcast object. If this property
   * is read, the value returned SHALL always be the empty string.
   *
   * @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=153
   */
  data: string;

  /**
   * Returns the channel line-up of the tuner in the form of a ChannelConfig object as defined
   in section 7.13.9. The method SHALL return the value null if the channel list is not
   (partially) managed by the OITF (i.e., if the channel list information is managed entirely in
   the network).

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=153
   */
  getChannelConfig(): OIPF.ChannelConfig;

  /**
   *         If the video/broadcast object is in the unrealized state and video from exactly one
   channel is currently being presented by the OITF then this binds the video/broadcast
   object to that video.

   If the video/broadcast object is in the stopped state then this restarts presentation of
   video and audio from the current channel under the control of the video/broadcast
   object. If video from more than one channel is currently being presented by the OITF then
   this binds the video/broadcast object to the channel whose audio is being presented.

   If there is no channel currently being presented, or binding to the necessary resources to
   play the channel through the video/broadcast object fails for whichever reason, the
   OITF SHALL dispatch an event to the onPlayStateChange listener(s) whereby the
   “state” parameter is given value 0 (“unrealized”) and the “error” parameter is given
   the appropriate error code.

   Calling this method from any other states than the unrealized or stopped states SHALL
   have no effect.

   See section 7.13.1.1 for more information of its usage.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=153
   */
  bindToCurrentChannel(): void;

  /**
   * Creates a Channel object of the specified idType. This method is typically used to create
   a Channel object of type ID_DVB_SI_DIRECT. The Channel object can subsequently be
   used by the setChannel() method to switch a tuner to this channel, which may or may
   not be part of the channel list in the OITF. The resulting Channel object represents a
   locally defined channel which, if not already present there, does not get added to the
   channel list accessed through the ChannelConfig class (see 7.13.9).

   Valid value for idType include: ID_DVB_SI_DIRECT. For other values this behaviour is
   not specified.

   If the channel of the given type cannot be created or the delivery system descriptor is not
   valid, the method SHALL return null.

   If the channel of the given type can be created and the delivery system descriptor is valid,
   the method SHALL return a Channel object whereby at a minimum the properties with the
   same names (i.e. idType, dsd and sid) are given the same value as argument idType,
   dsd and sid of the createChannelObject method.

   @param idType The type of channel, as indicated by one of the ID_* constants defined in
    section 7.13.11.1. Valid value for idType include: ID_DVB_SI_DIRECT. For
    other values this behaviour is not specified.
   @param dsd The delivery system descriptor (tuning parameters) represented as a string
    whose characters shall be restricted to the ISO Latin-1 character set. Each
    character in the dsd represents a byte of a delivery system descriptor as
    defined by DVB-SI [EN300468] section 6.2.13, such that a byte at position "i" in
    the delivery system descriptor is equal the Latin-1 character code of the
    character at position "i" in the dsd.
    Arguments
   @param sid The service ID, which must be within the range of 1 to 65535.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=153
   */
  createChannelObject(idType: number, dsd: string, sid: number): OIPF.Channel;

  /**
   * Creates a Channel object of the specified idType. The Channel object can subsequently
   be used by the setChannel() method to switch a tuner to this channel, which may or
   may not be part of the channel list in the OITF. The resulting Channel object represents a
   locally defined channel which, if not already present there, does not get added to the
   channel list accessed through the ChannelConfig class (see 7.13.9).
   If the channel of the given idType cannot be created or the given (combination of)
   arguments are not considered valid or complete, the method SHALL return null.
   If the channel of the given type can be created and arguments are considered valid and
   complete, then either:
   1. if the channel is in the channel list then a new object of the same type and with
   properties with the same values SHALL be returned as would be returned by calling
   getChannelWithTriplet() with the same parameters as this method.
   2. Otherwise, the method SHALL return a Channel object whereby at a minimum the
   properties with the same names are given the same value as the given arguments of
   the createChannelObject() method. The values specified for the remaining
   properties of the Channel object are set to undefined.

   @param idType The type of channel, as indicated by one of the ID_* constants defined
    in section 7.13.11.1.
   @param onid The original network ID. Optional argument that SHALL be specified
    when the idType specifies a channel of type ID_DVB_*, ID_IPTV_URI,
    or ID_ISDB_* and SHALL otherwise be ignored by the OITF.
   @param tsid The transport stream ID. Optional argument that MAY be specified
    when the idType specifies a channel of type ID_DVB_*, ID_IPTV_URI,
    or ID_ISDB_* and SHALL otherwise be ignored by the OITF.
   @param sid The service ID. Optional argument that SHALL be specified when the
    idType specifies a channel of type ID_DVB_*, ID_IPTV_URI, or
    ID_ISDB_* and SHALL otherwise be ignored by the OITF.
   @param sourceID The source_ID. Optional argument that SHALL be specified when the
    idType specifies a channel of type ID_ATSC_T and SHALL otherwise
    be ignored by the OITF.
   @param ipBroadcastID The DVB textual service identifier of the IP broadcast service, specified
    in the format “ServiceName.DomainName” when idType specifies a
    channel of type ID_IPTV_SDS, or the URI of the IP broadcast service
    when idType specifies a channel of type ID_IPTV_URI. Optional
    argument that SHALL be specified when the idType specifies a
    channel of type ID_IPTV_SDS or ID_IPTV_URI and SHALL otherwise
    be ignored by the OITF.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=154
   */
  createChannelObject(idType: number, onid?: number, tsid?: number,
                      sid?: number, sourceID?: number, ipBroadcastID?: string): OIPF.Channel;

  /**
   *             Requests the OITF to switch a (logical or physical) tuner to the channel specified by
   channel and render the received broadcast content in the area of the browser allocated for
   the video/broadcast object.

   If the channel specifies an idType attribute value which is not supported by the OITF or a
   combination of properties that does not identify a valid channel, the request to switch
   channel SHALL fail and the OITF SHALL trigger the function specified by the
   onChannelChangeError property, specifying the value 0 (“Channel not supported by
   tuner”) for the errorState, and dispatch the corresponding DOM 2 event (see below).

   If the channel specifies an idType attribute value supported by the OITF, and the
   combination of properties defines a valid channel, the OITF SHALL relay the channel
   switch request to a local physical tuner that is currently not in use by another
   video/broadcast object and that can tune to the specified channel. If no tuner satisfying
   these requirements is available (i.e. all physical tuners that could receive the specified
   channel are in use), the request SHALL fail and OITF SHALL trigger the function specified
   by the onChannelChangeError property, specifying the value ‘2’ (“tuner locked by other
   object”) for the errorState and dispatch the corresponding DOM 2 event (see below). If
   multiple tuners satisfying these requirements are available, the OITF selects one.

   If the channel specifies an IP broadcast channel, and the OITF supports idType
   ID_IPTV_SDS or ID_IPTV_URI, the OITF SHALL relay the channel switch request to a
   logical ‘tuner’ that can resolve the URI of the referenced IP broadcast channel. If no logical
   tuner can resolve the URI of the referenced IP broadcast channel, the request SHALL fail
   and the OITF SHOULD trigger the function specified by the onChannelChangeError
   property, specifying the value 8 (“cannot resolve URI of referenced IP channel”) for the
   errorState, and dispatch the corresponding DOM 2 event.

   The optional attribute contentAccessDescriptorURL allows for the inclusion of a
   Content Access Streaming Descriptor (the format of which is defined in Annex E.2) to
   provide additional information for dealing with IPTV broadcasts that are (partially) DRMprotected.
   The descriptor may for example include Marlin action tokens or a
   previewLicense. The attribute SHALL be undefined or null if it is not applicable.
   If the Transport Stream cannot be found, either via the DSD or the (ONID,TSID) pair, then
   a call to onChannelChangeError with errorstate=5 (“unknown channel”) SHALL be
   triggered, and the corresponding DOM 2 event dispatched.

   If the OITF succeeds in tuning to a valid transport stream but this transport stream does not
   contain the requested service in the PAT, the OITF SHALL remain tuned to that location
   and SHALL trigger a call to onChannelChangeError with errorstate=12 (“specified
   channel not found in transport stream”), and dispatch the corresponding DOM 2 event.

   If, following this procedure, the OITF selects a tuner that was not already being used to
   display video inside the video/broadcast object, the OITF SHALL claim the selected
   tuner and the associated resources (e.g., decoding and rendering resources) on behalf of
   the video/broadcast object.

   If all of the following are true:

   - the video/broadcast object is successfully switched to the new channel
   - the channel is a locally defined channel (created using the createChannelObject
   method)
   - the new channel has the same tuning parameters as a channel already in the
   channel list in the OITF
   - the idType is a value other than ID_IPTV_URI

   then the result of this operation SHALL be the same as calling setChannel with the
   channel argument being the corresponding channel object in the channel list, such that:

   - the values of the properties of the video/broadcast object currentChannel
   SHALL be the same as those of the channel in the channel list
   - any subsequent call to nextChannel or prevChannel SHALL switch the tuner to
   the next or previous channel in the favourite list or channel list as appropriate, as
   described in the definitions of these methods

   Otherwise, if any of the above conditions is not true, then:

   - the values of the properties of the video/broadcast object currentChannel
   SHALL be the same as those provided in the channel argument to this method,
   updated as defined in section 8.4.2
   - the channel is not considered to be part of the channel list

   the resulting current channel after any subsequent call to nextChannel() or
   prevChannel() is implementation dependent, however all appropriate functions SHALL
   be called and DOM 2 events dispatched. The OITF SHALL visualize the video content
   received over the tuner in the area of the browser allocated for the video/broadcast
   object. If the OITF cannot visualize the video content following a successful tuner switch
   (e.g., because the channel is under parental lock), the OITF SHALL trigger the function
   specified by the onChannelChangeError property with the appropriate channel and
   errorState value, and dispatch a corresponding DOM 2 event (see below). If successful,
   the OITF SHALL trigger the function specified by the onChannelChangeSucceeded
   property with the given channel value, and also dispatch a corresponding DOM 2 event.

   @param channel The channel to which a switched is requested.
    If the channel object specifies a ccid, the ccid identifies
    the channel to be set. If the channel does not specify a
    ccid, the idType determines which properties of the
    channel are used to define the channel to be set, for
    example, if the channel is of type ID_IPTV_SDS or
    ID_IPTV_URI, the ipBroadcastID identifies the
    channel to be set.
    If null, the video/broadcast object SHALL transition to
    the unrealized state and release any resources used for
    decoding video and/or audio. A
    ChannelChangeSucceeded event SHALL be generated
    when the operation has completed.
   @param trickplay Optional flag indicating whether resources SHOULD be
    allocated to support trick play. This argument provides a
    hint to the receiver in order that it may allocate
    appropriate resources. Failure to allocate appropriate
    resources, due to a resource conflict, a lack of trickplay
    support, or due to the OITF ignoring this hint, SHALL
    have no effect on the success or failure of this method.
    If trickplay is not supported, this SHALL be indicated
    through the failure of later calls to methods invoking
    trickplay functionality.
   @param contentAccessDescriptorURL Optional argument containing a Content Access
    Streaming descriptor (the format of which is defined in
    Annex E.2) that can be included to provide additional
    information for dealing with IPTV broadcasts that are
    (partially) DRM-protected. The argument SHALL be
    undefined or null if it is not applicable.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=155
   */
  setChannel(channel: OIPF.Channel, trickplay?: boolean, contentAccessDescriptorURL?: string): void;

  /**
   * Requests the OITF to switch the tuner that is currently in use by the video/broadcast
   object to the channel that precedes the current channel in the active favourite list, or, if no
   favourite list is currently selected, to the previous channel in the channel list. If it has
   reached the start of the favourite/channel list, it SHALL cycle to the last channel in the list.

   If the current channel is not part of the channel list, it is implementation dependent whether
   the method call succeeds or fails and, if it succeeds, which channel is selected. In both
   cases, all appropriate functions SHALL be called and DOM 2 events dispatched.

   If the previous channel is a channel that cannot be received over the tuner currently used
   by the video/broadcast object, the OITF SHALL relay the channel switch request to a
   local physical or logical tuner that is not in use and that can tune to the specified channel.
   The behaviour is defined in more detail in the description of the setChannel method.

   If an error occurs during switching to the previous channel, the OITF SHALL trigger the
   function specified by the onChannelChangeError property with the appropriate channel
   and errorState value, and dispatch the corresponding DOM 2 Event (see below).

   If the OITF does not maintain the channel list and favourite list by itself, the request SHALL
   fail and the OITF SHALL trigger the onChannelChangeError function with the channel
   property having the value null, and errorState=10 (“channel cannot be changed by
   nextChannel()/prevChannel() methods”).

   If successful, the OITF SHALL trigger the function specified by the
   onChannelChangeSucceeded property with the appropriate channel value, and also
   dispatch the corresponding DOM 2 event.

   Calls to this method are valid in the Connecting, Presenting and Stopped states. They are
   not valid in the Unrealized state and SHALL fail.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=157
   */
  prevChannel(): void;

  /**
   * Requests the OITF to switch the tuner that is currently in use by the video/broadcast
   object to the channel that succeeds the current channel in the active favourites list, or, if no
   favourite list is currently selected, to the next channel in the channel list. If it has reached
   the end of the favourite/channel list, it SHALL cycle to the first channel in the list.

   If the current channel is not part of the channel list, it is implementation dependent whether
   the method call succeeds or fails and, if it succeeds, which channel is selected. In both
   cases, all appropriate functions SHALL be called and DOM 2 events dispatched. If the next
   channel is channel that cannot be received over the tuner currently used by the
   video/broadcast object, the OITF SHALL relay the channel switch request to a local
   physical or logical tuner that is not in use and that can tune to the specified channel. The
   behaviour is defined in more detail in the description of the setChannel method.

   If an error occurs during switching to the next channel, the OITF SHALL trigger the function
   specified by the onChannelChangeError property with the appropriate channel and
   errorState value, and dispatch the corresponding DOM 2 event (see below).

   If the OITF does not maintain the channel list and favourite list by itself, the request SHALL
   fail and the OITF SHALL trigger the onChannelChangeError function with the channel
   property having the value null, and errorState=10 (“channel cannot be changed by
   nextChannel()/prevChannel() methods”).

   If successful, the OITF SHALL trigger the function specified by the
   onChannelChangeSucceeded property with the appropriate channel value, and also
   dispatch the corresponding DOM 2 event.

   Calls to this method are valid in the Connecting, Presenting and Stopped states. They are
   not valid in the Unrealized state and SHALL fail.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=157
   */
  nextChannel(): void;

  /**
   * Sets the rendering of the video content to full-screen (fullscreen = true) or windowed
   (fullscreen = false) mode (as per [Req. 5.7.1.c] of [CEA2014A]). If this indicates a
   change in mode, this SHALL result in a change of the value of property fullscreen.
   Changing the mode SHALL NOT affect the z-index of the video object.

   @param fullscreen Boolean to indicate whether video content SHOULD be rendered
    full-screen or not.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=158
   */
  setFullScreen(fullscreen: boolean): void;

  /**
   * Adjusts the volume of the currently playing media to the volume as indicated by volume.
   Allowed values for the volume argument are all the integer values starting with 0 up to and
   including 100. A value of 0 means the sound will be muted. A value of 100 means that the
   volume will become equal to current “master” volume of the device, whereby the “master”
   volume of the device is the volume currently set for the main audio output mixer of the
   device. All values between 0 and 100 define a linear increase of the volume as a
   percentage of the current master volume, whereby the OITF SHALL map it to the closest
   volume level supported by the platform.

   The method returns true if the volume has changed. Returns false if the volume has not
   changed. Applications MAY use the getVolume() method to retrieve the actual volume
   set.

   @param volume Integer value between 0 up to and including 100 to
    indicate volume level.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=158
   */
  setVolume(volume: number): boolean;

  /**
   * Returns the actual volume level set; for systems that do not support individual volume
   control of players, this method will have no effect and will always return 100.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=158
   */
  getVolume(): number;

  /**
   * Releases the decoder/tuner used for displaying the video broadcast inside the
   video/broadcast object, stopping any form of visualization of the video inside the
   video/broadcast object and releasing any other associated resources.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=158
   */
  release(): void;

  /**
   * Stop presenting broadcast video. If the video/broadcast object is in any state other than the
   unrealized state, it SHALL transition to the stopped state and stop video and audio
   presentation. This SHALL have no effect on access to non-media broadcast resources
   such as EIT information.

   Calling this method from the unrealized state SHALL have no effect.

   See section 7.13.1.1 for more information of its usage.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=158
   */
  stop(): void;

  /**
   *         The channel currently being presented by this embedded object if the user has given permission to
   share this information, possibly through a mechanism outside the scope of this specification. If no
   channel is being presented, or if this information is not visible to the caller, the value of this property
   SHALL be null.

   @see http://www.oipf.tv/docs/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-v1_2-2012-09-19.PDF#page=171
   */
  readonly currentChannel: Channel | null;

  /**
   *         If an OITF has indicated support for broadcast video using SD&S (e.g. by including an element <video_broadcast
   type="ID_IPTV_SDS"> in its capability description), the OITF SHALL support the following additional method on
   the video/broadcast object, in order to create a channel list from an SD&S fragment.

   Creates a ChannelList object from the specified SD&S Broadcast Discovery Record.
   Channels in the returned channel list will not be included in the channel list that can be
   retrieved via calls to getChannelConfig().

   @param bdr An XML-encoded string containing an SD&S Broadcast Discovery Record as
    specified in [META]. If the string is not a valid Broadcast Discovery Record,
    this method SHALL return null.
   */
  createChannelList(bdr: string): OIPF.ChannelList;
}

