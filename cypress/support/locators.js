export const LoginPage = {
    emailField: ':nth-child(1) > .form-control',
    passwordField: ':nth-child(2) > .form-control',
    loginButton: '#LoginForm > :nth-child(4) > .btn'
};

export const StorePage = {
    confirmPopup: '.swal2-popup',
    confirmButton: '.swal2-confirm'
};

export const HomePage = {
    topMenu: ':nth-child(2) > .sidebar-content > .card > .nav-sidebar > :nth-child(1) > .nav-link'

};

export const OrderPage = {
    topMenu: '.nav-sidebar > :nth-child(3) > .cursor-pointer',
    subMenuOrder: '.nav-item-open > .nav > :nth-child(1) > .nav-link',
    subMenuOrderDrafts: '.nav-item-open > .nav > :nth-child(2) > .nav-link',
    addressTextAreaField: '[data-test="address-text-area"]',
    paymentCOD: '[data-test="method-COD"]',
    markAsConfirmOrder: '[data-test="checkbox-confirm-cod"]',
    simpleTab: '[data-test="product-Simple"]',

    //ปุ่มในหน้าสร้างออเดอร์
    createOrderButton: '[data-test="btn-create-order"]',
    spreadAddressButton: '[data-test="spread-it"]',
    saveButton: '[data-test="btn-save-order"]',
    saveAndNewButton: '[data-test="btn-save-order-and-addnew"]',
    cancelButton: '[data-test="btn-cancel-modal-create-order"]',
    productPromotionButton: '[data-test="btn-add-promotion"]',
    chooseProductButton: '.text-center > .btn-primary'
};

export const ShipmentPage = {
    topMenu: '.nav-sidebar > :nth-child(5) > .nav-link'
};

export const CrmPage = {
    topMenu: ':nth-child(7) > .cursor-pointer',
    subMenuUpsell: '.nav-item-open > .nav > :nth-child(1) > .nav-link',
    subMenuActivities: '.nav-item-open > .nav > :nth-child(2) > .nav-link'
};

export const ProductPage = {

};