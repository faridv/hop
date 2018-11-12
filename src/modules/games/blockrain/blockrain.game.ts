import GamesModule from "../games.module";
import {ScriptLoaderService} from "../../../_services/script-loader.service";
import TemplateHelper from "../../../_helpers/template.helper";
import Inputs from "../../../app/inputs";

export default class BlockrainGame {

    private gamesModule: GamesModule;
    private scriptLoader;
    private template;
    private input;
    private $game;
    private $el = $('#fullscreen');
    private scripts = [
        "/assets/js/vendor/jquery-3.3.1.min.js",
        "/assets/js/games/blockrain/blockrain.jquery.min.js"
    ];

    constructor(module: GamesModule) {

        const self = this;

        this.scriptLoader = ScriptLoaderService.instance;
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        this.gamesModule = module;

        this.registerKeyboardInputs();
        this.render(() => {
            self.loadDependencies(() => {
                self.launch();
                module.destroy();
            });
        });
    }

    launch(): void {
        this.$game = (<any>$('#blockrain')).blockrain({
            playText: 'بازی تتریس',
            playButtonText: 'شروع',
            gameOverText: 'باختید',
            restartButtonText: 'شروع مجدد',
            scoreText: 'امتیاز',
            theme: 'retro'
        });
        // this.$game.blockrain('theme', 'custom');
        this.$game.blockrain('start');
    }

    private render(callback?): void {
        const self = this;
        const templatePromise = this.template.load('games', 'blockrain');
        this.template.render(templatePromise, {}, this.$el, 'html', function () {
            self.$el.fadeIn(100);
            if (typeof callback === 'function')
                callback();
        });
    }

    private registerKeyboardInputs(): void {
        const self = this;
        const stopParams = {key: 'blockrain.exit', title: 'خروج از بازی', icon: 'stop', button: true};
        this.input.addEvent('stop', false, stopParams, () => {
            self.destroy();
        });
    }

    private loadDependencies(callback?): void {
        const self = this;
        this.scripts.forEach((script) => {
            self.scriptLoader.loadScript('body', script, true).then(() => {
                if (typeof callback === 'function')
                    callback();
            });
        });
    }

    private destroy(): void {
        const self = this;
        this.unloadDependencies();
        this.input.removeEvent('stop', {key: '2048.stop'});
        this.$el.fadeOut(100, () => {
            self.$el.empty();
            self.gamesModule.reInit();
        });
    }

    private unloadDependencies(): void {
        const self = this;
        this.scripts.forEach((script) => {
            self.scriptLoader.unloadScript('body', script);
        });
    }
}