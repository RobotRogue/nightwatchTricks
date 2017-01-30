// This function gets called from one of the (workflow).js files
// Passes in a parameter set in an environment variable, which we then pass to the selector

const selectors = {
    plpBody: '.c-product-list-content',
    pdpItem(itemRow) {
        const item = `.c-grid .c-grid__item:nth-child(${itemRow})`
        return item
    }
}

const PLP = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

PLP.prototype.verifyPLP = function() {
    this.browser
        .log('Checking for PLP content')
        .waitForElementVisible(selectors.plpBody)
}

PLP.prototype.navToPDP = function(item) {
    // Navigate from PLP to PDP
    this.browser
        .log('Navigating to PDP')
        .waitForElementVisible(selectors.pdpItem(item))
        .click(selectors.pdpItem(item))
        .waitUntilMobified()
}

export default PLP
