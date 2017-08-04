'use strict';

const prepare = require('..');
const fs = require('fs');

const FILENAME = 'result.json';

global.prep = {
    DELAY: 500,
    MARGIN: 100,
    prepared: false,
    startAt: Date.now()
};

function setTimeoutAsync(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });
}

function unlinkAsync(filename) {
    return new Promise((resolve, reject) => {
        fs.unlink(filename, resolve);
    });
}

function writeFileAsync(filename, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, content, resolve);
    });
}

prepare(function () {
    console.log('prepare ...');

    return unlinkAsync(FILENAME)
        .then(() => setTimeoutAsync(global.prep.DELAY))
        .then(() => {
            console.log('done!');
            global.prep.prepared = true;
            global.prep.endAt = Date.now();
        });
}, function (done) {
    console.log('unprepare ...');

    return setTimeoutAsync(global.prep.DELAY).then(() => {
        console.log('done!');

        return writeFileAsync(FILENAME, JSON.stringify({success:true}));
    });
});

