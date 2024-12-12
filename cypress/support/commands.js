// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// cypress/support/commands.js
import '../support/locators.js'
import { CrmPage, HomePage, LoginPage, OrderPage, ShipmentPage, StorePage } from '../support/locators.js';

Cypress.Commands.add('loginUat', () => {
  cy.visit('https://uatgosaas.app/login');
  // cy.visit('https://gosaas.app/login');
  cy.wrap([LoginPage.emailField, LoginPage.passwordField, LoginPage.loginButton]).each((field) => {
    cy.get(field, { timeout: 10000 }).should('be.visible');
  });
  cy.get(LoginPage.emailField).type('charphat.ntcp@gmail.com', { delay: 100 });
  cy.get(LoginPage.passwordField).type('S^83#b@v', { delay: 100 });
  cy.get(LoginPage.loginButton).click();
});

Cypress.Commands.add('goStore', () => {
  // cy.get('.slick-current > :nth-child(1) > .d-inline-block > :nth-child(2) > .card-body', {timeout: 10000}).should('be.visible');
  // cy.get('.slick-current > :nth-child(1) > .d-inline-block > :nth-child(2) > .card-body').click();
  cy.get(':nth-child(2) > .card-body', {timeout: 10000}).should('be.visible');
  cy.get(':nth-child(2) > .card-img-top', {timeout: 10000}).should('be.visible');
  cy.get(':nth-child(2) > .card-img-top').click()
  //confirm store
  cy.get(StorePage.confirmPopup, {timeout: 10000}).should('be.visible');
  cy.get(StorePage.confirmButton, {timeout: 10000}).should('be.visible'); 
  cy.get(StorePage.confirmButton).click()
  //Top menu have to visible 
  cy.get(HomePage.topMenu, {timeout: 10000}).should('be.visible');
  cy.get(OrderPage.topMenu, {timeout: 10000}).should('be.visible');
  cy.get(ShipmentPage.topMenu, {timeout: 10000}).should('be.visible');
  cy.get(CrmPage.topMenu, {timeout: 10000}).should('be.visible');
});