/// <reference types="cypress" />
import { RegisterPage } from "../pages/registerPage.cy.js";
import registerSelectors, { passwordError } from "../selectors/registerSelectors.sel.js"


const registerPage = new RegisterPage();

let phoneNumber
let phoneRandom
let email
let emailRandom 
let password;
let username;


describe("Register Test Cases", () => {
  beforeEach(()=>{
     cy.visit('/register?role=student')    
     phoneRandom = Math.random().toString().slice(2,10);
     emailRandom= Math.random().toString().slice(2,6);
     cy.wrap("محمد السيد").as("username")
     cy.wrap(`eng.mohamedsayed14+${emailRandom}@gmail.com`).as("email")
     cy.wrap(`011${phoneRandom}`).as("phone")
     cy.wrap("12345678").as("password")
     cy.get("@username").then((name)=>{
        username=name;
     })
     cy.get("@email").then((em)=>{
        email=em;
     })
     cy.get("@phone").then((phone)=>{
        phoneNumber=phone;
     })
 
     cy.get("@password").then((pass)=>{
        password=pass;
     })
 


  })

  it("Verify Register Ui",()=>{
    cy.get(registerSelectors.titleField).should("be.visible")
    .and("have.text","إنشاء حساب جديد")
    cy.get(registerSelectors.googleButton).should("be.visible")
    cy.get(registerSelectors.facebookButton).should("be.visible")
    cy.get(registerSelectors.emailField).should("be.visible")
    cy.get(registerSelectors.usernameField).should("be.visible")
    cy.get(registerSelectors.phoneField).should("be.visible")
    cy.get(registerSelectors.passwordField).should("be.visible")
    cy.get(registerSelectors.agreement).should("be.visible")
    cy.get(registerSelectors.registerButton).should("be.visible")
 


  })


it("Register Without Phone With Valid Data", () => {


    registerPage.registerUserWithoutPhone(username,email,password)
     cy.wait(3000)
     registerPage.assertRegisterSuccess()
     
  
 }); 
 it("Register With Phone With Valid Data", () => {

    registerPage.registerUserWithPhone(username ,email,phoneNumber,password)
     registerPage.assertRegisterSuccess()
     
  
 });
 it("Register Witn Invalid Email Format", () => {

 
    registerPage.registerWithInvalidEmail("mohamed sayed",'eng.mohamedsayed14',`011${phoneNumber}`,"12345678","format")  
 }); 
 it("Register Witn Exisiting Email", () => {
 
      registerPage.registerWithInvalidEmail("mohamed sayed",'eng.mohamedsayed14@gmail.com',`011${phoneNumber}`,"12345678","exist")
   }); 
   it("Register Witn Empty Email", () => {
 
      registerPage.registerWithInvalidEmail("mohamed sayed",'{backspace}',`011${phoneNumber}`,"12345678","empty")
 
   }); 

 
 
 it("Register With Password Less Than 8 Character", () => {
 
    registerPage.registerUserWithoutPhone("mohamed sayed",`eng.mohamedsayed14+${emailRandom}@gmail.com`,"1234")
     registerPage.assertErrorPasswordMessage()
     
  
 })

 it("Register With Empty Data", () => {
    registerPage.clickRegisterButton()
     registerPage.assertErrorEmptyDataMessage()    
  
 }); 
 
});


