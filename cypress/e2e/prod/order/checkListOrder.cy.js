//npx cypress run --spec "cypress/e2e/test.cy.js" 
import 'cypress-if';

describe('Create Order', () => {
    const customers = require('../../../fixtures/customerData.js');
    before(() => {
        cy.visit('https://gosaas.app/login');
        cy.get(':nth-child(1) > .form-control').type('charphat.ntcp@gmail.com', { delay: 100 });
        cy.get(':nth-child(2) > .form-control').type('S^83#b@v', { delay: 100 });
        cy.get('#LoginForm > :nth-child(4) > .btn').click();
        cy.get('.slick-current > :nth-child(1) > .d-inline-block > :nth-child(2) > .card-img-top', { timeout: 10000 }).should('be.visible').click(), cy.wait(1000);
        cy.get('.swal2-confirm', { timeout: 10000 }).should('be.visible').click();
    });

    beforeEach(() => {
        // in another loop will be back this page and use for start test again
        cy.get('.nav-sidebar > :nth-child(3) > .cursor-pointer').should('be.visible').click();
        cy.get('.nav-item-open > .nav > :nth-child(1) > .nav-link').should('be.visible').click();
        cy.visit('https://playgroundofqa.gosaas.app/app/orders/index', { failOnStatusCode: false });
    });

        it(`Check#01 : New, COD, No mark`, () => {
            const customer = customers[0];

            
            
            cy.intercept('GET', '**/api/v1/service/order/create?sale_page_not_allow=true').as('createOrder');
            cy.get('[data-test="btn-create-order"]', { timeout: 10000 })  .should('be.visible')
            .and('not.be.disabled') // ตรวจสอบว่าปุ่มไม่ถูก disable
            .click();
            cy.wait('@createOrder').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
              });

            // cy.get('[data-test="channel-Facebook"] > .box-img > img').should('be.visible').click();
            cy.wait(2000);
            cy.get('[data-test="address-text-area"]').should('be.visible').type(customer);
                cy.get('[data-test="spread-it"]').should('be.visible').click(); // spread address button

        cy.get('#remotearea > .modal-dialog > .modal-content', { timeout: 10000 }).if('visible'), cy.wait(2000);
            cy.get('[data-test="select-carrier-flash-express"]', { timeout: 10000 }).if('visible').click();// in remotearea

            cy.get('[data-test="method-COD"]').should('be.visible').click(); // payment type

            // choose and use product
            cy.get('[data-test="btn-add-promotion"]').should('be.visible').click();
                cy.get('[data-test="product-Simple"]').should('be.visible').click();
                    cy.get('#table_product_promotion > .vuetable-wrapper > .dataTable > .vuetable-body-wrapper > .vuetable > .vuetable-body > [item-index="0"] > .vuetable-td-component-checkbox > input').click(), cy.wait(1000); //product
                    cy.get('.text-center > .btn-primary').should('be.visible').click();

            cy.get('[data-test="btn-save-order"]').should('be.visible').click(); //save order button

            cy.get('.toast-message').should('contain.text', 'สร้างคำสั่งซื้อเรียบร้อยแล้ว');
        });

        // it(`Check#02 : New, COD, Mark`, () => {
        //     const customer = customers[1];
        //     cy.get('[data-test="btn-create-order"]', { timeout: 10000 }).should('be.visible').click(), cy.wait(2000);
        //     cy.get('[data-test="channel-Facebook"] > .box-img > img').click(), cy.wait(2000);
        //     cy.get('[data-test="address-text-area"]').type(customer), cy.wait(2000);
        //         cy.get('[data-test="spread-it"]').click(), cy.wait(2000); // spread address button
        
        //     cy.get('#remotearea > .modal-dialog > .modal-content', { timeout: 10000 }).if('visible'), cy.wait(2000);
        //         cy.get('[data-test="select-carrier-flash-express"]', { timeout: 10000 }).if('visible').click(), cy.wait(2000);// in remotearea

        //     cy.get('[data-test="method-COD"]').click(), cy.wait(2000); // payment type
        //         cy.get('[data-test="checkbox-confirm-cod"]').click(), cy.wait(2000); 

        //     // choose and use product
        //     cy.get('[data-test="btn-add-promotion"]').click(), cy.wait(2000);
        //         cy.get('[data-test="product-Simple"]').click(), cy.wait(2000);
        //             cy.get('#table_product_promotion > .vuetable-wrapper > .dataTable > .vuetable-body-wrapper > .vuetable > .vuetable-body > [item-index="0"] > .vuetable-td-component-checkbox > input').click(), cy.wait(2000); //product
        //             cy.get('.text-center > .btn-primary').click(), cy.wait(4000);

        //     cy.get('[data-test="btn-save-order"]').click(), cy.wait(4000); //save order button

        //     cy.get('.toast-message').should('contain.text', 'สร้างคำสั่งซื้อเรียบร้อยแล้ว');
        // })

        // it(`Check#03 : New, BANK, No slip, No Mark`, () => {
        //     const customer = customers[2];
        //     cy.get('[data-test="btn-create-order"]', { timeout: 10000 }).should('be.visible').click(), cy.wait(2000);

        //     cy.get('[data-test="channel-Facebook"] > .box-img > img').click(), cy.wait(2000);

        //     cy.get('[data-test="address-text-area"]').type(customer), cy.wait(2000);
        //         cy.get('[data-test="spread-it"]').click(), cy.wait(2000); // spread address button

        //     cy.get('#remotearea > .modal-dialog > .modal-content', { timeout: 10000 }).if('visible'), cy.wait(2000);
        //         cy.get('[data-test="select-carrier-flash-express"]', { timeout: 10000 }).if('visible').click(), cy.wait(2000);// in remotearea

        //     cy.get('[data-test="method-Bank Transfer"]').click(), cy.wait(2000); // payment type
        //         cy.get('.v-switch-core').click(), cy.wait(2000);

        //     // choose and use product
        //     cy.get('[data-test="btn-add-promotion"]').click(), cy.wait(2000);
        //         cy.get('[data-test="product-Config"]').click(), cy.wait(2000);
        //             cy.get('.vuetable-td-component-checkbox > .align-items-center').click(), cy.wait(2000);
        //                 cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(1) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
        //                 cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(2) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
        //                 cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(3) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
        //                 cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(4) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
        //                 cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(5) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
        //         cy.get('.text-center > .btn-primary').click(), cy.wait(4000);

        //     cy.get('[data-test="btn-save-order"]').click(), cy.wait(4000); //save order button

        //     cy.get('.toast-message').should('contain.text', 'สร้างคำสั่งซื้อเรียบร้อยแล้ว');
        // })

        // it(`Check#04 : New, BANK, No slip, Mark`, () => {
        //     const customer = customers[3];
        //     cy.get('[data-test="btn-create-order"]', { timeout: 10000 }).should('be.visible').click(), cy.wait(2000);

        //     cy.get('[data-test="channel-Facebook"] > .box-img > img').click(), cy.wait(2000);

        //     cy.get('[data-test="address-text-area"]').type(customer), cy.wait(2000);
        //         cy.get('[data-test="spread-it"]').click(), cy.wait(2000); // spread address button

        //     cy.get('#remotearea > .modal-dialog > .modal-content', { timeout: 10000 }).if('visible'), cy.wait(2000);
        //         cy.get('[data-test="select-carrier-flash-express"]', { timeout: 10000 }).if('visible').click(), cy.wait(2000);// in remotearea

        //     cy.get('[data-test="method-Bank Transfer"]').click(), cy.wait(2000); // payment type
        //         cy.get('[data-test="order-amount"]').type('1000'), cy.wait(2000);
        //             cy.get('[data-test="checkbox-confirm-payment"]').click(), cy.wait(2000);

        //     // choose and use product
        //     cy.get('[data-test="btn-add-promotion"]').click(), cy.wait(2000);
        //         cy.get('[data-test="product-Config"]').click(), cy.wait(2000);
        //             cy.get('.vuetable-td-component-checkbox > .align-items-center').click(), cy.wait(2000);
        //                 cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(1) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
        //                 cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(2) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
        //                 cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(3) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
        //                 cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(4) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
        //                 cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(5) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
        //         cy.get('.text-center > .btn-primary').click(), cy.wait(4000);

        //     cy.get('[data-test="btn-save-order"]').click(), cy.wait(4000); //save order button

        //     cy.get('.toast-message').should('contain.text', 'สร้างคำสั่งซื้อเรียบร้อยแล้ว');
        // })
    });
