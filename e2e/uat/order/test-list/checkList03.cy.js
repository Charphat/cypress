import 'cypress-if';
import '../../../../support/commands.js'
import { OrderPage } from '../../../../support/locators.js';

describe('Create Order', () => {
const customers = [ 
    //เอาข้อมูลลูกค้ามาใส่ที่นี้
    "สุนทร สาแก้ว	0817154598	สุนทร สาแก้ว	บ้านเลขที่ 3 ซอยลาซาล 54 ถนนสุขุมวิท 105	บางนา	บางนา	กรุงเทพมหานคร	10260",
    "นายกฤตพร สิมมา	0944806567	บีเอเอสเอส	โครงการอ่างเก็บน้ำหนองค้อ 183 / 55 ม.9	หนองขาม	ศรีราชา	ชลบุรี	20230",
    "ประจวบ จันทร์แจ่มศรี(NEW)	0809546287	ประจวบ จันทร์แจ่มศรี	ร้านลาบเป็ดอุดร เลขที่186 / 50 หมู่9 **ส่งสินค้าเป็นวันอาทิตย์**	โพธิ์เสด็จ	เมืองนครศรีธรรมราช	นครศรีธรรมราช	80000",
    "ศิลาแวว ทุ่งทอง	0935863949	ศิลาแวว ทุ่งทอง	บ้านเลขที่ 102/34 ซอยรณชัย 2 ถนน เศรษฐศิริ	สามเสนใน	พญาไท	กรุงเทพมหานคร	10400",
]
before(() => {
    cy.loginUat();
    cy.goStore();
});
    it(`CheckList03: ลูกค้าใหม่, COD, ยืนยันจัดส่ง`, () => {
        const customer = customers[0];

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

        //ใส่ข้อมูลลูกค้า, กดเลือก cod, กดหน้าเลือกสินค้า
        cy.get(OrderPage.addressTextAreaField).type(customer, { delay:50});
        cy.get(OrderPage.spreadAddressButton).click(), cy.wait(2000);
        cy.get(OrderPage.paymentCOD).click();
        cy.get(OrderPage.markAsConfirmOrder, { timeout: 10000}).should('be.visible').click();
        cy.get(OrderPage.productPromotionButton).click();

        //check element
        cy.get('.text-center > .btn-primary', { timeout: 10000 }).should('be.visible'); //choose product button
        cy.get(OrderPage.simpleTab, { timeout: 10000 }).should('be.visible'); //check product modal
        cy.get(OrderPage.simpleTab).click();

        //คลิกเลือกสินค้า, คลิกปุ่มเลือกสินค้า
        cy.get('#table_product_promotion > .vuetable-wrapper > .dataTable > .vuetable-body-wrapper > .vuetable > .vuetable-body > [item-index="0"] > .vuetable-td-component-checkbox > input', { timeout: 10000 }).should('be.visible');
        cy.get('#table_product_promotion > .vuetable-wrapper > .dataTable > .vuetable-body-wrapper > .vuetable > .vuetable-body > [item-index="0"] > .vuetable-td-component-checkbox > input').click();
        cy.get(OrderPage.chooseProductButton).click();

        //บันทึกออเดอร์
        cy.get('[data-test="btn-save-order"]').click();

        //ตรวจสอบโทสต์หลังบันทึกออเดอร์จะต้องแสดง ตามข้อความที่กำหนดเท่านั้น ถือว่าสร้างสำเร็จ
        cy.get('.toast-message').should('contain.text', 'สร้างคำสั่งซื้อเรียบร้อยแล้ว');
    });
});