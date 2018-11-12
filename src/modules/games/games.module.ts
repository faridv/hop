import * as GamesConfig from './games.config.json';
import TemplateHelper from "../../_helpers/template.helper";
import Inputs from "../../app/inputs";
import Game2048 from '../games/2048/2048';

export default class GamesModule {

    private input;
    private template;
    private $el = $('#content');

    constructor(config?) {
        this.template = TemplateHelper.instance;
        this.input = Inputs.instance;
        const self = this;

        this.registerKeyboardInputs();
        this.renderList(GamesConfig);

        return this;
    }

    reInit() {
        this.registerKeyboardInputs();
        this.renderList(GamesConfig);
    }

    renderList(games, callback?) {
        const self = this;
        const templatePromise = this.template.load('modules', 'games');
        this.template.render(templatePromise, games, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(games);
        });
    }

    destroy(instance?: GamesModule): boolean {
        const self = typeof instance !== 'undefined' ? instance : this;
        self.input.removeEvent('up', {key: 'games.prev'});
        self.input.removeEvent('down', {key: 'games.next'});
        return true;
    }

    setActive(which: string): void {
        const $current = $('.game-items li.active');
        $current.removeClass('active');
        if (which === 'next') {
            if ($current.next().length) {
                $current.next().addClass('active');
            } else {
                $current.parents('ul:first').find('li:first').addClass('active');
            }
        } else {
            if ($current.prev().length) {
                $current.prev().addClass('active');
            } else {
                $current.parents('ul:first').find('li:last').addClass('active');
            }
        }
        const $activeElement = $('.game-items li.active');
        // $('.schedule-items').animate({
        //     scrollTop: $activeElement.position().top + $('.schedule-items').scrollTop() - 100
        // }, 500);
    }

    loadGame() {
        const $current = $('.game-items li.active');
        const game = $current.data('game').toString();
        let gameObject: any = null;
        switch(game) {
            case '2048':
                gameObject = Game2048;
                break;
        }
        const loadedGame = new gameObject();
    }

    registerKeyboardInputs() {
        const self = this;

        const upParams = {key: 'games.prev', title: 'بازی قبلی', icon: 'up', button: true};
        this.input.addEvent('up', false, upParams, () => {
            // Prev Program
            self.setActive('prev');
        });

        const downParams = {key: 'games.next', title: 'بازی بعدی', icon: 'bottom', button: true};
        this.input.addEvent('down', false, downParams, () => {
            // Next Program
            self.setActive('next');
        });

        const enterParams = {key: 'games.enter', title: 'انتخاب', icon: 'enter', button: true};
        this.input.addEvent('enter', false, enterParams, () => {
            // Next Day
            self.loadGame();
        });

    }
}
