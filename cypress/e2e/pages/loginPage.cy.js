/// <reference types="cypress" />


require('cypress-xpath');
import loginSelector from "../selectors/loginSelectors.sel.js"

export class LoginPage {

    
 
 
    setEmail(email) {
        cy.get(loginSelector.emailField).type(email);
    }
    setPassword(password) {
        cy.get(loginSelector.passwordField).type(password);
    }
    clickLogin() {
        cy.get(loginSelector.loginButton).click({timeout:50000});
    }
  
    loginUser(email, password) {
      this.setEmail(email);
      this.setPassword(password);
      this.clickLogin();
    }
    assertLoginSuccess()
    {
      cy.url({timeout:10000}).then((text)=>{
        expect(text).equal("https://web-staging.barmg.com/student/dashboard")
      
      })
    }

    assertErrorEmailMessage()
    {
      cy.xpath(loginSelector.emailErrorXpath).invoke("text").then((errorMessage)=>{
        console.log(errorMessage)
        expect(errorMessage).equal("الرجاء إدخال بريد إلكتروني صحيح")
 
      })
    }
    assertErrorPasswordMessage()
    {
      cy.get(loginSelector.loginError,{timeout:3000}).invoke("text").then((errorMessage)=>{
        expect(errorMessage).equal("يوجد خطا في الايميل او كلمه السر ")
 
      })
    }
    assertErrorEmptyDataMessage()
    {
      cy.xpath(loginSelector.emailErrorXpath).invoke("text").then((emailErrorMessage)=>{
        expect(emailErrorMessage).equal("يجب إدخال  بريد إلكتروني")

      })   
      cy.xpath(loginSelector.passwordErrorXpath).invoke("text").then((passwordErrorMessage)=>{
        expect(passwordErrorMessage).equal("يجب إدخال  كلمة المرور")

      })   
    }
    assetClosePopupMenu()
    {
      cy.xpath(loginSelector.closeIcon).click()
      cy.get(loginSelector.loginPopupMenu).should("be.hidden")
    }
  
  }
  