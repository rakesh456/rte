import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as serviceWorker from './serviceWorker';
import FxEditor from './components/RichTextEditor/rich-text-editor';

import {
    isUndefinedOrNull
} from "../src/utils/utils";

(function () {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        let evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

function trigger(elem, name, e) {
    // eslint-disable-next-line
    let func = new Function('e', 'with(document) { with(this) {' + elem.getAttribute(name) + '} }');
    func.call(elem, e);
}

//mock function
function resetRTEOptions(options) {

    return { ...options };
}

Array.prototype.forEach.call(
    document.getElementsByTagName('fx-editor'),
    (el) => {
        fxEditorRender(el);
    })

function fxEditorRender(el) {
    let options = JSON.parse(el.getAttribute('data-options'));
    console.log(options);
    options = (isUndefinedOrNull(options)) ? resetRTEOptions({}) : resetRTEOptions(options);

    el.getValues = function () {
        return FxEditorComponentInstance.getValues();
    }
    
    function onFocusHandler() {
        let ev = new CustomEvent('focus');
        el.dispatchEvent(ev);
    }
    
    function onChangeHandler() {
        let ev = new CustomEvent("change");
        el.dispatchEvent(ev);
    }

    function onBlurHandler() {
        let ev = new CustomEvent("blur");
        el.dispatchEvent(ev);
    }

    function onInputHandler(){
        let ev = new CustomEvent("input");
        el.dispatchEvent(ev);
    }

    el.refresh = function (){
        return FxEditorComponentInstance.refresh();
    }

    var FxEditorComponentElement = <FxEditor options={options} onFocus={onFocusHandler} onChange={onChangeHandler} onBlur={onBlurHandler} onInput ={onInputHandler}/>
    el.setValues = function (json) {
        FxEditorComponentInstance.setValues(json);
    }

    // eslint-disable-next-line
    var FxEditorComponentInstance = ReactDOM.render(
        FxEditorComponentElement,
        el
    )
}

serviceWorker.unregister();