'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var utils = {
    log: function log(data, status) {
        status && console.log(data);
    },
    logTitle: function logTitle(text) {
        console.log('%c ' + text, 'font-size:13px; color: red');
    }
};

exports.default = utils;