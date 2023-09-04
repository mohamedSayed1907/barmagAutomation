/// <reference types="cypress" />
require('cypress-xpath');

import { CategoryPage } from "../pages/categoryPage.cy";
import loginCmd from "../../support/login.cmd.js"
 const categoryPage = new CategoryPage();
 import categorySelectors from "../selectors/categorySeletors.sel.js"

let trackResponse=[];
let courseResponse=[];
let categoryID;
let page =0;

let publishedTracks;
let publishedCourses;
let relPackageCourses;
let specificCategoryData;
let publishTracksInSpecificCategory = [];
let publishCoursesInSpecificCategory = []
let token;

describe("category", () => {
  before( () => {
    cy.visit("/");
     categoryPage.navigateToCategoryPage();    
 
  });
 
  it("Validate The Tracks Count", async () => {
    trackResponse = await categoryPage.getTracksData();
     publishedTracks =trackResponse.filter((track=>track['status']=="PUBLISHED")); 
     if(publishedTracks.length>6)
     {
        categoryPage.loadButtonMore(`//*[@id="__next"]/div[1]/div[2]/div/div/div[3]/div/div[2]/button/p`)
    } 
    
  cy.xpath(categorySelectors.tracksContentXpath, { timeout: 5000 })
        .should("be.visible")
        .children()
        .then((trackLength) => {
            expect(trackLength.length).equal(publishedTracks.length)
    
        });
   
  });



  it("Validate The Tracks Name", async () => {
    trackResponse = await categoryPage.getTracksData();
    publishedTracks = trackResponse.filter((track=>track['status']=="PUBLISHED")); 
    //relPackageCourses = trackResponse["relPackageCourses"][1];
 
    if(publishedTracks.length>6)
    {
       categoryPage.loadButtonMore(`//*[@id="__next"]/div[1]/div[2]/div/div/div[3]/div/div[2]/button/p`);  
 
    } 
   
     for (let i = 0; i < publishedTracks.length; i++) {

      cy.xpath(`//*[@id="__next"]/div[1]/div[2]/div/div/div[3]/div/div/span[${i+1}]/div/div[2]/div/p`,{timeout:50000})
  
        .invoke("text")
          .then((text) => {
            expect(text).equals(publishedTracks[i]["titleAr"])

          });  
 
     }
  
 });

 it("Validate The Number of Courses On Each Track", async () => {
    trackResponse = await categoryPage.getTracksData();
    publishedTracks = trackResponse.filter((track=>track['status']=="PUBLISHED")); 
    //relPackageCourses = trackResponse["relPackageCourses"][1];
    cy.wait(2000)

    if(publishedTracks.length>6)
    {
       categoryPage.loadButtonMore(`//*[@id="__next"]/div[1]/div[2]/div/div/div[3]/div/div[2]/button/p`);  
       cy.wait(2000)

    } 
   
     for (let i = 0; i < publishedTracks.length; i++) {
  
          cy.xpath(`//*[@id="__next"]/div[1]/div[2]/div/div/div[3]/div/div[1]/span[${i+1}]/div/div[2]/div/button/p`,{timeout:50000}).should("be.visible").invoke("text").then((numOfCourses)=>{
            console.log(`Courses Web : ${numOfCourses}`);
            console.log(`Courses API : ${publishedTracks[i]["relPackageCourses"].length}`);
      
            expect(numOfCourses).contain(publishedTracks[i]["relPackageCourses"].length)
      
          }) 
    
     }
  
 });



 it("Validate The Courses Count", async () => {
  courseResponse = await categoryPage.getCoursesData();
  publishedCourses =courseResponse.filter((course=>course['status']=="PUBLISHED")); 
  if(publishedCourses.length>6)
  {  
       categoryPage.loadButtonMore(`//*[@id="__next"]/div[1]/div[2]/div/div/div[4]/div[2]/button`)
  } 
     cy.xpath('//*[@id="__next"]/div[1]/div[2]/div/div/div[4]/div[1]').children().then((allCourses)=>{
      expect(allCourses.length).equals(publishedCourses.length)
    })
});


it.only("Validate The Courses Data", async () => {
    courseResponse = await categoryPage.getCoursesData();
    publishedCourses =courseResponse.filter((course=>course['status']=="PUBLISHED")); 
    if(publishedCourses.length>6)
    {  
         categoryPage.loadButtonMore(`//*[@id="__next"]/div[1]/div[2]/div/div/div[4]/div[2]/button`)
    } 
 
  for (let i = 0; i < publishedCourses.length; i++) {
    cy.get(`:nth-child(${i+1}) > .course-card-body > .text-start > :nth-child(1) > .course-card-body-title`).invoke("text").then((text)=>{
      expect(text).equals(publishedCourses[i]["titleAr"])

    })
    }

});


// it("Validate The Specific Category Tracks",  () => {
//   categoryPage.navigateToSpecificCategory();
//   cy.xpath(`//*[@id="__next"]/div[1]/div[2]/div/div[1]/p`,{timeout:5000}).should("be.visible").then(()=>{
//     cy.url().then(async (categoryUrl)=>{
//        categoryID = categoryUrl.split("/")[4]
//    specificCategoryData = await categoryPage.getSpecificCategoryData(4)
// cy.xpath(`//*[@id="__next"]/div[1]/div[2]/div/div[2]/div`).invoke("text").then(($errorMsg)=>{
//    if($errorMsg==="")
//    {
//     publishTracksInSpecificCategory = specificCategoryData["coursePackages"].filter(((track=>track['status']=="PUBLISHED")))
//     cy.xpath(`//*[@id="__next"]/div[1]/div[2]/div/div[3]/div/div`).children().then((trackParent)=>{
//        for (let i = 0; i < trackParent.length; i++) {
//           cy.xpath(`//*[@id="__next"]/div[1]/div[2]/div/div[3]/div/div/span[${i+1}]/div/div[2]/div/p`).invoke("text").then((trackTitle)=>{
//             expect(trackTitle).contain(publishTracksInSpecificCategory[i]["titleAr"])

//           })
        
//        }

//     })

//    }else{
//     expect($errorMsg).contain("لا يوجد مسارات الان")
//   }
 
// })
  
//     })
    
//   })


// });


 
// it("Validate The Specific Category Courses",  () => {
//   categoryPage.navigateToSpecificCategory();
//   cy.xpath(`//*[@id="__next"]/div[1]/div[2]/div/div[1]/p`,{timeout:5000}).should("be.visible").then(()=>{
//     cy.url().then(async (categoryUrl)=>{
//        categoryID = categoryUrl.split("/")[4]
//    specificCategoryData = await categoryPage.getSpecificCategoryData(categoryID)
//     cy.xpath(`//*[@id="__next"]/div[1]/div[2]/div/div[4]`).children().then((ch)=>{
//       if(ch[1].innerText==="لا يوجد كورسات")
//       {
//         cy.xpath(`//*[@id="__next"]/div[1]/div[2]/div/div[4]/h3`).invoke("text").then((errorMsg)=>{
//           expect(errorMsg).contain("لا يوجد كورسات")
//         })
        


//       }else{

       
      
//         publishCoursesInSpecificCategory = specificCategoryData["courses"].filter((course=>course['status']=="PUBLISHED"));
//         let sortedCourses = publishCoursesInSpecificCategory.sort((r1, r2) => (r1.id > r2.id) ? 1 : (r1.id < r2.id) ? -1 : 0);
//         cy.xpath(`//*[@id="__next"]/div[1]/div[2]/div/div[4]/div[1]`).children().then((coursesChildern)=>{
//           if(coursesChildern.length>6)
//           {

//             categoryPage.loadCoursesMore()
//           }
//             for (let i = 0; i < coursesChildern.length; i++) {
//               cy.xpath(`//*[@id="__next"]/div[1]/div[2]/div/div[4]/div/div[${i+1}]/div/div[1]/a[1]/h3`).invoke("text").then((courseTitle)=>{
//                 expect(courseTitle).contain(sortedCourses[i]["titleAr"])
               

//               })
               
              
//             }
//         })
      
//         // for (let i = 0; i < publishCoursesInSpecificCategory.length; i++) {
//         //   cy.get(`:nth-child(${i+1}) > .course-card-body > .text-start > :nth-child(1) > .course-card-body-title`).invoke("text").then((text)=>{
//         //     expect(text).equals(publishedCourses[i]["titleAr"])
      
//         //   })
//         //   }

//       }

//     })
    

  
//     })
    
//   })

// /*



// */

  

// });



});
