import Home from '../page-objects/home'
import PLP from '../page-objects/plp'
import PDP from '../page-objects/pdp'
import Cart from '../page-objects/cart'
import Checkout from '../page-objects/checkout'

let home
let plp
let pdp
let cart
let checkout

const lancomeURL = 'https://www.lancome-usa.com/on/demandware.store/Sites-lancome_us-Site/default/Default-Start?r=0'
// Sets variable taken from CircleCI
const PLP_ITEM_ROW = process.env.PLP_ITEM_ROW || 1

export default {
    before: (browser) => {
        home = new Home(browser)
        plp = new PLP(browser)
        pdp = new PDP(browser)
        cart = new Cart(browser)
        checkout = new Checkout(browser)
    },

    after: (browser) => {
        browser.end()
    },

    'Guest - Step 1 - Verify Homepage Elements': (browser) => {
        browser
            .preview(lancomeURL)
            .refresh()
            .log('Verifying main body')
            .waitForElementVisible(home.selectors.wrapper)
            .assert.visible(home.selectors.wrapper)
            .log('Verifying header')
            .waitForElementVisible(home.selectors.header)
            .assert.visible(home.selectors.header)
            .log('Verifying footer')
            .waitForElementVisible(home.selectors.footer)
            .assert.visible(home.selectors.footer)
    },

    'Guest - Step 2 - Navigate from Home to PLP': (browser) => {
        home.navToPLP()
        browser
            .log('Verify page landed on PLP')
            .waitForElementVisible(plp.selectors.plpBody)
            .assert.visible(plp.selectors.plpBody)
    },

    'Guest - Step 3 - Navigate from PLP to PDP': (browser) => {
        // Passes environment variable to function in plp.js file
        plp.navToPDP(PLP_ITEM_ROW)
        browser
            .log('Verifying page landed on PDP')
            .waitForElementVisible(pdp.selectors.pdpBody)
            .assert.visible(pdp.selectors.pdpBody)
    },

    'Guest - Step 4 - Add PDP Item to Cart': (browser) => {
        browser
            .waitForElementVisible(pdp.selectors.pdpAddToCartButton)
            .assert.visible(pdp.selectors.pdpAddToCartButton)
        pdp.addItemToCart()
    },

    'Guest - Step 5 - Navigate to Cart': (browser) => {
        browser
            .waitForElementVisible(pdp.selectors.pdpGoToCart)
            .assert.visible(pdp.selectors.pdpGoToCart)
        pdp.navigateToCart()
    },

    'Guest - Step 6 - Verify Cart Elements': (browser) => {
        browser
            .waitForElementVisible(cart.selectors.cartBody)
            .assert.visible(cart.selectors.cartBody)
            .waitForElementVisible(cart.selectors.cartItem)
            .assert.visible(cart.selectors.cartItem)
    },

    'Guest - Step 7 - Proceed to Checkout': (browser) => {
        browser
            .waitForElementVisible(cart.selectors.checkoutButton)
            .assert.visible(cart.selectors.checkoutButton)
        cart.navToCheckout()
    },

    'Guest - Step 8 - Select Payment Type - Credit Card': (browser) => {
        browser
            .waitForElementVisible(cart.selectors.paymentTypeCC)
            .assert.visible(cart.selectors.paymentTypeCC)
        cart.paymentTypeSelection()
    },

    'Guest - Step 9 - Select Product Sample': (browser) => {
        browser
            .waitForElementVisible(cart.selectors.sampleTiles)
            .assert.visible(cart.selectors.sampleTiles)
        cart.selectSample()
    },

    'Guest - Step 10 - Add Shipping and Billing and Payment Details': (browser) => {
        browser
            .waitForElementVisible(checkout.selectors.checkoutBody)
            .assert.visible(checkout.selectors.checkoutBody)
        checkout.fillShippingInfo()
        checkout.fillPaymentDetails()
    },

    'Guest - Step 11 - Verify Process Order Button is Active': (browser) => {
        browser
            // Do not Process Orders For Guest or Registered please!
            .waitForElementVisible(checkout.selectors.completeOrderButton)
            .assert.visible(checkout.selectors.completeOrderButton)
    }
}
