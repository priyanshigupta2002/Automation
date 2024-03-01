const { browser } = require('@wdio/globals')

module.exports = class Page {
    open (path) {
        return browser.url(`http://localhost/blues/mediawiki/index.php/Special:UserLogin`)
    }
}
