const { defineConfig } = require("cypress");

let userId
let selectedId
let selectedName
let selectedEmail
let selectedGender

let userName
let postId
let selectedPostId
let selectedUserId
let selectedTitle
let selectedBody

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
        },
        setPostId(id){
          postId = id
          return null
        },
        getPostId(){
          return postId
        },
        setSelectedPostId(id){
          selectedPostId = id
          return null
        },
        getSelectedPostId(){
          return selectedPostId
        },
        setselectedUserId(userId){
          selectedUserId = userId
          return null
        },
        getselectedUserId(){
          return selectedUserId
        },
        setselectedTitle(title){
          selectedTitle = title
          return null
        },
        getselectedTitle(){
          return selectedTitle
        },
        setselectedBody(text){
          selectedBody = text
          return null
        },
        getselectedBody(){
          return selectedBody
        },
        setUserName(user){
          userName = user
          return null
        },
        getUserName(){
          return userName
        }

      })
      return config
    },
  },
});
