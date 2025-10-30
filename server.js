
const app = require('./config/express')();

const port = app.get('port');
const userSchema = require('./config/db/UserSchema');


app.listen(port, ()=>{
    userSchema.createUsersTable();
    console.log(`Rodando na porta ${port}`)
});