const gql = require("graphql-tag");

const users = gql`
  {
    users {
        id
        name
        email
        cpf
        phone
        city
        uf
        address
        address_number
    }
  }
`;

const findUser = gql`
    query findUser($id: ID!){
      user(id: $id){
        name
        email
      }
    }
`;

module.exports = { users, findUser }