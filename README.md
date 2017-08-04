# mocha-prepare-promise

Add global before/after hook to your Mocha test environment.

This solution is basically just "monkey patching" in mocha.

Original idea from [mocha-prepare](https://github.com/enobufs/mocha-prepare).

## Where to use

- running postgres docker container during your integration tests
- running service docker container during your integration tests
- prepare global data for test
- etc

## Installation
```
npm install mocha-prepare-promise --save-dev
```

## How to use

### Create file
```javascript
const prepare = require('mocha-prepare-promise');

prepare(
    //before hook
    function () {
        //run your async operations like for example starting a docker container
        return Promise.resolve();
    },
    //after hook
    function() {
        //end all your operations again for example stopping a docker container
        return Promise.resolve();
    }
);
```

### Use --require param of mocha
```
mocha 'files/to/tests.js' --require path/to/your/created/file
```

