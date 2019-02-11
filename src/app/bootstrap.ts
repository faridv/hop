import Store from "../_utilities/storage.utility";
import * as $ from 'jquery';
import {DeviceConfig} from "../_models/device-config.model";
import Application from "./app-manager";

declare let window: any;

export default class Bootstrap {

    config;
    store;

    broadcastVideo: any;
    appManager: any;
    hbbApp: any;
    configObject: any;

    deviceParams: DeviceConfig = new DeviceConfig();

    constructor(config) {

        window.$ = $;

        this.config = config;
        this.store = Store;

        const self = this;
        this.handleBody();
        this.cacheConfig(config);
        this.preFlight(function () {
            self.prepareApps();
            // this.initialize()
        });
    }

    cacheConfig(config): void {
        Store.set('config', this.config);
    }

    prepareApps(): void {
        const applications = this.config.applications;
        const self = this;

        // Verbose events
        if (this.config.verboseEvents) {
            $(function () {
                $("body").append('<div id="logs"></div>');
                $(document).on('keydown', function (e) {
                    if ($('#logs p').length > 19) {
                        $('#logs p:first').remove();
                    }
                    $('#logs').append('<p>key event: ' + e.key + '; which is: ' + e.which + '</p>');
                });
            });
        }

        for (let i in applications) {
            $(function () {
                self.initializeApp(applications[i]);
            });
        }
    }

    initializeApp(app: object): void {
        new Application(app, this.config, this);
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
        // $(document).on('keyup keydown', function(e) {
        //     console.log(e);
        // });
        window.onload = function () {
            setTimeout(() => {
                self.broadcastVideo = document.getElementById("broadcastvideo");
                self.appManager = document.getElementById("appmgr");
                self.configObject = document.getElementById("oipfcfg");

                self.getDeviceParams(self.broadcastVideo);
                self.handleVideoSize(self.broadcastVideo);
                self.setKeySet(0x1 + 0x2 + 0x4 + 0x8); // Colors
                // this.setKeySet(0x1 + 0x2 + 0x4 + 0x8 + 0x10 + 0x20 + 0x40 + 0x80);

                try {
                    self.broadcastVideo.setFullScreen(true);
                } catch (e) {
                    // error switch to fullscreen
                }
                try {
                    self.broadcastVideo.bindToCurrentChannel();
                } catch (e) {
                    //error bind element to current channel
                }
                try {
                    self.hbbApp = self.appManager.getOwnerApplication(document);
                    self.hbbApp.show();
                    // self.hbbApp.activate();
                } catch (error) {
                    console.error('Problem initializing application', error);
                }
                if (typeof callback === 'function') {
                    callback();
                }
            }, 1000);
        };
    }

    setKeySet(mask): void {
        try {
            this.configObject.keyset.value = mask;
        } catch (e) {
            // open
        }
        try {
            this.configObject.keyset.setValue(mask);
        } catch (e) {
            //open
        }
        try {
            this.hbbApp.privateData.keyset.setValue(mask);
            this.hbbApp.privateData.keyset.value = mask;
        } catch (e) {
            // catch error
        }
    }

    handleVideoSize(broadCastVideo): void {
        if (broadCastVideo && broadCastVideo.style) {
            broadCastVideo.style.display = 'block';
            broadCastVideo.style.left = '0px';
            broadCastVideo.style.top = '0px';
            broadCastVideo.style.width = this.config.hd ? ((this.config.resolution * 16) / 9) + 'px' : ((this.config.resolution * 4) / 3) + 'px';
            broadCastVideo.style.height = this.config.resolution + 'px';
        }
    }

    getDeviceParams(broadcastObject): void {
        if (broadcastObject && typeof broadcastObject.currentChannel !== 'undefined' && broadcastObject.currentChannel) {
            try {
                this.deviceParams.channelList = broadcastObject.getChannelConfig().channelList;
                this.deviceParams.channelName = broadcastObject.currentChannel.name;
                this.deviceParams.channelCCID = broadcastObject.currentChannel.ccid;
                this.deviceParams.channelDescription = broadcastObject.currentChannel.description;
                this.deviceParams.channelONID = broadcastObject.currentChannel.onid;
                this.deviceParams.channelSID = broadcastObject.currentChannel.sid;
                this.deviceParams.channelTSID = broadcastObject.currentChannel.tsid;
            } catch (e) {
                console.error('Problem mapping current channel data to deviceParams: 2', e);
            }
        } else {
            console.error('Problem mapping current channel data to deviceParams: 1');
        }
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

    destroy(layout?: string): void {
        if (this.config.exitMethod === 'hide') {
            try {
                this.hbbApp.hide();
            } catch (e) {
                console.error('Error hiding application');
            }
        } else {
            this.setKeySet(0x1 + 0x2 + 0x4 + 0x8);
            this.hbbApp.destroyApplication();
        }
    }
}