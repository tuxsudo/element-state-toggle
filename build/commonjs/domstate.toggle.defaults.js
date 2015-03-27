"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var config = {

	attribute: "data-state-on",

	commands: {
		on: "cmd.state.on",
		off: "cmd.state.off",
		toggle: "cmd.state.toggle"
	},

	notices: {
		on: "state.on",
		off: "state.off"
	}

};
exports.config = config;