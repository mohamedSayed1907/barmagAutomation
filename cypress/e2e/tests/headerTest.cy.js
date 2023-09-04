/// <reference types="cypress" />
 import { HeaderPage } from "../pages/headerPage.cy.js";
import { LoginPage } from "../pages/loginPage.cy.js";
import headerSelector from "../selectors/headerSelectors.sel.js"
import loginSelector from "../selectors/loginSelectors.sel.js"
import loginCmd from "../../support/login.cmd.js"

require('cypress-xpath');


const headerPage = new HeaderPage();
const loginPage = new LoginPage();



describe("Login Test Cases", () => {
  beforeEach(()=>{
    cy.visit("/")
    // cy.login().then((response)=>{
    //     console.log("userrrrrname: ",response.username)
    //     console.log("tokkkkkkkkkken: ",response.token)

    // });

   })

   it("contains correct elements when logged out",()=>{ 
    headerPage.assertHeaderWhenUserLogout();

   })
   it.only("contains correct elements when logged In",()=>{ 
    cy.xpath(loginSelector.openLoginPopmenuXpath).click()

    loginPage.loginUser("eng.mohamedsayed14+70@gmail.com","12345678")
    cy.xpath('//*[@id="__next"]/div[1]/div/div/div[1]/div/a/div/img').click();
   
    cy.wait(2000)
    
    headerPage.assertHeaderWhenUserLoggedIn();
   })  
    it("contains Main elements On Header",()=>{ 
    headerPage.assertMainHeaderElements();
   })
 
});


