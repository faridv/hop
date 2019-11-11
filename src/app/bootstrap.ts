import Store from "../_utilities/storage.utility";
import * as $ from 'jquery';
import {DeviceConfig} from "../_models/device-config.model";
import Application from "./app-manager";
import LogHelper from '../_helpers/log.helper';
import {Registry} from '../libs/registry';
import {ConfigHelper} from '../_helpers/config.helper';

declare let window: any;

export default class Bootstrap {

    public log: LogHelper;
    private config;
    private store;
    protected broadcastVideo: any;
    protected appManager: any;
    protected configObject: any;
    protected moduleRegistry;
    protected deviceParams: DeviceConfig = new DeviceConfig();

    constructor(config, modules) {
        window.$ = $;

        this.config = config;
        this.store = Store;
        this.moduleRegistry = new Registry(modules);
        this.log = new LogHelper(config);

        const self = this;
        this.handleBody();
        this.cacheConfig(config);
        this.preFlight(function () {
            self.prepareApps();
        });
    }

    cacheConfig(config): void {
        config = ConfigHelper.prepare(config);
        try {
            Store.set('config', config);
        } catch (e) {
            this.log.error('error caching config');
        }
    }

    handleModules(modules: any[]): any[] {
        modules.forEach((item) => {
            item['_constructor'] = this.moduleRegistry.getItem(item.type);
        });
        return modules;
    }

    prepareApps(): void {
        const applications = this.config.applications;
        const self = this;

        // Verbose events
        if (this.config.verbose) {
            $("body").append('<div id="logs" />');
            $(document).on('keydown', function (e) {
                if ($('#logs p').length > 19) {
                    $('#logs p:first').remove();
                }
                $('#logs').append('<p>key event: ' + e.key + '; which is: ' + e.which + '</p>');
            });
        }

        for (let i in applications) {
            applications[i].modules = this.handleModules(applications[i].modules);
            self.initializeApp(applications[i]);
        }
    }

    initializeApp(app: object): void {
        new Application(app, this.config, this);
    }

    handleBody(): void {
        const self = this;
        const bodyClass: string = (self.config.hd ? 'hd-' : 'sd-') + self.config.resolution;
        $("body").addClass(bodyClass);
    }

    preFlight(callback): void {
        const self = this;
        window.onload = (function () {
            const $$video: any = self.broadcastVideo = document.getElementById("broadcastvideo");
            const $$appManager: any = self.appManager = document.getElementById("appmgr");
            self.configObject = document.getElementById("oipfcfg");

            // self.getDeviceParams(self.broadcastVideo);
            // self.handleVideoSize(self.broadcastVideo);

            // Show application
            let $app: any;
            try {
                try {
                    $app = $$appManager.getOwnerApplication(document);
                    $app.show();
                } catch (error) {
                    self.log.error('application show() failed!');
                    // console.error('Application show() failed!', error);
                }
                try {
                    $app.activate();
                    self.log.info('application activate()');
                } catch (error) {
                    /* this is for HbbTV 0.5 backwards-compliance. It will throw an ignored exception on HbbTV 1.x devices, which is fine */
                    // ignore
                }
            } catch (error) {
                self.log.error('problem initializing application');
                // console.error('Problem initializing application', error);
            }

            // if ($$video.currentChannel) {
            try {
                $$video.setFullScreen(true);
            } catch (e) {
                // console.error('Error switching to fullscreen', e);
                // self.log.error('Cannot switch to fullscreen');
            }
            try {
                $$video.bindToCurrentChannel();
            } catch (e) {
                self.log.error('cannot bind to current channel');
                // console.error('Error bind element to current channel', e);
            }
            // } else {
            //     self.log.error('cannot determine current channel');
            //     // console.error('Cannot determine current channel.');
            // }

            self.setKeySet(0x1 + 0x2 + 0x4 + 0x8); // Colors
            callback();
        });
    }

    setKeySet(mask): void {
        let elemcfg, app;

        try {
            elemcfg = document.getElementById('oipfcfg');
            // for HbbTV 0.5:
            elemcfg.keyset.value = mask;
        } catch (e) {
            /* In newer versions of HbbTV keyset.value is read-only, therefore this method throws an exception */
            // ignore
        }
        try {
            elemcfg = document.getElementById('oipfcfg');
            elemcfg.keyset.setValue(mask);
        } catch (e) {
            /* In newer versions of HbbTV keyset.setValue only works on privateData of application, therefore this method throws an exception */
            // ignore
        }
        // for HbbTV 1.0:
        try {
            app = this.appManager.getOwnerApplication(document);
            app.privateData.keyset.setValue(mask);
        } catch (e) {
            this.log.error('set keyset value failed [for HbbTV 1.0]');
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
                console.error('problem mapping current channel data to deviceParams: 2', e);
            }
        } else {
            console.error('problem mapping current channel data to deviceParams: 1');
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
                this.appManager.hide();
            } catch (e) {
                console.error('error hiding application');
            }
        } else {
            this.setKeySet(0x1 + 0x2 + 0x4 + 0x8);
            try {
                this.appManager.destroyApplication();
            } catch (e) {
                console.error('cannot destroy application, force-hiding app');
                document.getElementById('app').style.display = 'none';
            }
        }
    }
}