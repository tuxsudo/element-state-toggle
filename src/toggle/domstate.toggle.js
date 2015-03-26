/*

Polyfills: `CustomEvent` polyfill (IE9+)


*/


import { defaults } from './domstate.toggle.defaults';


function init( cfg ) {

    var config = cfg || defaults,
        
        // attribute to toggle passed by e.detail (or default value)
        _getattr = e => e.detail || config.attribute,

        // shortcut to dispatch bubbling events
        _dispatch = (elm, ev, data) => elm.dispatchEvent( new CustomEvent(ev, { bubbles: true, detail: data }) ),


    
    // callback to toggle the dispatched element
    function on(e) {
        var element = e.target,
            attribute = _getattr(e);

        element.setAttribute( attribute, 1 );
        _dispatch(element, config.notices.on, attribute);
    }


    function off(e) {

        var element = e.target,
            attribute = _getattr(e);

        element.removeAttribute( attribute );
        _dispatch(element, config.notices.on, attribute);
    }


    function toggle(e) {

        return e.target.hasAttribute( _getattr(e) ) ? off(e) : on(e);

    }


    window.addEventListener(config.commands.on, on);
    window.addEventListener(config.commands.off, off);
    window.addEventListener(config.commands.toggle, toggle);

}

export { init };
