/*

Polyfill Required: `CustomEvent` polyfill (IE9+)

*/

// See domstate.toggle.defaults for structure of config
"use strict";

exports.init = init;
Object.defineProperty(exports, "__esModule", {
    value: true
});

function init(config) {

    // attribute to toggle passed by e.detail (or default value)
    var getattr = function (e) {
        return e.detail || config.attribute;
    },

    // shortcut to dispatch bubbling events
    dispatch = function (elm, ev, data) {
        return elm.dispatchEvent(new CustomEvent(ev, { bubbles: true, detail: data }));
    },

    // add attribute to emitting element (e.target)
    on = function (e) {
        var attribute = getattr(e);
        e.target.setAttribute(attribute, 1);
        dispatch(e.target, config.notices.on, attribute);
    },

    // remove attribute from emitting element (e.target)
    off = function (e) {
        var attribute = getattr(e);
        e.target.removeAttribute(attribute);
        dispatch(e.target, config.notices.on, attribute);
    },

    // toggle the attribute
    toggle = function (e) {
        return e.target.hasAttribute(getattr(e)) ? off(e) : on(e);
    };

    // delegate event listening to the window
    window.addEventListener(config.commands.on, on);
    window.addEventListener(config.commands.off, off);
    window.addEventListener(config.commands.toggle, toggle);
}