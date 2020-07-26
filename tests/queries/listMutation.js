const gql = require("graphql-tag");

const createUser = gql`
    mutation createUser {
        createUser(
            name: "Teste2", 
            email: "emanuelleoliver11@gmail.com",
            cpf: "461.565.718-20",
            phone:	"11992454952",
            city: "São Paulo",
            uf: "SP",
            address: "Rua dos Turumãs",
            address_number: "217",
            cep: "04216-002",
            complement: "Apto 01"
            birth: "29/01/1998",
            password: "a2s1c2d"
        ){
            id
        }
    }
`;

const updateUser = gql`
    mutation updateUser($id: ID!){
        updateUser(id: $id, userInput: {
            name: "Anderson",
            email: "anderson@email.com.br"    
        }){
            name
            email
       }
    }
`;

const deleteUser = gql`
    mutation deleteUserById($id: ID!){
        deleteUserById(id: $id) {
            name
            email
        }
    }

`;

module.exports = { createUser, updateUser, deleteUser }