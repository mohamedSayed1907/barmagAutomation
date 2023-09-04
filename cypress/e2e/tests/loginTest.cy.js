/// <reference types="cypress" />
import { LoginPage } from "../pages/loginPage.cy.js";
import loginSelector from "../selectors/loginSelectors.sel.js"
require('cypress-xpath');


const loginPage = new LoginPage();



describe("Login Test Cases", () => {
  beforeEach(()=>{
    cy.visit("/")
    cy.xpath(loginSelector.openLoginPopmenuXpath).click()

   })

  it("Login With Valid Data", () => {

    loginPage.loginUser("eng.mohamedsayed14+70@gmail.com","12345678");
    cy.wait(6000)
     loginPage.assertLoginSuccess();
 
}); 
it("Login With Invalid Email", () => {

  loginPage.loginUser("eng.mohamed","12345678");
  loginPage.assertErrorEmailMessage();

}); 

it("Login With Invalid Password", () => {
  loginPage.loginUser("eng.mohamedsayed@gmail.com","123");
  cy.wait(2000)

  loginPage.assertErrorPasswordMessage();

}); 
 
it("Login With Invalid Empty Data", () => {
  loginPage.clickLogin()

  loginPage.assertErrorEmptyDataMessage();

}); 
it("Verify The Ui Of Login Page", () => {
  cy.xpath(loginSelector.titleFieldXpath).should("be.visible")
  .and("have.text","تسجيل الدخول")
  cy.xpath(loginSelector.googleButton).should("be.visible")
  cy.xpath(loginSelector.facebookButton).should("be.visible")
  cy.get(loginSelector.loginPopupMenu).should("be.visible")
  loginPage.assetClosePopupMenu();
 

 
}); 

it("Verify Forget Password Link", () => {
  cy.xpath(loginSelector.forgetPasswordLinkXpath).click()
  cy.wait(3000)
 
  
    cy.url().then((urlForgetPassword)=>{
 
 expect(urlForgetPassword).equal("https://web-staging.barmg.com/forgot-password")
    })
   
 


 
}); 

});


