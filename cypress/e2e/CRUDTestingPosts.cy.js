describe('Testing API REST Go rest', () => {

    const SAMPLE_POST = require('../fixtures/samplePost.json')
    const API_URL = Cypress.env('API_BASE_URL')
    const authorization = `Bearer ${Cypress.env('ACCESS_TOKEN')}`
    const invalid_id = 'aaa'

    before('create a new user', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}users/`,
            headers: {authorization},
            body: Cypress.env('newUser2')
      
          }).then( ({ status, duration, body }) => {
            cy.task('setUserID', body.id)
            cy.task('setUserName', body.name)
            expect(status).to.eq(201)
            expect(duration).to.be.lessThan(2500)
          })
    
    })
  
    it('TC11 GET: get list posts', () => {
      cy.request({
        method: 'GET',
        url: `${API_URL}posts`,
        headers: {authorization}
  
      }).then( ({ status, body, duration }) => {
  
        cy.task('setSelectedPostId', body[9].id)
        cy.task('setselectedUserId', body[9].user_id)
        cy.task('setselectedTitle', body[9].title)
        cy.task('setselectedBody', body[9].body)
  
        expect(body.length).to.eq(10)
        expect(status).to.eq(200)
        expect(duration).to.be.lessThan(2500)
  
      })  
    })
  
  
    it('TC12 GET: get the post detail selected in the get list', () => {
      cy.task('getSelectedPostId').then( (selectedPostId) => {
        cy.request({
          method: 'GET',
          url: `${API_URL}posts/${selectedPostId}`,
          headers: {authorization}
    
        }).then( ({ status, body, duration }) => {         
  
          expect(status).to.eq(200)
            
          expect(duration).to.be.lessThan(2500)
  
          cy.task('getselectedUserId').then ((selectedUserId) => {
            expect(body.user_id).to.eq(selectedUserId)
          })
  
          cy.task('getselectedTitle').then ((selectedTitle) => {
            expect(body.title).to.eq(selectedTitle)
          })
  
          cy.task('getselectedBody').then ((selectedBody) => {
            expect(body.body).to.eq(selectedBody)
          })
    
        })
        
      })
      
    })
  
  
    it('TC13 GET: try to get a post passing an invalid id', () => {
      cy.request({
        method: 'GET',
        url: `${API_URL}posts/${invalid_id}`,
        headers: {authorization},
        failOnStatusCode: false
  
      }).should( ({ status, body, duration }) => {
        const { message } = body
        
        expect(status).to.eq(404)
        expect(message).to.eq('Resource not found')
        expect(duration).to.be.lessThan(2500)
      })
    })

  
    it('TC14 POST: create a new post', () => {
        cy.task('getUserId').then((userId) => {
            cy.task('getUserName').then((userName) => {
                cy.request({
                    method: 'POST',
                    url: `${API_URL}posts/`,
                    headers: {authorization},
                    body: { user: `${userName}`, user_id: `${userId}`, title: 'new post', body: 'this is a new post' }
    
                  }).then( ({ status, duration, body }) => {
                    cy.task('setPostId', body.id)
                    expect(status).to.eq(201)
                    expect(duration).to.be.lessThan(2500)
                  })
            })
        })
    })
      
  
    it('TC15 GET: get the post created by its id', () => {
      cy.task('getUserId').then((userId) => {
        cy.task('getPostId').then((postId) => {
            cy.request({
              method: 'GET',
              url: `${API_URL}posts/${postId}`,
              headers: {authorization}
        
            }).should( ({ status, body, duration }) => {
        
              expect(status).to.eq(200)
              expect(body.user_id).to.eq(userId)
              expect(body.title).to.eq('new post')
              expect(body.body).to.eq('this is a new post')
              expect(duration).to.be.lessThan(2500)
        
            })
        })
      })
    })  
  
  
    it('TC16 POST: try to create a post without passing Bearer Token', () => {
      cy.request({
        method: 'POST',
        url: `${API_URL}posts/`,
        body: SAMPLE_POST,
        headers: {"authorization": 'Bearer  '},
        failOnStatusCode: false
      }).should( ({ status, duration }) => {
        
        expect(status).to.eq(401)
        expect(duration).to.be.lessThan(2500)
      })
    })
  
    
    it('TC17 POST: try to create a same already existed post', () => {
        cy.task('getUserName').then((userName) => {
            cy.task('getUserId').then((userId) => {
                cy.request({
                    method: 'POST',
                    url: `${API_URL}posts/`,
                    headers: {authorization},
                    body:  `{ user: ${userName}, user_id: ${userId}, title: 'new post', body: 'this is a new post' }`,
                    failOnStatusCode: false
                }).should( ({ status, duration }) => {
                
                    expect(status).to.eq(422)
                    expect(duration).to.be.lessThan(2500)
                })
            })
        })
    })
  
  
    it('TC18 PATCH: update only the body of the post', () => {
      cy.task('getPostId').then((postId) => {
        cy.request({
          method: 'PATCH',
          url: `${API_URL}posts/${postId}`,
          headers: {authorization},
          body: `{ body: 'this is an updated text ' }`
  
        }).should( ({ status, duration }) => {
        
          expect(status).to.eq(200)
          expect(duration).to.be.lessThan(1500)
        })
      })
    })
  
  
    it('TC19 DELETE: delete a post', () => {
      cy.task('getPostId').then((postId) => {
  
        cy.request({
          method: 'DELETE',
          url: `${API_URL}posts/${postId}`,
          headers: {authorization}
  
        }).should( ({ status, duration }) => {
        
          expect(status).to.eq(204)
          expect(duration).to.be.lessThan(1500)
        })
      })
    })
   
  
  
    it('TC20 PUT: try to update post\'s data of a deleted post', () => {
        cy.task('getPostId').then((postId) => {
            cy.task('getUserId').then((userId) => {
                cy.task('getUserName').then((userName) => {
                    cy.request({
                        method: 'PUT',
                        url: `${API_URL}posts/${postId}`,
                        headers: {authorization},
                        body: { user: `${userName}`, user_id: `${userId}`, title: 'new post', body: 'this is a new post' },
                        failOnStatusCode: false
                    }).should( ({ status, duration }) => {
                  
                        expect(status).to.eq(404)
                        expect(duration).to.be.lessThan(1500)
                    })
                })
            })
        })
    })
  
  
})