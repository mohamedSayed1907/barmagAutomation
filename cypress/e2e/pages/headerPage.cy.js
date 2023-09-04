/// <reference types="cypress" />


require('cypress-xpath');
import headerSelector from "../selectors/headerSelectors.sel.js"

export class HeaderPage {

    
  assertHeaderWhenUserLogout()
  {
    cy.xpath(headerSelector.loginButtonXpath).should("exist")
    .and("have.text"," دخول ");
    cy.xpath(headerSelector.registerButtonXpath).should("exist")
    .should("have.text"," تسجيل ")
  }
 
  assertHeaderWhenUserLoggedIn()
  {
    cy.xpath(headerSelector.profileButtoXpath).should("exist")
    .and("have.text","حسابي")
    cy.xpath(headerSelector.logoutButtonXpath).should("be.exist")
    .and("have.text"," خروج ")
  }  
  assertMainHeaderElements()
  {
      cy.xpath(headerSelector.logoXpath).should("be.visible")
      cy.get(headerSelector.homeLink).should("be.visible")
      cy.xpath(headerSelector.cartIconXpath).should("be.visible")
      cy.get(headerSelector.searchField).should("be.visible")
      cy.xpath(headerSelector.cartIconXpath).should("be.visible")
      cy.xpath(headerSelector.languageXpath).should("be.visible")


  }
  
  }
  