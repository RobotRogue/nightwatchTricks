var Popup = function(browser) {
    this.browser = browser;
};

Popup.prototype.closeIframe = function() {

    this.browser
        .log('Setting up iframe smasher...')
        .execute(function() {
            setInterval(function() {
                jQuery('iframe[id^=fcopt_container]').remove();
            }, 100);
        });

    return this;
};

module.exports = Popup;
