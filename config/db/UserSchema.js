
const db = require('./config');



async function createUsersTable() {
    try{
        const userSchema = `

    CREATE TABLE IF NOT EXISTS users(
    
        id int UNIQUE NOT NULL AUTO_INCREMENT,
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
   await db.execute(userSchema);
   console.log('Users table created or already exists.');
    } catch(err){
        console.error('Error creating users table:', err);
    }
}

module.exports = {
    createUsersTable
}