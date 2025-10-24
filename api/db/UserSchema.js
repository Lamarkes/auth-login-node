
const db = require('../db/config');

const createUserTable = async () =>{

    const userSchema = `

    CREATE TABLE IF NOT EXISTS users(
    
        id int UNIQUE NOT NULL,
        email VARCHAR(255) NOT NULL,
        doc_number VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        loggedin bool, 
        create_at Date,
        updated_at Date
    
    )
`;

await db.query(userSchema);

}

module.exports = userSchema;