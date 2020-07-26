//const request = require('supertest');
const { app, connection } = require('../../src/app')
//const User = require('../../src/models/User')
const { client } = require('../ApolloClientGraphql')
const { users, findUser } = require('../queries/listQuery')
const { createUser, updateUser, deleteUser } = require('../queries/listMutation')

app.start();
var user = null
var userId = null

function setUserId(id) {
    userId = id
}

describe('CRUD Testing: User Schema', () => {

    it('Should create a user on DB', async () => {
        const createdUser = await client.mutate({
            mutation: createUser,
        });
        expect(createdUser).toBeTruthy();
        setUserId(createdUser.data.createUser.id)
        console.log("User ID created: " + userId)
    })

    it('should list all users on DB', async () => {
        const allUsers = await client.query({
            query: users,
        });
        expect(allUsers).toBeTruthy();
    })

    it('Should list created user on DB', async () => {
        const listCreatedUser = await client.query({
            query: findUser,
            variables: { id: userId },
        });
        expect(listCreatedUser).toBeTruthy();
        console.log("User name: " + listCreatedUser.data.user.name)
        console.log("User email: " + listCreatedUser.data.user.email)

    })

    it('Should update info on DB', async () => {
        const updatedUser = await client.mutate({
            mutation: updateUser,
            variables: { id: userId },
        });
        expect(updatedUser).toBeTruthy();
        console.log("New user name: " + updatedUser.data.updateUser.name)
        console.log("New user email: " + updatedUser.data.updateUser.email)
    })

    it('Should delete user from DB', async () => {
        const deletedUser = await client.mutate({
            mutation: deleteUser,
            variables: { id: userId },
        })
        expect(deletedUser).toBeTruthy();
    })
    // it('should list created user on DB', async () => {
    // })
});
