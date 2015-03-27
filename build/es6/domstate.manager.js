/*

Prereq: Polyfill CustomEvent constructor (IE9+)

*/


// See manager.defaults for config structure
export function init(config) {

		// shortcut to dispatch bubbling events
	var notify = (elm, ev, data) => elm.dispatchEvent( new CustomEvent(ev, { bubbles: true, detail: data }) ),

		// function to prefix object keys with 'data-'
		prefix = str => 'data-' + str,

		// set attributes to emitting element (e.target)
		set = e => {

			Object.keys(e.detail).forEach( function attr(k) {
				e.target.setAttribute( prefix(k), e.detail[k] );
			});

			notify(e.target, config.notices.set, e.detail);
		},

		// unset attributes to emitting element (e.target)
		unset = e => {
			Object.keys(e.detail ).forEach( function rem(k) {
				e.target.removeAttribute( prefix(k) );
			});
			notify(e.target, config.notices.unset, e.detail );
		};


	// Listen at window level... (so bubble your shizness)
	window.addEventListener(config.commands.set, set);
	window.addEventListener(config.commands.unset, unset);

}
