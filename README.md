This project makes API test of the API listed in: https://gorest.co.in/

There are test cases of success and fails. As cypress only consider success API responses in ranges 2xx and 3xx, for ranges 4xx, the strategy was set to ignore status code in execution to be possible to do assertion to confirm the exactly 4xx code it was returned. 

10 scenarios to test API for users in the file CRUDTestingUsers.cy.js

TC1: method: GET. success case to get list of users. It is also saved info of one user of the list to be used as object to test the get user info detail.

TC2: method: GET. success case to get the user info detail. it is used the id saved in teh get list users.

TC3: method: GET. failed case. It is passing an invalid id to try to get the user detail. in this test, it is asserted that the response is 404.

TC4: method: POST. success case to try to create a new user. The id of this new user created is stored in a variable and this info will be used to parameter in some others tests, like get, update and delete.

TC5:method: GET. success case to get user info detail of the new user created.

TC6: method: POST. fail case to try to create a new user without pass the Bearer Token. The response returned is asserted as 401.

TC7: method: POST. fail case to try to create a new user passing info of one already existed user. The response returned is asserted as 422.

TC8: method: PUT. success case to try to update info of existed user.

TC9: method: DELETE. success case to delete one user.

TC10: method: PUT. fail case to try to update info of a deleted user. The response returned is asserted as 404.



10 scenarios to testing API for posts in the file CRUDTestingPosts.cy.js

For this API, it is necessary to exist one user, so this new user to test some test cases of the API is created in the hook before.

TC11 method: GET. success case to get the lsit of posts. it is also saved info of one fo tehs post of the lsit to be used in the get API for post info detail.  

TC12 method: GET. success case to get the post detail using the info saved by the get list.

TC13 method: GET. fail case. try to get a psot passsing invalida id. it is asserted that response is 404.

TC14 method: POST. success case to create a new post. to build this body, it is used id and name of the user created plus the info necessary to build the post itself.

TC15 method: GET. success case to get the detail of the post created by API POST.

TC16 method: POST. fail case to try to create a new post without pass a Bearer Token. It is asserted that the response is 401.

TC17 method: POST. fail case to try to create a new post with same info of one post that already exist. it is asserted that the response is 422.

TC18 method: PATCH. success case to update the text (identifyed as body) info of the object post.

TC19 method: DELETE. success case to delete a post.

TC20 method: PUT. fail case to try to update a psot that it was deleted. it is asserted the response 404.

