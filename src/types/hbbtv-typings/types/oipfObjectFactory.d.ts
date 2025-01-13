interface Window {
    oipfObjectFactory: OipfObjectFactory
}

declare var oipfObjectFactory: OipfObjectFactory;

/**
 * Object factory API
 * This section defines the methods to check and create an instance of the DAE defined embedded objects within JavaScript.
 * The OITF SHALL support a globally accessible object of type “OipfObjectFactory” as a static property "oipfObjectFactory" of the Window interface with the API as defined in this section. The object factory SHALL ensure that the referenced objects are correctly set up. This is an alternative to instantiating embedded objects (or plugins) outside of JavaScript.
 * The factory object can be accessed as a property of the window object (i.e. window.oipfObjectFactory or oipfObjectFactory). 
 */
declare class OipfObjectFactory {
    /**
     * This method SHALL return `true` if and only if an object of the specified type is supported
     * by the OITF. The method SHALL return `false` if the MIME type passed as a parameter is
     * not supported by the client. 
     */
    isObjectSupported(mimeType: OIPFObjectFactoryMIMETypes): boolean;

    /*
     * #### 7.1.1.1 Visual objects
     * The methods in this section all return HTMLObjectElement objects which can be inserted in the DOM tree. All objects
     * in section 7 which have a visual representation on the screen can be created using methods in this section. Only for
     * objects defined in section 7, that are supported by the device (i.e. as indicated through the client capability description), a
     * corresponding method name to instantiate the object through the OipfObjectFactory class can be assumed to be
     * present on the oipfObjectFactory object. For any other object, a corresponding method name cannot be assumed to
     * be present.
     */

    /*
     * Since objects do not claim scarce resources when they are instantiated,
instantiation shall never fail if the object type is supported. If the method name to
create the object is not supported, the OITF SHALL throw an error with the
error.name set to the value "TypeError".
     * 
     * If the object type is supported, the method shall return an HTMLObjectElement
equivalent to the specified object. The value of the type attribute of the
HTMLObjectElement SHALL match the mimetype of the instantiated object, for
example "application/oipfVideoBroadcast" in case of method
oipfObjectFactory.createVideoBroadcastObject(). 
     */

    /**
     * @throws {TypeError}
     */
    createVideoBroadcastObject(): OIPF.VideoBroadcastObject;
    createVideoMpegObject(): OIPF.VideoMpegObject;
    createStatusViewObject(): OIPF.StatusViewObject;

    createApplicationManagerObject(): OIPF.ApplicationManagerObject;
    createCapabilitiesObject(): OIPF.CapabilitiesObject;
    createCodManagerObject(): OIPF.CodManagerObject;
    createConfigurationObject(): OIPF.ConfigurationObject;
    createDownloadManagerObject(): OIPF.DownloadManagerObject;
    createDownloadTriggerObject(): OIPF.DownloadTriggerObject;
    createDrmAgentObject(): OIPF.DrmAgentObject;
    createGatewayInfoObject(): OIPF.GatewayInfoObject;
    // createIMSObject(): OIPF.IMSObject;
    createMDTFObject(): OIPF.MDTFObject;
    createNotifSocketObject(): OIPF.NotifSocketObject;
    createParentalControlManagerObject(): OIPF.ParentalControlManagerObject;
    createRecordingSchedulerObject(): OIPF.RecordingSchedulerObject;
    createRemoteManagementObject(): OIPF.RemoteManagementObject;
    createSearchManagerObject(): OIPF.SearchManagerObject;
}

/**
 * The mimeType may have any of the MIME types defined in
 * tables 1 to 4 of [MEDIA] or any of the DAE defined mime types
 * listed below.
 */
type OIPFObjectFactoryMIMETypes =
    'application/notifsocket' |
    'application/oipfApplicationManager' |
    'application/oipfCapabilities' |
    'application/oipfCodManager' |
    'application/oipfCommunicationServices' |
    'application/oipfConfiguration' |
    'application/oipfDownloadManager' |
    'application/oipfDownloadTrigger' |
    'application/oipfDrmAgent' |
    'application/oipfGatewayInfo' |
    'application/oipfMDTF' |
    'application/oipfParentalControlManager' |
    'application/oipfRecordingScheduler' |
    'application/oipfRemoteManagement' |
    'application/oipfSearchManager' |
    'application/oipfStatusView' |
    'video/broadcast';
