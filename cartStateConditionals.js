const selectors = {
    cartBody: '.t-shopping-bag',
    cartItem: '.t-shopping-bag__products > .c-card',
    checkoutButton: '.t-checkout button',

    removeButton: 'button[name$=deleteProduct]',

    // Payment Pinny Selectors:
    paymentTypeCC: 'input[value=creditCard]',
    paymentContinueButton: '.c-sheet__content button.pw-button',
    // Alt name suggestion for continue button: 'button[name*=QA-payment-continue]'

    // Sample Page Selectors:
    sampleTiles: '.c-product-tile__radio',
    noSampleContinueButton: 'button.pw-button.c-button.c--primary.u-width-full',

    // Multiple Samples Promo Selectors:
    noToMultiSampleCheckbox: 'input[name=gwpDoNotInclude]',
    multiSampleContinueButton: '.js-sample-select-continue-checkout-button'
}

const cartURL = 'https://www.lancome-usa.com/cart'

const Cart = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

Cart.prototype.navToCheckout = function() {
    this.browser
        .log('Navigating to Checkout')
        .waitForElementVisible(selectors.checkoutButton)
        .click(selectors.checkoutButton)
        .waitUntilMobified()
}

Cart.prototype.paymentTypeSelection = function() {
    this.browser
        .log('Selecting Payment Type - Credit Card')
        .waitForElementVisible(selectors.paymentTypeCC)
        .click(selectors.paymentTypeCC)

        .log('Clicking Continue Button')
        .click(selectors.paymentContinueButton)
        .waitUntilMobified()
}

Cart.prototype.selectSample = function() {
    const self = this
    this.browser
        .log('Checking for Multiple Sample Selections')
        // For Promo Samples the flow is different to continue without
        // This checks for an element specific to GWP Samples
        .element('css selector', selectors.noToMultiSampleCheckbox, (result) => {
            if (result.value && result.value.ELEMENT) {
                self.browser
                    .log('Notice: GWP Multiple Sample Flow')
                    .waitForElementVisible(selectors.noToMultiSampleCheckbox)
                    .click(selectors.noToMultiSampleCheckbox)

                    .waitForElementVisible(selectors.multiSampleContinueButton)
                    .click(selectors.multiSampleContinueButton)
                    .waitUntilMobified()
            } else {
                self.browser
                    .log('Notice: Standard Sample Flow')

                    .waitForElementVisible(selectors.sampleTiles)
                    .log('Clicking Continue Without Samples Button')
                    .click(selectors.noSampleContinueButton)
                    .waitUntilMobified()
            }
        })
    return this
}

Cart.prototype.cleanupCart = function() {
    const self = this
    this.browser
        .url(cartURL)
        .waitForElementVisible(selectors.cartBody)
        .pause(2500)
        .log('Cleaning Up the Cart')
        .element('css selector', selectors.removeButton, (result) => {
            if (result.value && result.value.ELEMENT) {
                self.browser
                    .waitForElementVisible(selectors.removeButton)
                    .click(selectors.removeButton)
                    .waitUntilMobified()
                self.cleanupCart()
            } else {
                self.browser
                    .log('Nothing left to remove!')
            }
        })
    return this
}

export default Cart
