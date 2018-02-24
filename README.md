
# find-similar-packages

find packages similar to given one. Similarity is decided based on keyword matching.

- returns a promise
- default result size is 10

## Examples
1.	10 packages similar to 'express'
```js
var findSimilar = require('find-similar-packages');
findSimilar('express').then(function (packages) {
    console.log(packages); //[ 'loopback', 'express-generator', 'koa', ...]
}).catch(function (error) {
    console.log(error);
});
```

2.	5 packages similar to 'mongoose'
```js
var findSimilar = require('find-similar-packages');
findSimilar('mongoose', 5).then(function (packages) {
    console.log(packages); //[ 'js-data', 'mongolass', 'mongoskin', ...]
}).catch(function (error) {
    console.log(error);
});
```
