/*!
 * hotkeys-js v3.3.8
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
 * 
 * Copyright (c) 2018 kenny wong <wowohoo@qq.com>
 * http://jaywcjlove.github.io/hotkeys
 * 
 * Licensed under the MIT license.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.hotkeys = factory());
}(this, (function () {
    'use strict';

    var isff = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false;

    // Binding event
    function addEvent(object, event, method) {
        if (object.addEventListener) {
            object.addEventListener(event, method, false);
        } else if (object.attachEvent) {
            object.attachEvent('on' + event, function () {
                method(window.event);
            });
        }
    }

    // The modifier key is converted into the corresponding key code
    function getMods(modifier, key) {
        var mods = key.slice(0, key.length - 1);
        for (var i = 0; i < mods.length; i++) {
            mods[i] = modifier[mods[i].toLowerCase()];
        }
        return mods;
    }

    // Handling passed key strings into arrays
    function getKeys(key) {
        if (!key) key = '';

        key = key.replace(/\s/g, ''); // Matches any whitespace characters, including spaces, tabs, page breaks, etc.
        var keys = key.split(','); // Set multiple shortcuts at the same time, split by ','
        var index = keys.lastIndexOf('');

        // Shortcuts may contain ',' and require special handling
        for (; index >= 0;) {
            keys[index - 1] += ',';
            keys.splice(index, 1);
            index = keys.lastIndexOf('');
        }

        return keys;
    }

    // Compare arrays of modifier keys
    function compareArray(a1, a2) {
        var arr1 = a1.length >= a2.length ? a1 : a2;
        var arr2 = a1.length >= a2.length ? a2 : a1;
        var isIndex = true;

        for (var i = 0; i < arr1.length; i++) {
            if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
        }
        return isIndex;
    }

    var _keyMap = { // Special key
        backspace: 8,
        tab: 9,
        clear: 12,
        enter: 13,
        return: 13,
        esc: 27,
        escape: 27,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        del: 46,
        delete: 46,
        ins: 45,
        insert: 45,
        home: 36,
        end: 35,
        pageup: 33,
        pagedown: 34,
        capslock: 20,
        '⇪': 20,
        ',': 188,
        '.': 190,
        '/': 191,
        '`': 192,
        '-': isff ? 173 : 189,
        '=': isff ? 61 : 187,
        ';': isff ? 59 : 186,
        '\'': 222,
        '[': 219,
        ']': 221,
        '\\': 220
    };

    var KeyEvent = typeof window['KeyEvent'] !== 'undefined' ? window['KeyEvent'] : {};
/*
    KeyEvent.VK_ENTER = KeyEvent.VK_ENTER || 13;
    KeyEvent.VK_BACK = KeyEvent.VK_BACK || 461;

    KeyEvent.VK_LEFT = KeyEvent.VK_LEFT || 37;
    KeyEvent.VK_UP = KeyEvent.VK_UP || 38;
    KeyEvent.VK_RIGHT = KeyEvent.VK_RIGHT || 39;
    KeyEvent.VK_DOWN = KeyEvent.VK_DOWN || 40;

    KeyEvent.VK_RED = KeyEvent.VK_RED || 403;
    KeyEvent.VK_GREEN = KeyEvent.VK_GREEN || 404;
    KeyEvent.VK_YELLOW = KeyEvent.VK_YELLOW || 405;
    KeyEvent.VK_BLUE = KeyEvent.VK_BLUE || 406;

    KeyEvent.VK_0 = KeyEvent.VK_0 || 48;
    KeyEvent.VK_1 = KeyEvent.VK_1 || 49;
    KeyEvent.VK_2 = KeyEvent.VK_2 || 50;
    KeyEvent.VK_3 = KeyEvent.VK_3 || 51;
    KeyEvent.VK_4 = KeyEvent.VK_4 || 52;
    KeyEvent.VK_5 = KeyEvent.VK_5 || 53;
    KeyEvent.VK_6 = KeyEvent.VK_6 || 54;
    KeyEvent.VK_7 = KeyEvent.VK_7 || 55;
    KeyEvent.VK_8 = KeyEvent.VK_8 || 56;
    KeyEvent.VK_9 = KeyEvent.VK_9 || 57;

    KeyEvent.VK_PLAY = KeyEvent.VK_PLAY || 415;
    KeyEvent.VK_PAUSE = KeyEvent.VK_PAUSE || 19;
    KeyEvent.VK_STOP = KeyEvent.VK_STOP || 413;

    KeyEvent.VK_TOBEGIN = KeyEvent.VK_TOBEGIN || 423;
    KeyEvent.VK_TOEND = KeyEvent.VK_TOEND || 425;
    KeyEvent.VK_FAST_FWD = KeyEvent.VK_FAST_FWD || 417;
    KeyEvent.VK_REWIND = KeyEvent.VK_REWIND || 412;
    */
    var _HbbTVEvents = {
        red: KeyEvent.VK_RED || 403, // 116
        green: KeyEvent.VK_GREEN || 404, // 117
        yellow: KeyEvent.VK_YELLOW || 405, // 118
        blue: KeyEvent.VK_BLUE || 406, // 119

        left: KeyEvent.VK_LEFT || 37,
        up: KeyEvent.VK_UP || 38,
        right: KeyEvent.VK_RIGHT || 39,
        down: KeyEvent.VK_DOWN || 40,
        enter: KeyEvent.VK_ENTER || 13,
        return: KeyEvent.VK_ENTER || 13,
        back: KeyEvent.VK_BACK || 461,

        play: KeyEvent.VK_PLAY || 415,
        pause: KeyEvent.VK_PAUSE || 19,
        stop: KeyEvent.VK_STOP || 413,
        fast_fwd: KeyEvent.VK_FAST_FWD || 417,
        rewind: KeyEvent.VK_REWIND || 412
    };

    var _modifier = { // Modifier key
        '⇧': 16,
        shift: 16,
        '⌥': 18,
        alt: 18,
        option: 18,
        '⌃': 17,
        ctrl: 17,
        control: 17,
        '⌘': isff ? 224 : 91,
        cmd: isff ? 224 : 91,
        command: isff ? 224 : 91
    };
    var _downKeys = []; // Record the binding key under your arm
    var modifierMap = {
        16: 'shiftKey',
        18: 'altKey',
        17: 'ctrlKey'
    };
    var _mods = {16: false, 18: false, 17: false};
    var _handlers = {};

    // F1~F12 Special key
    for (var k = 1; k < 20; k++) {
        _keyMap['f' + k] = 111 + k;
    }

    // Compatible with Firefox
    // modifierMap[isff ? 224 : 91] = 'metaKey';
    // _mods[isff ? 224 : 91] = false;

    var _scope = 'all'; // Default hotkey range
    var isBindElement = false; // Whether to bind a node

    // Return key code
    var code = function code(x) {
        // if ($('#logs').length) {
        //     if ($('#logs p').length > 19) {
        //         $('#logs p:first').remove();
        //     }
        //     $('#logs').append('<p class="red">listen for: ' + x.toLowerCase() + '; which is: "' + _keyMap[x.toLowerCase()] + '", "' + _HbbTVEvents[x.toLowerCase()] + '", "' + x.toUpperCase().charCodeAt(0) + '"</p>');
        // }

        // IMPORTANT: Default hotkeys will listen to modifiers, but since we don't have any in HbbTV, I skip checking them
        // return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || _HbbTVEvents[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
        var keyCode = _keyMap[x.toLowerCase()] || _HbbTVEvents[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
        return keyCode;
    };

    // Set to get the current range (default is 'all')
    function setScope(scope) {
        _scope = scope || 'all';
    }

    // Get current range
    function getScope() {
        return _scope || 'all';
    }

    // Get the key value of the underlying binding key
    function getPressedKeyCodes() {
        return _downKeys.slice(0);
    }

    // Form control control judgment Returns Boolean
    function filter(event) {
        var target = event.target || event.srcElement;
        var tagName = target.tagName;
        // Ignore these cases, the shortcut key is invalid

        return !(tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA' || target.isContentEditable);
    }

    // Determine if the key under the key is a key, return true or false
    function isPressed(keyCode) {
        if (typeof keyCode === 'string') {
            keyCode = code(keyCode); // Convert to key code
        }
        return _downKeys.indexOf(keyCode) !== -1;
    }

    // Loop delete all scopes (scopes) in the handlers
    function deleteScope(scope, newScope) {
        var handlers = void 0;
        var i = void 0;

        // No scope specified, get scope
        if (!scope) scope = getScope();

        for (var key in _handlers) {
            if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
                handlers = _handlers[key];
                for (i = 0; i < handlers.length;) {
                    if (handlers[i].scope === scope) handlers.splice(i, 1); else i++;
                }
            }
        }

        // If scope is deleted, reset scope to all
        if (getScope() === scope) setScope(newScope || 'all');
    }

    // Clear modifier key
    function clearModifier(event) {
        /*
        var key = event.keyCode || event.which || event.charCode;
        var i = _downKeys.indexOf(key);

        // Clear pressed keys from the list
        if (i >= 0) _downKeys.splice(i, 1);

        // Modifier key shiftKey altKey ctrlKey (command||metaKey) clear
        if (key === 93 || key === 224) key = 91;
        if (key in _mods) {
            _mods[key] = false;

            // Reset modifier key to false
            for (var k in _modifier) {
                if (_modifier[k] === key) hotkeys[k] = false;
            }
        }
        */
    }

    // Unbind a range of shortcuts
    function unbind(key, scope, data) {
        var multipleKeys = getKeys(key);
        var keys = void 0;
        var mods = [];
        var obj = void 0;

        console.log('unbind', key, JSON.stringify(getKeys(key)), data.key);

        for (var i = 0; i < multipleKeys.length; i++) {
            // Split the combined shortcut into an array
            keys = multipleKeys[i].split('+');

            // Record the key code of the modifier key in each key combination Return array
            // if (keys.length > 1) mods = getMods(_modifier, keys);

            // Get the key value in addition to the modifier key
            key = keys[keys.length - 1];
            key = key === '*' ? '*' : code(key);

            // Determine whether the range is passed, if not, the range is obtained.
            if (!scope) scope = getScope();

            // How the key is not returned in _handlers and is not processed
            if (!_handlers[key]) return;

            // Empty the data in handlers,
            // After the trigger shortcut key is triggered, no event execution arrives to unlock the shortcut key.
            for (var r = 0; r < _handlers[key].length; r++) {
                obj = _handlers[key][r];
                // Determine if it is in range and the key value is the same
                if (obj.scope === scope && compareArray(obj.mods, mods)) {
                    _handlers[key][r] = {};
                }
            }
        }
    }

    // Handling the callback function that listens to the corresponding shortcut key
    function eventHandler(event, handler, scope) {
        var modifiersMatch = void 0;

        // See if it is in the current range
        if (handler.scope === scope || handler.scope === 'all') {
            // Check for matching modifiers (if true is returned)
            /*
            modifiersMatch = handler.mods.length > 0;
            for (var y in _mods) {
                if (Object.prototype.hasOwnProperty.call(_mods, y)) {
                    if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1)
                        modifiersMatch = false;
                }
            }
            */

            if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === '*') {
                // Call the handler, if it is a modifier key, it will not be processed.
                if (handler.method(event, handler) === false) {
                    if (event.preventDefault) event.preventDefault(); else event.returnValue = false;
                    if (event.stopPropagation) event.stopPropagation();
                    if (event.cancelBubble) event.cancelBubble = true;
                }
            }
        }
    }

    // Handling keydown events
    function dispatch(event) {
        var asterisk = _handlers['*'];
        var key = event.keyCode || event.which || event.charCode;
        // Collect bound keys
        if (_downKeys.indexOf(key) === -1) _downKeys.push(key);
        // Gecko (Firefox)'s command key value 224, consistent in Webkit (Chrome)
        // Webkit left and right command key values are different
        if (key === 93 || key === 224) key = 91;
        /*

                if (key in _mods) {
                    _mods[key] = true;

                    // Register the key of the special character to hotkeys
                    for (var k in _modifier) {
                        if (_modifier[k] === key) hotkeys[k] = true;
                    }

                    if (!asterisk) return;
                }

                // Bind the modifier key in the modifierMap to the event
                for (var e in _mods) {
                    if (Object.prototype.hasOwnProperty.call(_mods, e)) {
                        _mods[e] = event[modifierMap[e]];
                    }
                }
        */

        // Form control filter Default form control does not trigger shortcuts
        if (!hotkeys.filter.call(this, event)) return;

        // Get range defaults to all
        var scope = getScope();

        // Need to do any shortcuts
        if (asterisk) {
            for (var i = 0; i < asterisk.length; i++) {
                if (asterisk[i].scope === scope) eventHandler(event, asterisk[i], scope);
            }
        }
        // Key does not return in _handlers
        if (!(key in _handlers)) return;
        for (var _i = 0; _i < _handlers[key].length; _i++) {
            // Find processing content
            eventHandler(event, _handlers[key][_i], scope);
        }
    }

    function hotkeys(key, option, method, data) {
        var keys = getKeys(key); // List of shortcut keys to process
        var mods = [];
        var scope = 'all'; // Scope defaults to all, all ranges are valid
        var element = document; // Shortcut event binding node
        var i = 0;

        // Judging the setting range
        if (method === undefined && typeof option === 'function') {
            method = option;
        }

        if (Object.prototype.toString.call(option) === '[object Object]') {
            if (option.scope) scope = option.scope; // eslint-disable-line
            if (option.element) element = option.element; // eslint-disable-line
        }

        if (typeof option === 'string') scope = option;

        // Process for each shortcut
        for (; i < keys.length; i++) {
            key = keys[i].split('+'); // Button list
            mods = [];

            // If it is a combination shortcut to get a combination shortcut
            /*if (key.length > 1) mods = getMods(_modifier, key);*/

            // Convert unmodified keys to key codes
            key = key[key.length - 1];
            key = key === '*' ? '*' : code(key); // * indicates that all shortcuts are matched

            // Determine if the key is in _handlers, not an empty array
            if (!(key in _handlers)) _handlers[key] = [];

            _handlers[key].push({
                scope: scope,
                mods: mods,
                shortcut: keys[i],
                method: method,
                key: keys[i]
            });
        }
        // Set shortcuts on the global document
        if (typeof element !== 'undefined' && !isBindElement) {
            isBindElement = true;
            addEvent(element, 'keydown', function (e) {
                dispatch(e);
            });
            addEvent(element, 'keyup', function (e) {
                clearModifier(e);
            });
        }

        // console.log(data);
        console.log('bind', key, JSON.stringify(keys), data.key);
    }

    var _api = {
        setScope: setScope,
        getScope: getScope,
        deleteScope: deleteScope,
        getPressedKeyCodes: getPressedKeyCodes,
        isPressed: isPressed,
        filter: filter,
        unbind: unbind

        // , extendMap: extendMap
    };
    for (var a in _api) {
        if (Object.prototype.hasOwnProperty.call(_api, a)) {
            hotkeys[a] = _api[a];
        }
    }

    if (typeof window !== 'undefined') {
        var _hotkeys = window.hotkeys;
        hotkeys.noConflict = function (deep) {
            if (deep && window.hotkeys === hotkeys) {
                window.hotkeys = _hotkeys;
            }
            return hotkeys;
        };
        window.hotkeys = hotkeys;
    }

    return hotkeys;

})));
