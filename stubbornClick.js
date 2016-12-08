PDP.prototype.addItemToCart = function(browser) {
    this.browser
        .log('Adding item to cart')
        .waitForElementVisible(selectors.addItemButton)
        .execute(function() {
            setTimeout(function() {
                jQuery('.c-add-to-cart-button').click();
            }, 100);
        });
    return this;
};
