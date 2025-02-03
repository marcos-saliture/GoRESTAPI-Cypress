This project makes API test of the API listed in: https://gorest.co.in/

There are test cases of success and fails. As cypress only consider success API responses in ranges 2xx and 3xx, for ranges 4xx, the strategy was set to ignore status code in execution to be possible to do assertion to confirm the exactly 4xx code it was returned. 

10 scenarios to test API for users

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
