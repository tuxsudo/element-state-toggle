# Element State Toggle

An obnoxiously light-weight, event-driven, low-level, decoupled component which toggles on/off DOM elements' state(s).

What?!

Many user interaction patterns (tabs, pop-ups, drop-downs, pop-overs, etc.) work by toggling / animating between just two states -- on/off. Also, often other page elements need to react when such an element is triggered on/off.

This low-level component:

- saves the on/off state in an element's data-attribute: allowing for the states to be styled & animated between
- broadcasts state changes to all listening elements: allowing for simple and complex UI relationships between DOM elements with no coupling.


VanillaJS -- zero dependencies! Minified & gzipped: ~ 320 bytes!!


## Usage


### Commands (to toggle the state)

To trigger and element, the element should dispatch the following bubbling events:

- `cmd.state.toggle`
- `cmd.state.on`
- `cmd.state.off`


#### Example

```
var element = document.querySelector('.element');

element.dispatchEvent(
    new CustomEvent('cmd.state.toggle',
        { bubbles: true }
    )
);
```


### Notifications (when elements' state is toggled)

Subscribe to state changes by adding event listeners to the element for the following events 

- `state.on`
- `state.off`


#### Example

```
// An element that gets toggled on/off
var element = document.querySelector('.element');

// Another element that wants to know about toggled element
var stalker = document.querySelector("[data-stalk='.element']");

// when element is toggled on, add a class to the stalker
element.addEventListener('state.on', function(e) {
    console.log('state %s was turned on', e.detail);
    stalker.classList.add('target-is-on');
});

// when element is toggled off, remove a class to the stalker
element.addEventListener('state.off', function(e) {
    console.log('state %s was turned off', e.detail); 
    stalker.classList.remove('target-is-on');
});
```


## How elements' state is represented

When state is off, element has no data attribute

```
<div class="drop-down">...</div>
```

After being toggled on:
```
<div class="drop-down" data-state-on="1">...</div>
```

### example styling:

```
.drop-down {
    opacity: 0;
}

.drop-down[data-state-on] {
    opacity: 1;
    transition: opacity .3s linear;
}
```


## Options

To change the name of the attribute that's toggled, pass in the new name as the `events.detail`, eg:


```
// use 'data-dropdown-active' instead of 'data-state-on'

var element = document.querySelector('.element');

element.dispatchEvent(
    new CustomEvent('cmd.state.toggle',
        {
            bubbles: true,
            detail: 'data-dropdown-active'
        }
    )
);
```




## Brower Support

[Modern browsers](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Browser_compatibility) and IE9+ with [Polyfill](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill) for CustomEvent constructor.