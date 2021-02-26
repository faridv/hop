import {Module} from '../../libs';
import {io} from 'socket.io-client'
import {ConfigHelper} from '../../_helpers';
import pollTemplate from './poll.template.html';
import itemTemplate from './poll-item.template.html';

export default class PollModule extends Module {

    private socket: any;
    private pusherPath = ConfigHelper.get('api').pusher;
    protected events = {
        'poll.1': {control: '1', title: '1'},
        'poll.2': {control: '2', title: '2'},
        'poll.3': {control: '3', title: '3'},
        'poll.4': {control: '4', title: '4'},
    };

    constructor(config?, layoutInstance?, moduleType?: string) {
        super(config, layoutInstance, moduleType);
        this.declareSocket();
        this.listenForMessages();
        // this.registerKeyboardInputs();
        this.load();
        return this;
    }

    load(): void {
        const self = this;
        this.templateHelper.loading();
        self.render({}, () => {
            // End loading
            self.templateHelper.loading(false);
        });
    }

    render(data: any = {}, callback?): void {
        this.templateHelper.render(pollTemplate, {items: data}, this.$el, 'html', function () {
            if (typeof callback === 'function')
                callback(data);
        });
    }

    private declareSocket(): void {
        this.socket = io(this.pusherPath);
    }

    private listenForMessages(): void {
        this.socket.on('message', (msg) => {
            console.log('message: ' + msg);
        });
        this.socket.on('command', (msg) => {
            this.handleCommands(msg);
            console.log('command: ' + msg);
        });
    }

    private handleCommands(msg: string) {
        const self = this;
        if (msg.indexOf('question:') !== -1) {
            this.destroyEvents(this);
            const command = msg.split(':')[1];
            if ($('#' + command).length) {
                $('.question-container').removeClass('show').removeClass('active');
                setTimeout(() => {
                    $('#' + command).addClass('show').addClass('active');
                    self.registerKeyboardInputs();
                }, 500);
            }
        }
    }

    registerKeyboardInputs() {
        const self = this;

        this.input.addEvent('1', false, this.events['poll.1'], () => {
            self.emitMessage('1')
        });

        this.input.addEvent('2', false, this.events['poll.2'], () => {
            self.emitMessage('2')
        });

        this.input.addEvent('3', false, this.events['poll.3'], () => {
            self.emitMessage('3')
        });

        this.input.addEvent('4', false, this.events['poll.4'], () => {
            self.emitMessage('4')
        });
    }

    private emitMessage(message: string): void {
        this.destroyEvents(this);
        this.socket.emit('message', message);
        $('.question-container').each((i, el) => {
            if ($(el).hasClass('active')) {
                const $currentQ = $(el);
                $currentQ.find('[data-id="' + message + '"]').addClass('selected');
                setTimeout(() => {
                    $currentQ.removeClass('active').removeClass('show');
                    setTimeout(() => {
                        $currentQ.find('[data-id="' + message + '"]').removeClass('selected');
                    }, 400);
                }, 1500);
            }
        });
    }

}
