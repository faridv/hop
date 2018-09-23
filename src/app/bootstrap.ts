import Store from "../_utilities/storage.utility";
import * as $ from 'jquery';
import {DeviceConfig} from "../_models/device-config.model";
import Application from "./app-manager";

declare let window: any;

export default class Bootstrap {

    config;
    store;

    broadcastVideo;
    appManager;
    hbbApp;
    deviceParams: DeviceConfig = new DeviceConfig();

    constructor(config) {

        window.$ = $;

        this.config = config;
        this.store = Store;

        const self = this;
        this.handleBody();
        this.preFlight(function () {
            self.prepareApps();
            // this.initialize()
        });
    }

    prepareApps(): void {
        const applications = this.config.applications;
        const self = this;

        for (let i in applications) {
            $(function () {
                // setTimeout(() => {
                    self.initializeApp(applications[i]);
                // }, self.config.timeout);
            });
        }
    }

    initializeApp(app: object): void {
        const application = new Application(app, this.config, this);
    }

    handleBody(): void {
        const self = this;
        $(function () {
            const bodyClass: string = (self.config.hd ? 'hd-' : 'sd-') + self.config.resolution;
            $("body").addClass(bodyClass);
        });
    }

    preFlight(callback): void {
        const self = this;
        window.onload = function () {
            self.broadcastVideo = document.getElementById("broadcastvideo");
            self.appManager = document.getElementById("appmgr");

            self.getDeviceParams(self.broadcastVideo);
            self.handleVideoSize(self.broadcastVideo);

            self.broadcastVideo.setFullScreen(true);
            self.broadcastVideo.bindToCurrentChannel();

            self.hbbApp = self.appManager.getOwnerApplication(document);
            self.hbbApp.show();
            // app.activate();

            if (typeof callback === 'function') {
                callback();
            }
        };
    }

    handleVideoSize(broadCastVideo): void {
        broadCastVideo.style.display = 'block';
        broadCastVideo.style.left = '0px';
        broadCastVideo.style.top = '0px';
        broadCastVideo.style.width = this.config.hd ? ((this.config.resolution * 16) / 9) + 'px' : ((this.config.resolution * 4) / 3) + 'px';
        broadCastVideo.style.height = this.config.resolution + 'px';
    }

    getDeviceParams(broadcastObject): void {
        this.deviceParams.channelList = broadcastObject.getChannelConfig().channelList;
        this.deviceParams.channelName = broadcastObject.currentChannel.name;
        this.deviceParams.channelCCID = broadcastObject.currentChannel.ccid;
        this.deviceParams.channelDescription = broadcastObject.currentChannel.description;
        this.deviceParams.channelONID = broadcastObject.currentChannel.onid;
        this.deviceParams.channelSID = broadcastObject.currentChannel.sid;
        this.deviceParams.channelTSID = broadcastObject.currentChannel.tsid;
        this.deviceParams.cookieEnabled = navigator.cookieEnabled;
        this.deviceParams.userAgent = navigator.userAgent;
        this.deviceParams.viewportWidth = $(window).width();
        this.deviceParams.viewportHeight = $(window).height();
        // Cache device params
        this.storeDeviceParams(this.deviceParams);
    }

    storeDeviceParams(deviceParams): void {
        Store.set('params', deviceParams);
    }

    destroy(): void {
        console.log('destruction called!');
        this.hbbApp.destroyApplication();
    }
}