import * as $ from "jquery";
import Inputs from "./inputs";
import TemplateHelper from "../_helpers/template.helper";
import Layouts from "./layouts";
import Bootstrap from "./bootstrap";
import {ScriptLoaderService} from "../_services/script-loader.service";
import '../_declarations/videojs.declaration';

export default class AppManager {

    private config;
    private input;
    private container: string;
    private $el;
    private template;
    private _bootstrapInstance: Bootstrap;
    private scriptLoader;
    private scripts = [
        "assets/js/vendor/video.min.js"
    ];

    constructor(appData, Config, BootstrapInstance: Bootstrap) {
        this.config = Config;
        this.input = Inputs.instance;
        this.template = TemplateHelper.instance;
        this.container = Config.container;
        this._bootstrapInstance = BootstrapInstance;
        this.scriptLoader = ScriptLoaderService.instance;

        const self = this;

        if (typeof this.config.streamMode && this.config.streamMode) {
            this.handleStreamMode();
        }

        $(function () {
            self.$el = $(self.container);
            self.showButton(appData);
        });
    }

    showButton(appData): boolean {
        const self = this;

        if (this.config.autostart) {
            self.initializeApplication(appData);
            return true;
        }

        const controlType = (appData.hasHub) ? 'button' : appData.layout;
        const templatePromise = this.template.load('controls', controlType);
        const button = appData.button;
        this.template.render(templatePromise, appData, this.$el, 'append', function (element) {

            // Show button after intentional delay time
            setTimeout(() => {

                $(element).find('[class*="button-"]').addClass('show');

                // Add application initialization key event
                const inputParams = {key: 'app.' + button.key, title: 'init'};
                self.input.addEvent(button.key, true, inputParams, function () {
                    self.initializeApplication(appData);
                });
                // const inputParams2 = {key: 'app.' + 'r', title: 'init'};
                // self.input.addEvent('r', true, inputParams2, function () {
                //     self.initializeApplication(appData);
                // });

                // Hide button after the configured time
                setTimeout(() => {
                    if ($(element).find('.show[class*="button-"]').length) {
                        $(element).find('[class*="button-"]').removeClass('show');
                    }
                }, self.config.timeout);
            }, self.config.delay);
        });
        return true;
    }

    initializeApplication(appData) {
        const self = this;
        const layout = appData.layout;
        const templatePromise = this.template.load('layouts', layout);
        const modules = {items: appData.modules};

        this._bootstrapInstance.setKeySet(0x1 + 0x2 + 0x4 + 0x8 + 0x10 + 0x20 + 0x40 + 0x80); // All Keys

        this.template.render(templatePromise, modules, this.$el, 'html', function () {
            self.template.addClass('active');

            // Should be on body
            self.template.addClass('layout-' + layout, 'body');

            const inputParams = {key: 'app.close', title: 'خروج', button: true};
            self.input.addEvent(appData.button.key + ',r', false, inputParams, function () {
                if (self.config.exitMethod === 'hide') {
                    if ($("#app").is(":visible")) {
                        $("#app").hide(1);
                    } else {
                        $("#app").show(1);
                    }
                } else {
                    self.template.removeClassIfContains('body', 'layout-');
                    self._bootstrapInstance.destroy(layout);
                }
            });
            new Layouts(layout, self.config, appData);
        });
    }

    handleStreamMode(): void {
        const self = this;
        $('body').addClass('stream-mode');
        $('body').prepend('<video id="tv-stream" class="video-js" preload="auto" autoplay width="1280" height="720"></video>');
        // $("#tv-stream").css({'display': 'block'});
        this.scripts.forEach((script) => {
            self.scriptLoader.loadScript('head', script, true).then(() => {
                // $("#tv-stream").append('<source src="' + this.config.streamUrl + '" type="application/x-mpegURL">');
                videojs('tv-stream', {
                    autoplay: true,
                    sources: [{
                        src: this.config.streamUrl,
                        type: 'application/x-mpegURL'
                    }]
                });
            });
        });
    }
}