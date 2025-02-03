const { defineConfig } = require("cypress");

let userId
let selectedId
let selectedName
let selectedEmail
let selectedGender

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        setUserID(id){
          userId = id
          return null
        },
        getUserId(){
          return userId
        },
        setId(id){
          selectedId = id
          return null
        },
        getId(){
          return selectedId
        },
        setSelectedName(name){
          selectedName = name
          return null
        },
        getSelectedName(){
          return selectedName
        },
        setSelectedEmail(email){
          selectedEmail = email
          return null
        },
        getSelectedEmail(){
          return selectedEmail
        },
        setSelectedGender(gender){
          selectedGender = gender
          return null
        },
        getSelectedGender(){
          return selectedGender
        }

      })
      return config
    },
  },
});
