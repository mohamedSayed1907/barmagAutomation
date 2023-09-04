Cypress.Commands.add('login', () => {
    const apiUrl = Cypress.env('apiUrl')
     const username = `eng.mohamedsayed14+70@gmail.com`
    const password = "12345678"
    let idToken;

    cy.request({
     
        url: `${apiUrl}/api/authenticate`,
        method: 'POST',
        body: {
        
                username: username,
                password: password
          
        }
    })
        .then((response) => {
            expect(response.status).to.eq(201)
         
           // window.localStorage.setItem('token', response.body.user.token)
           idToken=response.body.id_token
            cy.log('**user created**')
            cy.log(`**token: ${response.body.id_token}**`)

            cy.log(`**email: ${username}**`)
            cy.log(`**password: ${password}**`)
        })
        .then(() => ({
             username: username,
             token:idToken
          }))
})