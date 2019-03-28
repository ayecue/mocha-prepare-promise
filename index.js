'use strict';

function defaultCallback () {
    return Promise.resolve();
}

function wait (callback = defaultCallback) {
    return new Promise((resolve, reject) => {
        const value = callback(resolve);

        if (value instanceof Promise) {
            value.then(resolve, reject);
        }
    });
}

function prepare (onPrepare, onUnprepare) {
    const Mocha = require('mocha');
    const nativeRunCallback = Mocha.prototype.run;

    Mocha.prototype.run = function (done) {
        const thisArg = this;

        wait(onPrepare).then(() => (
            nativeRunCallback.call(thisArg, (...args) => (
                wait(onUnprepare).then(() => done.apply(thisArg, args))
            ))
        ));
    };
}

module.exports = prepare;
