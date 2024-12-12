//npx cypress run --spec "cypress/e2e/test.cy.js" 
import 'cypress-if';

describe('Running order, Bank', () => {
    const customers = [
        "สมศักดิ์ กมลเลิศ	0806672883	สมศักดิ์ กมลเลิศ	30 หมู่ 8	นิคมสร้างตนเอง	เมืองลพบุรี	ลพบุรี	15000",
        "นายอัษฎาวุฒิ อามาตย์	0639464998	🧡 อัษฎาวุฒิ  อามาตย์	ร้านกันตากานต์เจริญยนต์ 440 หมู่9	ฝายแก้ว	ภูเพียง	น่าน	55000",
        "พัดดี ดี	0810329657	พัดดี ดีนิน	132 หมุ่ 8	สันมะเค็ด	พาน	เชียงราย	57120",
        "น.ส.สุภาวดี บำรุง	0842515400	นิค' คคค	171 ม.2	นาท่อม	เมืองพัทลุง	พัทลุง	93000",
        "อรรณพ สิงหกาญจนา	0816847804	Annop Singh	เลขที่ 185,187,189 ซอยจันทน์ 16 ถนนจันทน์	ทุ่งวัดดอน	สาทร	กรุงเทพมหานคร	10120",
        "สายชล เพ็ชโต	0932659801	Saichol Pettoe	128 ม.6	หนองขุ่น	วัดสิงห์	ชัยนาท	17120",
        "อภิสิทธิ์ อ่อนทะศรี	0868476578	Aphisit Onthasri	54 / 76 ม.5	นาป่า	เมืองชลบุรี	ชลบุรี	20000",
        "วรรณา อินทรีย์สังวร	0862160386	บุญเรือง ดินขาว	บ้านเวียงเทิง 338 / 1	เวียง	เทิง	เชียงราย	57160",
        "ประพนธ์ หยังหลัง	0952169216	Praphon Yanglang	191 ม.4	ท่าข้าม	ปะเหลียน	ตรัง	92120",
        "เทพพิทักษ (VIP)	0897891439	เทพพิทักษ (VIP)	15 / 3 ม.6 ม.ธนทรัพย์	บางเชือกหนัง	ตลิ่งชัน	กรุงเทพมหานคร	10170",
        "คุณ สุรินทร์ ( เชฟต้น)	0952539385	สุรินทร์ บุญประยูร	132 ม.10	พังตรุ	พนมทวน	กาญจนบุรี	71140",
        "ช่างโอเล่	0813078741	แสนอิ่มศักดิ์ กิตติศัพท์ขจร	73 หมู่1	หนองบัว	พัฒนานิคม	ลพบุรี	15140",
        "คุณสันติ รัตนงาม	0808080935	คนแรงงาน หลังเขา	ที่อยู่ การไฟฟ้า​ส่วน​ภูมิภาค​อำเภอเว​ียงป่าเป้า​	ป่างิ้ว	เวียงป่าเป้า	เชียงราย	57170",
        "นายสรรพวีต ขาวสบาย	0818899712	ครัวพี่ใหญ่ สรรพวัต	ร้านระเบียงบัวครััวพี่ใหญ่ ซอยร่มเกล้า 23	คลองสามประเวศ	ลาดกระบัง	กรุงเทพมหานคร	10520",
        "เฮียใหญ่ แช่ลี่	0658153357	ชิน แซ่ลี้	205/30ถ.ประตูม้	เวียงเหนือ	เมืองลำปาง	ลำปาง	52000",
        "สมปอง สันทอง	0909644599	Sompong Pong	27/2 ม.7	หน้าพระธาตุ	พนัสนิคม	ชลบุรี	20140",
        "นายยุทธนา อภิลักษณ์ .	0994464149	นายยุทธนา อภิลักษณ์	( รับสินค้า จันทร์ 28/10 ) เลขที่ 400 การประปานครหลวง (ฝ่ายนวัตกรรมองค์กร) ถ.ประชาชื่น	ทุ่งสองห้อง	หลักสี่	กรุงเทพมหานคร	10210",
        "นายวชิระ นามสพร	0926870569	วชิระ นามสพร	5/28 หมู่ 1 บัวทองเคหะซอย 1	บางบัวทอง	บางบัวทอง	นนทบุรี	11110",
        "กิตติทัศน์ เปี่ยมสุวรรณ์	0890777493	kittithas piamsuwan	195 ซอยเพชรเกษม88	บางแคเหนือ	บางแค	กรุงเทพมหานคร	10160",
        "หมะแอหมานและ	0923796055	Maae Manlaeh	36 / 1 ม.7	ท่าประดู่	นาทวี	สงขลา	90160",
        "วีระพล ฤทธิขันธ์	0842599894	วัดป่าภูน้อย ดอยอภัย	วัดป่าภูน้อย	ภูสิงห์	สหัสขันธ์	กาฬสินธุ์	46140",
        "ชนะพล นพมาศ	0878944341	ชนะพล นพมาศ	5 / 13 ม.1	เกาะพยาม	เมืองระนอง	ระนอง	85000",
        "ถนอม เสนฤทธิ์	0814322551	ถนอม เสนฤทธิ์	35/13 หมู่2 ถนนจอมทอง	จอมทอง	จอมทอง	กรุงเทพมหานคร	10150",
        "ภูมินทร์ มณฑา(VIP)	0989925661	ภูมินทร์ มณฑา	276 หมู่2	สระพังลาน	อู่ทอง	สุพรรณบุรี	72220",
        "นุกูล สิทธิวัง(VIP)	0899733275	นุกูล สิทธิวัง	41 ม.7	นาทุ่ง	เมืองชุมพร	ชุมพร	86000"
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
        cy.visit('https://faketesting.uatgosaas.app/app/orders/index', { failOnStatusCode: false }), cy.wait(2000);
    });

    customers.forEach((customerAddress, index) => {
        // it(`should create an order for customer ${index + 1}`, () => {
        //     cy.get('[data-test="btn-create-order"]', { timeout: 10000 }).should('be.visible').click(), cy.wait(2000);

        //     cy.get('[data-test="channel-Facebook"] > .box-img > img').click(), cy.wait(2000);

        //     cy.get('[data-test="address-text-area"]').type(customerAddress), cy.wait(2000);
        //         cy.get('[data-test="spread-it"]').click(), cy.wait(2000); // spread address button

        //     cy.get('#remotearea > .modal-dialog > .modal-content', { timeout: 10000 }).if('visible'), cy.wait(2000);
        //         cy.get('[data-test="select-carrier-flash-express"]', { timeout: 10000 }).if('visible').click(), cy.wait(2000);// in remotearea

        //     cy.get('[data-test="method-Bank Transfer"]').click(), cy.wait(2000); // payment type
        //         cy.get('.v-switch-core').click(), cy.wait(2000);
            
        //     // choose and use product
        //     cy.get('[data-test="btn-add-promotion"]').click(), cy.wait(2000);
        //         cy.get('[data-test="product-Simple"]').click(), cy.wait(2000);
        //             cy.get('#table_product_promotion > .vuetable-wrapper > .dataTable > .vuetable-body-wrapper > .vuetable > .vuetable-body > [item-index="0"] > .vuetable-td-component-checkbox > input').click(), cy.wait(2000); //เลือกสินค้า
        //         cy.get('.text-center > .btn-primary').click(), cy.wait(4000);

        //     cy.get('[data-test="btn-save-order"]').click(), cy.wait(5000); //save order button
        // });


        it(`should create an order for customer ${index + 1}`, () => {
            cy.get('[data-test="btn-create-order"]', { timeout: 10000 }).should('be.visible').click();

            cy.get('[data-test="channel-Facebook"] > .box-img > img').click(), cy.wait(2000);

            cy.get('[data-test="address-text-area"]').type(customerAddress), cy.wait(2000);
                cy.get('[data-test="spread-it"]').click(), cy.wait(2000); // spread address button

            cy.get('#remotearea > .modal-dialog > .modal-content', { timeout: 10000 }).if('visible'), cy.wait(2000);
                cy.get('[data-test="select-carrier-flash-express"]', { timeout: 10000 }).if('visible').click(), cy.wait(2000);// in remotearea

            cy.get('[data-test="method-Bank Transfer"]').click(), cy.wait(2000); // payment type
                cy.get('[data-test="order-amount"]').type('600'), cy.wait(2000);
                    cy.get('[data-test="checkbox-confirm-payment"]').click(), cy.wait(2000);
            
            // choose and use product
            cy.get('[data-test="btn-add-promotion"]').click(), cy.wait(2000);
                cy.get('[data-test="product-Config"]').click(), cy.wait(2000);
                    cy.get('.vuetable-td-component-checkbox > .align-items-center').click(), cy.wait(2000);
                        cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(1) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
                        cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(2) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
                        cy.get('#table_row_product3 > .vuetable > .vuetable-body > :nth-child(3) > .vuetable-td-component-checkbox > input').click(), cy.wait(2000);
                cy.get('.text-center > .btn-primary').click(), cy.wait(4000);
                    
            cy.get('[data-test="btn-save-order"]').click(), cy.wait(5000); //save order button

            cy.get('.toast-message').should('contain.text', 'สร้างคำสั่งซื้อเรียบร้อยแล้ว');
        });
    }); 
});