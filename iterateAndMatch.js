// Call function from test as findMatch(browser, randomDonation);
// randomDonation is a generated variable within the test, stored as a string

function findMatch(browser, randomDonation) {

    var tableDataToCompare;
    var counter = 1;
    var comparatorValue = "$" + randomDonation;
    browser.elements('css selector', 'td', function (result) {
        if (result.value) {
            tableDataToCompare = result.value;
            tableDataToCompare.forEach(function (cellValue) {
                counter++;
                browser.elementIdText(cellValue.ELEMENT, function (cellValueText) {
                    if (cellValueText.value == comparatorValue) {
                        console.log("Comparing: " + comparatorValue + " to... " + cellValueText.value);
                        console.log('I have found the matching random donation value.')
                        console.log(counter); // Ideally this is the <td> index where the data was matched. Untested.
                    }
                })
            })
        }
    });
}
