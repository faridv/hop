import * as $ from 'jquery';

/**
 * Developer tools, press 0 (by default) key four times to display developer tools
 * You can see console logs in special layer in the app.
 *
 * @author Mautilus s.r.o.
 * @class Developer
 * @singleton
 * @mixins Events
 */

export default class Developer {

    config = {
        debug: true,
        /**
         * @cfg {Boolean} active TRUE to active tools after start up
         */
        active: false,
        /**
         * @cfg {String} console URL address to the remote console
         */
        console: null,
        /**
         * @cfg {Boolean} consoleActive TRUE to connect to the remote console after start up (`active` must be set to TRUE)
         */
        consoleActive: true,
        /**
         * @cfg {String/Number} activationKey Name of actiovation key
         */
        activationKey: 'ZERO',
        /**
         * @cfg {Boolean} alertToConsole TRUE to redirect alert into console.log
         */
        alertToConsole: true,
        /**
         * @cfg {Number} limitStack Amount of records stored in a console stack (0 = unlimited)
         */
        limitStack: 0,
        /**
         * @cfg {Number} limitNetworkStack Amount of records stored in a network stack (0 = unlimited)
         */
        limitNetworkStack: 0
    };

    pressCount: number = 0;
    pressTime: number = 0;
    onScreenConsole: boolean = false;
    onScreenNetworkConsole: boolean = false;
    inputActive: boolean = true;
    inputBuffer: string = '';
    consoleStack: any = [];
    networkConsoleStack: any = [];
    _console: any = null;
    canAccessError: any;

    isActive: boolean;

    $el;
    $elContent;
    $elErrors;
    $elNetworkErrors;
    $elConnected;

    event_stack: any = null;
    key: any = {
        RIGHT: 39,
        LEFT: 37,
        UP: 38,
        DOWN: 40,
        RETURN: 8,
        ENTER: 13,
        PLAY: 415,
        PAUSE: 19,
        STOP: 413,
        FF: 417,
        RW: 412,
        RED: 403,
        GREEN: 404,
        YELLOW: 405,
        BLUE: 406,
        NUMERIC_ZERO: 0,
        ZERO: 96,
        ONE: 97,
        TWO: 98,
        THREE: 99,
        FOUR: 100,
        FIVE: 101,
        SIX: 102,
        SEVEN: 103,
        EIGHT: 104,
        NINE: 105,
        PUP: 33,
        PDOWN: 34,
        PRECH: 46, // Delete
        TXTMIX: 110 // ,Del
    };

    // $.extend(true, Developer, {
    /**
     * Init Developer object
     * @param {Object} [config={}] Developer configuration
     */
    constructor(config) {
        let onerror, scope = this;

        this.canAccessError = this.isErrorAvailable();
        this.configure(config);
        this.polyfillConsole();

        if (this.config.alertToConsole) {
            window.alert = function () {
                return console.log.apply(console, arguments);
            };
        }

        onerror = window.onerror;
        window.onerror = function (message, url, lineNumber) {
            if (typeof onerror === 'function') {
                onerror.apply(window, arguments);
            }
            scope.toConsole('error', arguments);
        };

        if (this.config.debug) {
            this.on('beforekey', this.onKeyDown, this);
            if (this.config.active) {
                $(function () {
                    scope.activate();
                });
            }
        } else {
            this.offConsole();
        }

        $(document).bind('keydown', function () {
            scope.onKeyDown.apply(scope, arguments);
        });
    }


    /**
     * Set class config hash
     *
     * @param {Object} config Hash of parameters
     */
    configure(config) {
        this.config = $.extend(true, this.config || {}, config);
    }


    /**
     * Polyfill console object if not present
     *
     * @private
     */
    polyfillConsole() {
        const scope = this;

        if (typeof window.console === 'undefined') {
            (<any>window).console = <Console>({
                debug: (message ?: string, ...optionalParams: any[]) => {
                },
                error: (message?: any, ...optionalParams: any[]) => {
                },
                info: (message ?: any, ...optionalParams: any[]) => {
                },
                log: (message?: any, ...optionalParams: any[]) => {
                },
                warn: (message?: any, ...optionalParams: any[]) => {
                }
            });

        } else if ((<any>window).console.polyfilled) {
            return;
        }

        if (!this.config.debug) {
            return;
        }

        (<any>window).console.polyfilled = true;
        (<any>window).console.__log = window.console.log;
        (<any>window).console.__warn = window.console.warn;
        (<any>window).console.__info = window.console.info;
        (<any>window).console.__error = window.console.error;

        window.console.log = function () {
            let args = Array.prototype.slice.call(arguments, 0);

            if (scope.canAccessError) {
                let stack = new Error().stack, allFiles = (stack ? stack.match(new RegExp("[_a-zA-Z0-9]*.js[^)]*", "g")) : []);
                let file = "";
                if (allFiles && allFiles.length >= 1 && typeof (allFiles[1]) !== "undefined") {
                    // only file + line number
                    file = allFiles[1].replace(new RegExp("(.*[/])([^:]+):([^:]+)(.*)", "g"), "$2 $3"); // first is console, second is a file
                    // remove part after ?
                    file = file.replace(new RegExp("([^?]+)[?]([^ ]+)[ ]?(.*)", "g"), "$1 $3");
                    // add to an array
                    args.push("[" + file + "]");
                }
            }

            scope.toConsole('log', args);
            return (<any>window).console.__log.apply(window.console, args);
        };

        (<any>window).console.warn = function () {
            scope.toConsole('warn', arguments);
            return (<any>window).console.__warn.apply(window.console, arguments);
        };

        (<any>window).console.info = function () {
            scope.toConsole('info', arguments);
            return (<any>window).console.__info.apply(window.console, arguments);
        };

        (<any>window).console.error = function () {
            scope.toConsole('error', arguments);
            return (<any>window).console.__error.apply(window.console, arguments);
        };

        (<any>window).console.network = function () {
            scope.toConsole('error', arguments);
            return (<any>window).console.__error.apply(window.console, arguments);
        };
    }


    /**
     * When debug mode is off, override console methods and turn off loggin
     *
     * @private
     */
    offConsole() {
        (<any>window).console = {
            log: function () {
            },
            warn: function () {
            },
            info: function () {
            },
            error: function () {
            },
            network: function () {
            }
        };
    }


    /**
     * Test, if the current browser / viewer supports error object.
     *
     * @private
     * @returns {Boolean}
     */
    isErrorAvailable() {
        try {
            const obj = new Error(), stack = obj.stack;
            return true;
        } catch (err) {
            return false;
        }
    }


    /**
     * Loading console
     * @private
     * @param {String} addr URL of the remote console script
     */
    loadConsole(addr) {
        const scope = this;
        const id = 'developer-remote-console';
        let s;

        if (document.getElementById(id)) {
            return;
        }

        s = document.createElement('script');
        s.id = id;
        s.src = addr;

        s.onload = function () {
            scope.updateNotifications();
        };

        document.head.appendChild(s);
    }

    activate() {
        const self = this;
        this.isActive = true;
        // window.setTimeout(() => {
        self.showUI();
        // }, 2000);
    }

    deactivate() {
        return null;
        alert('deactivate');
        this.isActive = false;
        this.pressCount = 0;
        this.onScreenConsole = false;
        this.hideUI();
    }

    toggle() {
        // alert('toggle: ' + this.isActive);
        if (this.isActive) {
            return null;
            this.deactivate();
        } else {
            this.activate();
        }
    }

    reload() {
        window.location.reload();
    }

    on(event_name, cb, scope, one = false) {
        if (typeof this.event_stack !== 'object' || this.event_stack === null) {
            this.event_stack = {};
        }

        if (!this.event_stack[event_name]) {
            this.event_stack[event_name] = [];
        }

        this.event_stack[event_name].push([scope || this, cb, one || false]);

        return this;
    }

    /**
     * Get textual value if give key
     *
     * @param {Number} keycode
     * @returns {String}
     */
    getTextValue(keycode) {
        if (keycode === this.key.ONE || keycode === 1) {
            return '1';
        } else if (keycode === this.key.TWO || keycode === 2) {
            return '2';
        } else if (keycode === this.key.THREE || keycode === 3) {
            return '3';
        } else if (keycode === this.key.FOUR || keycode === 4) {
            return '4';
        } else if (keycode === this.key.FIVE || keycode === 5) {
            return '5';
        } else if (keycode === this.key.SIX || keycode === 6) {
            return '6';
        } else if (keycode === this.key.SEVEN || keycode === 7) {
            return '7';
        } else if (keycode === this.key.EIGHT || keycode === 8) {
            return '8';
        } else if (keycode === this.key.NINE || keycode === 9) {
            return '9';
        } else if (keycode === this.key.ZERO || keycode === 0) {
            return '0';
        }

        return null;
    }

    /**
     * Handle keydown for Developer class.
     * @param {Number} keyCode Key code identification
     * @private
     */
    onKeyDown(keyCode, event, fromRC) {
        const scope = this;
        if (this.isActive) {
            if (document.activeElement && document.activeElement.nodeName === 'INPUT') {
                alert('000');
                return;
            }

            keyCode = ~~keyCode.originalEvent.key;
            if (this.inputActive) {
                if (!isNaN(Number(keyCode))) {
                    this.inputBuffer += this.getTextValue(keyCode);

                    this.showUI();

                }
                this.$elContent.find('.developer-ui-ip').text(this.inputBuffer);

                // return false;
            }


            if (keyCode === this.key.ZERO || keyCode === 0) {
                this.toggle();
                return false;
            } else if (keyCode === this.key.TWO || keyCode === 2) {
                this.uiToggleConsole();
                return false;
            } else if (keyCode === this.key.FIVE || keyCode === 5) {
                this.reload();
                return false;
            } else if (keyCode === this.key.PDOWN) {
                if (this.scollContent(1)) {
                    return false;
                }
            } else if (keyCode === this.key.PUP) {
                if (this.scollContent(-1)) {
                    return false;
                }
            }
        }

        if (this.pressTime && this.pressTime < (new Date().getTime() - 1500)) {
            this.pressCount = 0;
        }

        if (typeof this.config.activationKey === 'string' && keyCode === this.key[this.config.activationKey]) {
            this.pressCount += 1;
            this.pressTime = new Date().getTime();

        } else if (typeof this.config.activationKey === 'number' && keyCode === this.config.activationKey) {
            this.pressCount += 1;
            this.pressTime = new Date().getTime();

        } else {
            this.pressCount = 0;
        }

        if (this.pressCount === 4) {
            this.pressCount = 0;
            this.pressTime = 0;
            this.toggle();
        }
    }

    /**
     * Show developer UI
     *
     * @private
     */
    showUI() {
        const scope = this;
        if (!$("#developer-ui").length) {
            $('#developer').append('<div id="developer-ui"></div>');
            this.appendUIStyles();
        }

        this.$el = $("#developer-ui");
        this.$el.show();
        console.log(this.$el);
        this.$el.html('<div id="developer-ui-content" /><ul>'
            + '<li data-dev-action="toggle">[0] Hide</li>'
            + '<li data-dev-action="uiToggleConsole">[2] Console <span class="developer-ui-errors" /></li>'
            + '<li data-dev-action="reload">[5] Reload</li>'
            + '</ul>');

        this.$elContent = this.$el.find('#developer-ui-content');
        this.$elErrors = this.$el.find('.developer-ui-errors');
        this.$elNetworkErrors = this.$el.find('.developer-ui-network-errors');
        this.$elConnected = this.$el.find('.developer-ui-connected');

        this.$el.find('[data-dev-action]').bind('click', function () {
            const action = $(this).attr('data-dev-action');

            if (action && typeof scope[action] === 'function') {
                scope[action].call(scope);
            }

            return false;
        });

        this.updateNotifications();
        this.uiToggleConsole();
    }


    /**
     * Hide developer UI
     *
     * @private
     */
    hideUI() {
        return null;
        alert('hideUI');
        if (this.$el) {
            this.$el.hide().empty();
        }
    }


    /**
     * Show/Hide on-screen console. Reaction for key 2
     *
     * @private
     */
    uiToggleConsole() {
        this.$elContent.toggle();
        this.$elContent.empty();
        this.onScreenNetworkConsole = false;
        this.onScreenConsole = this.$elContent.is(':visible');
        this.renderConsole();
    }


    /**
     * Scroll up/down main content
     *
     * @param {Number} dir UP=-1 / DONW=1
     * @return {Boolean}
     */
    scollContent(dir) {
        if (this.$elContent.is(':visible')) {
            this.$elContent.scrollTop(this.$elContent.scrollTop() + (22 * dir));
            return true;
        }
    }


    /**
     * Rendering logs to the console
     *
     * @param {String} type Type of rendering (differences are in e.g. color)
     * @private
     */
    toConsole(type, args) {
        let line, t;

        args = Array.prototype.slice.apply(args);

        for (let i in args) {
            if (typeof args[i] === 'object') {
                try {
                    args[i] = JSON.stringify(args[i]); // fix problems with jquery objects in console.log (cyclic structures)
                } catch (error) {
                    args[i] = "";
                }
            }
        }

        t = new Date();
        line = $('<div class="line"><span class="t">' + (('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2) + ':' + ('0' + t.getSeconds()).slice(-2)) + '</span>'
            + Array.prototype.slice.apply(args).join((type == 'error' ? '\n' : '')).replace(/\&/g, '&amp;') + '</div>');

        if (type === 'warn') {
            line.css('color', 'yellow');

        } else if (type === 'info') {
            line.css('color', '#a6edff');

        } else if (type === 'error') {
            line.css('color', '#ff8484');
            line.isError = true;
        }

        if (this.config.limitStack && this.consoleStack.length >= this.config.limitStack) {
            this.consoleStack.splice(this.config.limitStack - 1, 10);
        }

        this.consoleStack.unshift(line);

        this.renderConsole();
    }

    renderConsole() {
        if (this.onScreenConsole) {
            this.$elContent.html(this.consoleStack);
        }

        this.updateNotifications();
    }


    /**
     * Notification updates
     *
     * @private
     */
    updateNotifications() {
        let errors = 0, networkErrors = 0;

        for (let i in this.consoleStack) {
            if (this.consoleStack[i].isError) {
                errors++;
            }
        }

        for (let i in this.networkConsoleStack) {
            if (this.networkConsoleStack[i].isError) {
                networkErrors++;
            }
        }

        if (errors > 0 && this.$elErrors) {
            this.$elErrors.text(errors).show();

        } else if (this.$elErrors) {
            this.$elErrors.text('0').hide();
        }

        if (networkErrors > 0 && this.$elNetworkErrors) {
            this.$elNetworkErrors.text(networkErrors).show();

        } else if (this.$elNetworkErrors) {
            this.$elNetworkErrors.text('0').hide();
        }

    }


    /**
     * CSS styles for developer console
     *
     * @private
     */
    appendUIStyles() {
        let s = document.createElement('style');
        let cssText = "\
#developer-ui {\
position: absolute;\
z-index: 9999999;\
bottom: 0;\
left: 0;\
right: 0;\
background: #000;\
background-color: rgba(0,0,0,0.6);\
color: #fff;\
padding: 10px;\
text-shadow: 1px 1px 2px #000;\
}\
#developer-ui #developer-ui-content {\
display: none;\
height:420px;\
white-space: pre-wrap;\
font-family: monospace, sans-serif;\
font-size: 16px;\
overflow: auto;\
direction: ltr;\
text-align: left;\
}\
#developer-ui #developer-ui-content div.developer-ui-ip {\
background: rgba(255,255,255,0.3);\
padding: 5px 10px;\
margin: 10px 0 0 0;\
width: 200px;\
height: 40px;\
line-height: 40px;\
font-size: 22px;\
}\
#developer-ui #developer-ui-content div.line {\
padding-left: 100px;\
margin-bottom: 4px;\
}\
#developer-ui #developer-ui-content span.t {\
float: left;\
margin-left: -100px;\
}\
#developer-ui ul {\
margin: 0;\
padding: 0;\
list-style: none;\
}\
#developer-ui ul li {\
cursor:pointer;\
position: relative;\
display: inline-block;\
vertical-align: top;\
margin-right: 20px;\
}\
#developer-ui ul li span {\
display: none;\
position: absolute;\
line-height: 14px;\
top: -6px;\
right: -11px;\
background: red;\
padding: 3px 5px;\
border-radius: 3px;\
color: #fff;\
}\
#developer-ui ul li span.developer-ui-connected {\
background: green;\
}\
";
        if (typeof (s.textContent) !== "undefined") {
            s.textContent = cssText;  // new style
        } else {
            s.innerText = cssText;   // old style - not supported by Firefox
        }

        document.head.appendChild(s);
    }

}
