import 'cypress-if';
import '../../../../support/commands.js'
import { OrderPage } from '../../../../support/locators.js';

describe('Create Order', () => {
const customers = [ 
    //เอาข้อมูลลูกค้ามาใส่ที่นี้
    "นายนภวิถี ทวีภัทรินกุล	0841435391	สาธุ นมัสเต สาธุ	บ.ไปรษณีย์ไทย จก.ถ.แจ้งวัฒนะ	ทุ่งสองห้อง	หลักสี่	กรุงเทพมหานคร	10210",
    "ณรงค์ชัย พงษ์นครสกุล	0816199388	ณรงค์ชัย พงษ์นครสกุล	126 / 41 ถนนเสนานิคม 1 ซอย 11 แยก 1	เสนานิคม	จตุจักร	กรุงเทพมหานคร	10900",
    "นายคณพศ	0819445911	Earth	188 / 9 ถนนเขางู	หน้าเมือง	เมืองราชบุรี	ราชบุรี	70000",
    "สมชาย โต๊ะกา	0851470594	ไอร่บัง บริกการรถตู้	55 / 3 หมู่ 2	หน้าไม้	ลาดหลุมแก้ว	ปทุมธานี	12140",
    "พิษ มัย	0657710543	พิษ มัย	155หมู่ 6	แพรกษาใหม่	เมืองสมุทรปราการ	สมุทรปราการ	10280"
]
before(() => {
    cy.loginUat();
    cy.goStore();
});
    it(`CheckList01: ลูกค้าใหม่, COD, ยังไม่ยืนยันจัดส่ง`, () => {
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