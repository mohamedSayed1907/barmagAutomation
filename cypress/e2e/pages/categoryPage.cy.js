/// <reference types="cypress" />
import loginCmd from "../../support/login.cmd.js"

import categorySelectors from "../selectors/categorySeletors.sel.js"

require("cypress-xpath");
const apiUrl = Cypress.env('apiUrl')

export class CategoryPage {
 
    navigateToCategoryPage() {
    //cy.get(":nth-child(1) > button > svg", { timeout: 5000 }).click();
    cy.xpath(categorySelectors.categoryLinkXpath).first().click({timeout:5000});
  }

  navigateToSpecificCategory()
  {
    cy.get('nav.relative > :nth-child(1) > div > a > img').click();
      cy.get('.section-title').scrollIntoView().should("be.visible")
      
      cy.get(':nth-child(1) > .items-start > :nth-child(2) > span >').click()
   }
 
   loadButtonMore(xpathElement)
   {
  
     cy.xpath(xpathElement).then($button => {
       
         if ($button.is(':visible')){
           cy.xpath(xpathElement,{timeout:50000}).scrollIntoView().should('be.visible') 
   
           cy.xpath(xpathElement).click().then(()=>{
             if($button.is(':visible'))
             {
               this.loadButtonMore(xpathElement);
             }else{
               return;
             }
           }) 
           
          } else{
             return;
          }
 
       
     
 
     })
     
  
     // cy.get('.justify-center > .pixel-box--secondary-green',{timeout:5000}).scrollIntoView().should('be.visible') 
     // cy.get('.justify-center > .pixel-box--secondary-green').click();
   }



   
  async getTracksData() {
    let response = await fetch(
      `${apiUrl}/api/v2/course-packages`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
     return await response.json();
  }

  async getCoursesData() {
    let response = await fetch(
 
     
      `${apiUrl}/api/v2/courses?size=200&page=0`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
            
        },
      }
    );
    return await response.json();
    }

//************************************** */
async getSpecificCategoryData(id) {
  let response = await fetch(
    `https://barmag-admin.mdlabs-testing.net/api/v2/categories/${id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNjg3MjY4NzIyLCJleHAiOjE2ODczNTUxMjJ9.6XgmeyEr1Vz9dvrjYesIjrdkahAvdvlNjbYKw8rmpLA",
      },
    }
  );
   return await response.json();
}










}

