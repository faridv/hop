import * as GamesConfig from './games.config.json';
import Game2048 from './2048/2048.game';
import BlockrainGame from "./blockrain/blockrain.game";
import {Module} from '../../libs/module';
import {MyComponent} from '../../_helpers/module.loader';

@MyComponent({
    template: './games.template.html'
})
export default class GamesModule extends Module {

    protected template = './games.template.html';
    protected events = {
        'games.prev': {control: 'up', key: 'games.prev', title: 'بازی قبلی', icon: 'up', button: true},
        'games.next': {control: 'down', key: 'games.next', title: 'بازی بعدی', icon: 'bottom', button: true},
        'games.enter': {control: 'enter', key: 'games.enter', title: 'انتخاب', icon: 'enter', button: true}
    };

    constructor(config?, layoutInstance?) {
        super(config, layoutInstance);
        const self = this;
        this.render(GamesConfig, () => {
            self.registerKeyboardInputs();
        });
        this.loadTemplate();
        return this;
    }

    reInit() {
        this.registerKeyboardInputs();
        this.render(GamesConfig);
    }

    render(games, callback?) {
        const template = require('./games.template.html');
        this.templateHelper.render(template, {items: games}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(games);
        });
    }

    setActive(which: string): void {
        const $current = $('.game-items li.active');
        let $el;
        this.templateHelper.removeClass('active', $current);
        if (which === 'next') {
            if ($current.next().length) {
                $el = $current.next();
            } else {
                $el = $current.parents('ul:first').find('li:first');
            }
        } else {
            if ($current.prev().length) {
                $el = $current.prev();
            } else {
                $el = $current.parents('ul:first').find('li:last');
            }
        }
        this.templateHelper.addClass('active', $el);
    }

    loadGame() {
        const $current = $('.game-items li.active');
        if ($current.length < 1) {
            return false;
        }
        const game = $current.attr('data-game').toString();
        let gameObject: any = null;
        switch (game) {
            case '2048':
                gameObject = Game2048;
                break;
            case 'blockrain':
                gameObject = BlockrainGame;
                break;
        }
        new gameObject(this);
    }

    registerKeyboardInputs() {
        const self = this;
        this.input.addEvent('up', false, this.events['games.prev'], () => {
            self.setActive('prev');
        });
        this.input.addEvent('down', false, this.events['games.next'], () => {
            self.setActive('next');
        });
        this.input.addEvent('enter', false, this.events['games.enter'], () => {
            self.loadGame();
        });
    }

}
