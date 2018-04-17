var appSections = require('./global/appSections');
var sections = appSections;

module.exports = {
    url: function(companyName) {
        var defaultCommunityName = 'shady-potatoes';
        companyName = companyName || defaultCommunityName;
        return this.api.launch_url + `companies/${companyName}/tax-receipts`;
    },
    sections: sections,
    commands: [{
        navigate: function(companyName){
            this.api.url(this.url(companyName));
            return this;
        },

        ifMultipleReceipts: function () {
            var pageObject = this;
            var multiReceiptDrop = (this.elements.multiReceiptDropdown.selector);

            // This checks the page for the presence of multiple tax receipt dropdown
            // If one is present, select the first option in the dropdown
            this.api.element('css selector', multiReceiptDrop, function (result) {
                if (result.value && result.value.ELEMENT) {
                    // Warn in console that data integrity is unclean
                    console.log("-- There were multiple tax receipts. Data may need to be reseeded!! Selecting first in list...");

                    // Select the first dropdown option
                    pageObject
                        .waitForElementVisible('@submit')
                        .click('@multiReceiptDropdown')
                        .click('@multiReceiptDropdownFirstUser');
                }
            });
            return this;
        }
    }],
    elements: {
        multiReceiptDropdown: 'select.corp-select-receipt',
        multiReceiptDropdownFirstUser: 'select option:nth-child(2)',
        submit: '.tools-page > div.tools-wrapper.f-right > form > button',
        downloadReceiptBtn: 'tr:nth-child(1) > td.last > button'

    }
};
