describe('Testing API REST Go rest', () => {

  const SAMPLE_USER = require('../fixtures/sampleUser.json')
  const API_URL = Cypress.env('API_BASE_URL')
  const authorization = `Bearer ${Cypress.env('ACCESS_TOKEN')}`
  const invalid_id = 'aaa'

  it('TC1 GET: get list users', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}users`,
      headers: {authorization}

    }).then( ({ status, body, duration }) => {

      cy.task('setId', body[9].id)
      cy.task('setSelectedName', body[9].name)
      cy.task('setSelectedEmail', body[9].email)
      cy.task('setSelectedGender', body[9].gender)

      expect(body.length).to.eq(10)
      expect(status).to.eq(200)
      expect(duration).to.be.lessThan(1500)

    })  
  })


  it('TC2 GET: get the user selected in the get list', () => {
    cy.task('getId').then( (selectedId) => {
      cy.request({
        method: 'GET',
        url: `${API_URL}users/${selectedId}`,
        headers: {authorization}
  
      }).then( ({ status, body, duration }) => {
        const { name, email, gender } = body

        expect(status).to.eq(200)
          
        expect(duration).to.be.lessThan(1500)

        cy.task('getSelectedName').then ((selectedName) => {
          expect(name).to.eq(selectedName)
        })

        cy.task('getSelectedEmail').then ((selectedEmail) => {
          expect(email).to.eq(selectedEmail)
        })

        cy.task('getSelectedGender').then ((selectedGender) => {
          expect(gender).to.eq(selectedGender)
        })
  
      })
      
    })
    
  })


  it('TC3 GET: try to get a user passing an invalid id', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}users/${invalid_id}`,
      headers: {authorization},
      failOnStatusCode: false

    }).should( ({ status, body, duration }) => {
      const { message } = body
      
      expect(status).to.eq(404)
      expect(message).to.eq('Resource not found')
      expect(duration).to.be.lessThan(1500)
    })
  })



  it('TC4 POST: create a new user', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}users/`,
      headers: {authorization},
      body: Cypress.env('newUser')

    }).then( ({ status, duration, body }) => {
      cy.task('setUserID', body.id)
      expect(status).to.eq(201)
      expect(duration).to.be.lessThan(1500)
    })
  })

  it('TC5 GET: get the user created by its id', () => {
    cy.task('getUserId').then((userId) => {
      cy.request({
        method: 'GET',
        url: `${API_URL}users/${userId}`,
        headers: {authorization}
  
      }).should( ({ status, body, duration }) => {
        const { name, email, gender } = body
  
        expect(status).to.eq(200)
        expect(name).to.eq(Cypress.env('newUser').name)
        expect(email).to.eq(Cypress.env('newUser').email)
        expect(gender).to.eq(Cypress.env('newUser').gender)
        expect(duration).to.be.lessThan(1500)
  
      })
  
    })
  })  


  it('TC6 POST: try to create an user without passing Bearer Token', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}users/`,
      body: SAMPLE_USER,
      headers: {"authorization": 'Bearer  '},
      failOnStatusCode: false
    }).should( ({ status, duration }) => {
      
      expect(status).to.eq(401)
      expect(duration).to.be.lessThan(1500)
    })
  })

  
  it('TC7 POST: try to create a same already existed user', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}users/`,
      headers: {authorization},
      body: Cypress.env('newUser'),
      failOnStatusCode: false
    }).should( ({ status, duration }) => {
      
      expect(status).to.eq(422)
      expect(duration).to.be.lessThan(1500)
    })
  })


  it('TC8 PUT: update user\'s data', () => {
    cy.task('getUserId').then((userId) => {
      cy.request({
        method: 'PUT',
        url: `${API_URL}users/${userId}`,
        headers: {authorization},
        body: Cypress.env('userUpdate')

      }).should( ({ status, duration }) => {
      
        expect(status).to.eq(200)
        expect(duration).to.be.lessThan(1500)
      })
    })
  })


  it('TC9 DELETE: delete an user', () => {
    cy.task('getUserId').then((userId) => {

      cy.request({
        method: 'DELETE',
        url: `${API_URL}users/${userId}`,
        headers: {authorization}

      }).should( ({ status, duration }) => {
      
        expect(status).to.eq(204)
        expect(duration).to.be.lessThan(1500)
      })
    })
  })
 


  it('TC10 PUT: try to update user\'s data of a deleted user', () => {
    cy.task('getUserId').then((userId) => {
      cy.request({
        method: 'PUT',
        url: `${API_URL}users/${userId}`,
        headers: {authorization},
        body: Cypress.env('userUpdate'),
        failOnStatusCode: false

      }).should( ({ status, duration }) => {
      
        expect(status).to.eq(404)
        expect(duration).to.be.lessThan(1500)
      })
    })
  })


})