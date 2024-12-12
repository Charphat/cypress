//npx cypress run --spec "cypress/e2e/test.cy.js" 
import 'cypress-if';
import '../../../../support/commands.js'
import { OrderPage } from '../../../../support/locators.js';

describe('Create Order', () => {
    const customers = [
        "Tom Tom 0834609022	Tom Tom	เลขที่ 289 หมู่ 3 บ้องตี้ ไทรโยค กาญจนบุรี	71150"
    ]
    before(() => {
        cy.loginUat();
        cy.goStore();
    });
        it(`CheckList01: ลูกค้าใหม่, COD, ยังไม่ยืนยันจัดส่ง`, () => {
            const customer = customers[0];
            const startTime = performance.now();
            let waitTime = 0;          

            cy.get(OrderPage.topMenu).click();
            cy.get(OrderPage.subMenuOrder, { timeout: 10000 }).should('be.visible');
            cy.get(OrderPage.subMenuOrder).click();
            cy.get(OrderPage.createOrderButton, { timeout: 10000 }).should('be.visible');
            cy.get(OrderPage.createOrderButton).click();

            //check element
            cy.get('.modal-body > .card.mb-0 > .card-body > :nth-child(1) > :nth-child(1)', { timeout: 10000 }).should('be.visible'); //right body in create order modal
            cy.get('.card.mb-0 > .card-body > :nth-child(1) > :nth-child(2)', { timeout: 10000 }).should('be.visible'); //left body in create order modal
            cy.get(OrderPage.paymentCOD, { timeout: 10000 }).should('be.visible');
            cy.get(OrderPage.markAsConfirmOrder, { timeout: 10000 }).should('be.visible');
            cy.get(OrderPage.addressTextAreaField, { timeout: 10000 }).should('be.visible');
            cy.get(OrderPage.saveButton, { timeout: 10000 }).should('be.visible');
            cy.get(OrderPage.saveAndNewButton, { timeout: 10000 }).should('be.visible');
            cy.get(OrderPage.cancelButton, { timeout: 10000 }).should('be.visible');

            cy.get(OrderPage.addressTextAreaField).type(customer, { delay:50});
            cy.get(OrderPage.spreadAddressButton).click(), cy.wait(2000);
            cy.get(OrderPage.paymentCOD).click();

            cy.get('[data-test="btn-add-promotion"]').click();
            cy.get('.text-center > .btn-primary', { timeout: 10000 }).should('be.visible'); //choose prodct button
            cy.get('[data-test="product-Simple"]', { timeout: 10000 }).should('be.visible'); //check product modal
            cy.get('[data-test="product-Simple"]').click();

            cy.get('#table_product_promotion > .vuetable-wrapper > .dataTable > .vuetable-body-wrapper > .vuetable > .vuetable-body > [item-index="0"] > .vuetable-td-component-checkbox > input', { timeout: 10000 }).should('be.visible');
            cy.get('#table_product_promotion > .vuetable-wrapper > .dataTable > .vuetable-body-wrapper > .vuetable > .vuetable-body > [item-index="0"] > .vuetable-td-component-checkbox > input').click();
            cy.get('.text-center > .btn-primary').click(); //choose prodct button
            //save order
            cy.get('[data-test="btn-save-order"]').click();

            const endTime = performance.now();
            const duration = (endTime - startTime - waitTime) / 1000; // แปลงเป็นวินาทีและลบ waitTime
            cy.log(`Order creation took ${duration.toFixed(2)} seconds (excluding wait time)`);
        });

        // it(`Check#01 : New, COD, mark`, () => {
        //     const customer = customers[1];
        //   //check element order list page
        //     cy.get('.breadcrumb-line', { timeout: 10000 }).should('be.visible');
        //     cy.get('.datatable-header', { timeout: 10000 }).should('be.visible');
        //     cy.get('[data-test="btn-create-order"]', { timeout: 10000 }).should('be.visible');
            
        //     //start create order
        //     cy.get('[data-test="btn-create-order"]').click();
            
        //     //check element order create
        //     cy.get('.modal-body > .card.mb-0 > .card-body > :nth-child(1) > :nth-child(1)', { timeout: 10000 }).should('be.visible'); //right body in create order modal
        //     cy.get('.card.mb-0 > .card-body > :nth-child(1) > :nth-child(2)', { timeout: 10000 }).should('be.visible'); //left body in create order modal
        //     cy.get('[data-test="method-COD"]', { timeout: 10000 }).should('be.visible'); //cod button
        //     cy.get('[data-test="checkbox-confirm-cod"]', { timeout: 10000 }).should('be.visible'); //cod mark confirm
        //     cy.get('[data-test="address-text-area"]', { timeout: 10000 }).should('be.visible'); //adress flied(spread)
        //     cy.get('[data-test="btn-save-order"]', { timeout: 10000 }).should('be.visible'); //save button
        //     cy.get('[data-test="btn-save-order-and-addnew"]', { timeout: 10000 }).should('be.visible'); // save and new button
        //     cy.get('[data-test="btn-cancel-modal-create-order"]', { timeout: 10000 }).should('be.visible'); // cancel create button
            
        //     //start input data
        //     cy.get('[data-test="address-text-area"]').type(customer, { delay:50});
        //     cy.get('[data-test="spread-it"]').click(), cy.wait(2000); //spread address button
        //     cy.get('[data-test="method-COD"]').click(); //cod button
        //     //choose product
        //     cy.get('[data-test="btn-add-promotion"]').click();
        //     cy.get('.text-center > .btn-primary', { timeout: 10000 }).should('be.visible'); //choose prodct button
        //     cy.get('[data-test="product-Simple"]', { timeout: 10000 }).should('be.visible'); //check product modal
        //     cy.get('[data-test="product-Simple"]').click();
            
        //     cy.get('#table_product_promotion > .vuetable-wrapper > .dataTable > .vuetable-body-wrapper > .vuetable > .vuetable-body > [item-index="0"] > .vuetable-td-component-checkbox > input', { timeout: 10000 }).should('be.visible');
        //     cy.get('#table_product_promotion > .vuetable-wrapper > .dataTable > .vuetable-body-wrapper > .vuetable > .vuetable-body > [item-index="0"] > .vuetable-td-component-checkbox > input').click();
        //     cy.get('.text-center > .btn-primary').click(); //choose prodct button
            
        //     //save order
        //     cy.get('[data-test="btn-save-order"]').click();
        // })
});