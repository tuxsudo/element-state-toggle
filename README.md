# Element State Toggle

A light-weight, event-driven, low-level component to toggle DOM elements' state. 

Zero dependencies!


## Usage


### Commands (to toggle a the state)


```
var element = document.querySelector('.element');

element.dispatchEvent(new CustomEvent('cmd.state.toggle'));
element.dispatchEvent(new CustomEvent('cmd.state.on'));
element.dispatchEvent(new CustomEvent('cmd.state.off'));

```


### Notifications (when element is toggled)


```
var element = document.querySelector('.element');

element.addEventListener('state.on', function(e) {
    console.log('state %s was turned on', e.detail); 
});

element.addEventListener('state.off', function(e) {
    console.log('state %s was turned off', e.detail); 
});
```

### Support

IE9+ -- [Polyfill](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill) for CustomEvent constructor required.