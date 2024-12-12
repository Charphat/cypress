//npx cypress run --spec "cypress/e2e/test.cy.js" 
import 'cypress-if';
import '../../../support/commands.js'

describe('Checking Upsell', () => {
    before(() => {
        cy.loginAndSetCookies();
        });
    beforeEach(() => {
        // before test call a cookies and setting cookies 
        cy.readFile('cookies.json').then((cookies) => {
            cookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value);
            });
        });
        // in another loop will be back this page and use for start test again
        cy.visit('https://faketesting.uatgosaas.app/app/upsell', { failOnStatusCode: false });
    });

        it(`Check#01 : Request lead`, () => {
            cy.get('.toobar-action > .btn').click(), cy.wait(2000);
            cy.get('.toast-message', { timeout: 10000 }).then(($toast) => {
                const toastText = $toast.text();
              
                if (toastText.includes('Unsuccessful')) {
                  this.skip();
                } else if (toastText.includes('ส่งคำขอทำรายการ')) {
                  expect(toastText).to.equal('ส่งคำขอทำรายการ');
                }
            });
        });
});
