//npx cypress run --spec "cypress/e2e/test.cy.js" 
import 'cypress-if';
import '../../../support/commands.js'

describe('Running order, COD', () => {
    const customers = [
      "คุณสราวุธ พ่วงวงษ์ (VIP)	0985387929	คุณสราวุธ พ่วงวงษ์ (VIP)	2 ม.3	หัวสำโรง	ท่าวุ้ง	ลพบุรี	15150",
      "คุณขวัญ (VIP)	0922495575	คุณขวัญ (VIP)	หมู่บ้าน วิเศษสุข โครงการ 16 496/87 หมู่ 2 ,	บ้านคลองสวน	พระสมุทรเจดีย์	สมุทรปราการ	10290"
    ];

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
        cy.intercept('GET', '**/api/v3/orders?*').as('orders');
        cy.visit('https://faketesting.uatgosaas.app/app/orders/index', { failOnStatusCode: false });
        cy.wait('@orders', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
          });
    });

    customers.forEach((customerAddress, index) => {
        it(`should create an order for customer ${index + 1}`, () => {

            cy.intercept('GET', '**/api/v1/service/order/create?sale_page_not_allow=true').as('createOrder');
            cy.get('[data-test="btn-create-order"]', { timeout: 10000 }).should('be.visible').click();
            cy.wait('@createOrder').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
              });
                cy.get('[data-test="channel-Facebook"] > .box-img > img', { timeout: 10000 }).should('be.visible').click();
                cy.get('[data-test="address-text-area"]', { timeout: 10000 }).should('be.visible').type(customerAddress,{delay:50});
                cy.intercept('GET', '**/api/v1/service/spread-address?*').as('spreadAddress');
                    cy.get('[data-test="spread-it"]').click(),cy.wait(2000); // spread address button
                    cy.wait('@spreadAddress').then((interception) => {
                        expect(interception.response.statusCode).to.eq(200);
                      });
                cy.get('#remotearea > .modal-dialog > .modal-content', { timeout: 10000 }).if('visible'),cy.wait(2000);
                cy.get('[data-test="select-carrier-flash-express"]', { timeout: 10000 }).if('visible').click();// in remotearea

            cy.get('[data-test="method-COD"]').click(),cy.wait(2000); // payment type
            
            // choose and use product
            cy.get('[data-test="btn-add-promotion"]').click();
            cy.get('[data-test="product-Simple"]').click(),cy.wait(2000);
            cy.get('#table_product_promotion > .vuetable-wrapper > .dataTable > .vuetable-body-wrapper > .vuetable > .vuetable-body > [item-index="0"] > .vuetable-td-component-checkbox > input').click(), cy.wait(2000); //เลือกสินค้า
            cy.get('.text-center > .btn-primary').click(),cy.wait(2000);
            cy.get('[data-test="btn-save-order"]').click(),cy.wait(2000); //save order button
            });
        });
    });