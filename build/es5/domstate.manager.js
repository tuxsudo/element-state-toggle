"use strict";

(function () {
    "use strict";
    var $$manager$defaults$$config = {

        commands: {
            set: "cmd.state.set",
            unset: "cmd.state.unset"
        },

        notices: {
            set: "state.set",
            unset: "state.unset"
        }

    };
    function $$manager$$init(config) {

        // shortcut to dispatch bubbling events
        var notify = function (elm, ev, data) {
            return elm.dispatchEvent(new CustomEvent(ev, { bubbles: true, detail: data }));
        },

        // function to prefix object keys with 'data-'
        prefix = function (str) {
            return "data-" + str;
        },

        // set attributes to emitting element (e.target)
        set = function (e) {

            Object.keys(e.detail).forEach(function attr(k) {
                e.target.setAttribute(prefix(k), e.detail[k]);
            });

            notify(e.target, config.notices.set, e.detail);
        },

        // unset attributes to emitting element (e.target)
        unset = function (e) {
            Object.keys(e.detail).forEach(function rem(k) {
                e.target.removeAttribute(prefix(k));
            });
            notify(e.target, config.notices.unset, e.detail);
        };

        // Listen at window level... (so bubble your shizness)
        window.addEventListener(config.commands.set, set);
        window.addEventListener(config.commands.unset, unset);
    }

    $$manager$$init($$manager$defaults$$config);
}).call(undefined);