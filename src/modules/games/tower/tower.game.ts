import GamesModule from '../games.module';
import {ScriptLoaderService} from '../../../_services/script-loader.service';
import TemplateHelper from '../../../_helpers/template.helper';
import Inputs from '../../../app/inputs';
import * as $ from 'jquery';

export default class TowerGame {
    private gamesModule: GamesModule;
    private scriptLoader;
    private templateHelper;
    private template = './tower.template.html';
    private input;
    private $el = $('#fullscreen');
    private scripts = [
        "assets/js/games/tower/main.js",
        "assets/js/games/tower/zepto-1.1.6.min.js",
    ];

    constructor(module: GamesModule) {
        const self = this;
        this.scriptLoader = ScriptLoaderService.instance;
        this.templateHelper = TemplateHelper.instance;
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

    private launch(): void {
        let domReady, loadFinish, canvasReady, loadError, gameStart, game, score, successCount;
        // init window height and width
        let gameWidth = window.innerWidth;
        let gameHeight = window.innerHeight;
        const ratio = 1.5;
        if (gameHeight / gameWidth < ratio) {
            gameWidth = Math.ceil(gameHeight / ratio);
        }
        $('.content').css({"height": gameHeight + "px", "width": gameWidth + "px"});
        $('.js-modal-content').css({"width": gameWidth + "px"});

        // loading animation
        function hideLoading() {
            if (domReady && canvasReady) {
                $('#canvas').show();
                loadFinish = true;
                setTimeout(function () {
                    $('.loading').hide();
                    $('.landing').show();
                }, 1000)
            }
        }

        function updateLoading(status) {
            const success = status.success;
            const total = status.total;
            const failed = status.failed;
            if (failed > 0 && !loadError) {
                loadError = true;
                alert('Loading Failed! Try Again');
                return;
            }
            let percent = parseInt(String((success / total) * 100));
            if (percent === 100 && !canvasReady) {
                canvasReady = true;
                hideLoading();
            }
            percent = percent > 98 ? 98 : percent;
            $('.loading .title').text(percent + '%');
            $('.loading .percent').css({
                'width': percent + '%'
            });
        }

        function overShowOver() {
            $('#modal').show();
            $('#over-modal').show();
            $('#over-zero').show();
        }

        function overHideOver() {
            $('#modal').hide();
            $('#over-modal').hide();
            $('#over-zero').hide();
        }

        // game customization options
        const option = {
            width: gameWidth,
            height: gameHeight,
            canvasId: 'canvas',
            soundOn: true,
            setGameScore: function (s) {
                score = s;
            },
            setGameSuccess: function (s) {
                successCount = s;
            },
            setGameFailed: function (f) {
                $('#score').text(score);
                if (f >= 3) overShowOver();
            }
        };

        // game init with option
        function gameReady() {
            // @ts-ignore
            game = TowerGame(option);
            game.load(function () {
                game.playBgm();
                game.init();
            }, updateLoading);
        }

        gameReady();

        function indexHide() {
            $('.landing .action-1').addClass('slideTop');
            $('.landing .action-2').addClass('slideBottom');
            setTimeout(function () {
                $('.landing').hide();
            }, 950);
        }

        $(document).keypress(function (e) {
            if (e.which === 13) {
                // enter pressed
                if ($('#over-zero').css('display') !== 'none') {
                    overHideOver();
                    gameReady();
                    setTimeout(game.start, 400);
                } else {
                    if (gameStart) return;
                    gameStart = true;
                    indexHide();
                    setTimeout(game.start, 400);
                }
            }
        });
        // click event
        $('#start').on('click', function () {
            if (gameStart) return;
            gameStart = true;
            indexHide();
            setTimeout(game.start, 400);
        });

        $('.js-reload').on('click', function () {
            overHideOver();
            gameReady();
            setTimeout(game.start, 400);
        });

        // listener
        window.addEventListener('load', function () {
            domReady = true;
            hideLoading();
        }, false);
    }

    private render(callback?): void {
        const self = this;
        const template = require(`${this.template}`);
        this.templateHelper.render(template, {}, this.$el, 'html', function () {
            self.$el.fadeIn(100);
            if (typeof callback === 'function')
                callback();
        });
    }

    private registerKeyboardInputs(): void {
        const self = this;
        const stopParams = {key: 'tower.exit', title: 'خروج از بازی', icon: 'stop', button: true};
        this.input.addEvent('stop,s', false, stopParams, () => {
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
        this.input.removeEvent('stop,s', {key: 'tower.exit'});
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
