import Inputs from "../../app/inputs";
import TemplateHelper from "../../_helpers/template.helper";
import template from './stream.html';

export default class StreamModule {

    private template;
    private input;
    private config;
    private $el = $('#content');
    private activeMode: string = 'both';

    constructor(config, layoutInstance?, moduleType?: string) {
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.config = config;

        const self = this;

        this.registerKeyboardInputs();
        this.render(config, () => {
            self.template.loading(false);
            if (this.config.hasAudio)
                this.muteStream(false);
        });
    }

    render(config, callback?): void {
        this.template.loading();
        const self = this;
        // const templatePromise = this.template.load('modules', 'stream');
        this.template.render(template, config, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback();
        });
    }

    muteStream(flag: boolean = true) {
        const $tv = <HTMLVideoElement>$('#broadcast video:first')[0];
        const $stream = <HTMLVideoElement>$('#content video:first')[0];
        $tv.muted = !flag;
        $stream.muted = flag;
    }

    hide(): void {
        if (this.activeMode === 'both') {
            $("#content").hide(1);
            this.pip(false);
        } else {
            $("#content").fadeOut('fast');
        }
        if (this.config.hasAudio)
            this.muteStream();
    }

    show(): void {
        if (this.activeMode === 'both') {
            this.pip(false, () => {
                $("#content").fadeIn('fast');
            });
        } else {
            $("#content").fadeIn('fast');
        }
        if (this.config.hasAudio)
            this.muteStream(false);
    }

    pip(start: boolean = true, callback?): void {
        const method = start ? 'addClass' : 'removeClass';
        $("#content")[method]('half');
        $('body')[method]('broadcast-half');
        if (start) {
            if (this.config.hasAudio)
                this.muteStream();
            if (!$("#content").is('visible')) {
                $("#content").fadeIn('fast');
            }
        } else {
            if (this.config.hasAudio)
                this.muteStream(false);
        }
        if (typeof callback === 'function')
            callback();
    }

    private registerKeyboardInputs(): void {
        const self = this;
        const input = Inputs.instance;
        const rightParams = {key: 'screen.right', title: 'تصویر تلویزیون', icon: 'right', button: true};
        input.addEvent('right', false, rightParams, () => {
            self.hide();
            self.activeMode = 'tv';
        });
        const leftParams = {key: 'screen.left', title: 'ویدیوی دوم', icon: 'left', button: true};
        input.addEvent('left', false, leftParams, () => {
            self.show();
            self.activeMode = 'stream';
        });
        const enterParams = {key: 'screen.select', title: 'نمایش هر دو', icon: 'enter', button: true};
        input.addEvent('enter', false, enterParams, () => {
            self.pip();
            self.activeMode = 'both';
        });
    }

    destroy(instance?: StreamModule): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        $('body').removeClass('broadcast-half');
        self.input.removeEvent('left', {key: 'screen.left'});
        self.input.removeEvent('right', {key: 'screen.right'});
        self.input.removeEvent('enter', {key: 'screen.select'});
        return true;
    }
}
