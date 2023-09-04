/// <reference types="cypress" />
import registerSelectors from "../selectors/registerSelectors.sel.js"


require('cypress-xpath');

export class RegisterPage {

   
    setUsername(username) {
        cy.get(registerSelectors.usernameField, { delay: 50 }).type(username);
    }
 
    setEmail(email) {
        
        cy.get(registerSelectors.emailField, { delay: 50 }).type(email);
    }

    setPhone(phone) {
        cy.get(registerSelectors.phoneField ,{ delay: 50 }).type(phone);
    }
    setPassword(password) {
        cy.get(registerSelectors.passwordField, { delay: 50 }).type(password);
    }
    agreePrivacyAndPolicy()
    {
        cy.get(registerSelectors.agreement).click()

    }

    clickRegisterButton() {
        cy.wait(1000)
        cy.get(registerSelectors.registerButton).click({timeout:50000});
   
     }
     registerUserWithPhone(username , email, phone , password ) {
    
        this.setUsername(username)
        this.setEmail(email);
        this.setPhone(phone)
        this.setPassword(password);
        this.agreePrivacyAndPolicy()
        this.clickRegisterButton();     

}
    registerUserWithoutPhone(username , email, password ) {
    
            this.setUsername(username)
            this.setEmail(email);
            this.setPassword(password);
            this.agreePrivacyAndPolicy();
            this.clickRegisterButton();     
   
    }
    assertRegisterSuccess()
    {
        cy.get(registerSelectors.registerToastSuccess,{timeout:5000}).invoke("text").then((successMessage)=>{
            expect(successMessage).equal("تم ارسال رابط تفعيل الحساب بنجاح")

        })
    }

    assertErrorsEmailMessage(errorType)
    {
        if(errorType=="empty")
        {
            cy.get(registerSelectors.emailError).invoke("text").then((errorMessage)=>{
                 expect(errorMessage).equal("يجب إدخال  البريد الالكتروني")
                      })
        }else if(errorType=="format")
        {
 
            cy.get(registerSelectors.emailError).invoke("text").then((errorMessage)=>{
                expect(errorMessage).equal("البريد الإلكتروني  غير صحيح")
          

                      })

        }else if(errorType=="exist")
        {
 
            cy.get(registerSelectors.emailError).invoke("text").then((errorMessage)=>{
                expect(errorMessage).equal("هذا الحساب مستخدم من قبل ")
                      })
        }

        


    }
 
    assertErrorPasswordMessage()
    {
      cy.get(registerSelectors.passwordError,{timeout:3000}).invoke("text").then((errorMessage)=>{
        expect(errorMessage).equal("يجب أن  تتضمن كلمة المرور - في أقل تقدير -  على 8 أحرف.")
 
      })
    }
    assertErrorEmptyDataMessage()
    {
        cy.get(registerSelectors.usernameError).invoke("text").then((usernameErrorMessage)=>{
            expect(usernameErrorMessage).equal("يجب إدخال  اسم المستخدم")
    
          }) 
      cy.get(registerSelectors.emailError).invoke("text").then((emailErrorMessage)=>{
        expect(emailErrorMessage).equal("يجب إدخال  البريد الالكتروني")

      })   
      cy.get(registerSelectors.passwordError).invoke("text").then((passwordErrorMessage)=>{
        expect(passwordErrorMessage).equal("يجب إدخال  كلمة المرور")

      })   
     
      cy.get(registerSelectors.agreementError).invoke("text").then((privacyErrorMessage)=>{
        expect(privacyErrorMessage).equal("يجب عليك  الموافقة على الشروط و الاحكام")

      })   
    }

    registerWithInvalidEmail(username,email,phone,password,errorType)
    { 
        this.setUsername(username),
        this.setEmail(email),
        this.setPhone(phone),
        this.setPassword(password)
        this.agreePrivacyAndPolicy();
        this.clickRegisterButton();
        this.assertErrorsEmailMessage(errorType)

      
    }
  
  }
  