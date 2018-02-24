const fetchKeys = require('fetch-package-keywords');
const top = require('top-packages-category-wise');

const topSelectSize = 20; // how many packages to fetch for given keyword/category
const defaultResultSize = 10;

function sortToArray(map) {
    var list = [], map2 = {}, maxIndex = 0;

    map.forEach(function (score, package) {
        var pa = map2[score];

        if (!pa)
            pa = [], map2[score] = pa;

        pa.push(package);

        if (score > maxIndex)
            maxIndex = score;
    });

    for (var i = maxIndex; i >= 1; i--) {
        var pa = map2[i];

        if (pa)
            Array.prototype.push.apply(list, pa);
    }

    return list;
}

module.exports = (package, size) => {
    return new Promise((resolve, reject) => {
        if (!size)
            size = defaultResultSize;

        var similar = new Map();

        fetchKeys(package).then(function (keys) {
            if (!keys || keys.length == 0)
                resolve([]);

            // got keywords for package
            var remainKeys = keys.length;

            keys.forEach(function (key) {

                top(key, topSelectSize).then(function (pkgs) {

                    pkgs.forEach(function (p) {
                        var existing = similar.get(p);
                        similar.set(p, existing ? ++existing : 1);
                    });

                    if (--remainKeys == 0) {
                        var result = sortToArray(similar);
                        result.splice(0, 1);
                        resolve(result.slice(0, size));
                    }
                });
            });
        }).catch((error) => { reject(error); });

    });
};


