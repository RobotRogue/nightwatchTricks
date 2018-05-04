// Call function from test as findMatch(browser, randomDonation);
// randomDonation is a generated variable within the test, stored as a string
// Intent is to find a match, and its corresponding TR index, and then do the following:
// click('tr:nth-child(' + indexPosition + ') .delete-recurring-money-transfer');

function findMatch(browser, randomDonation) {
    var tableDataToCompare;
    var comparatorValue = "$" + randomDonation;
    var indexPosition = 0;
    browser.elements('css selector', '#recurring-gifts-table tr', function (result) {
        if (result.value) {
            tableDataToCompare = result.value;
            tableDataToCompare.forEach(function (cellValue) {
                browser.elementIdText(cellValue.ELEMENT, function (cellValueText) {
                    if (cellValueText.value.includes(comparatorValue)) {
                        console.log("##### Found match of: " + comparatorValue + " to... " + cellValueText.value + " at position " + indexPosition + " #####");
                        return (indexPosition); // TODO: HOW DO I EXPORT THIS AS A VARIABLE THAT MY TEST CAN USE?
                    } else {
                        console.log("##### NO MATCH FOUND!! #####");
                    }
                    indexPosition++;
                })
            })
        }
    });
}
