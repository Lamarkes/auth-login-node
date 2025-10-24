const db = require("../db/config");

function gerarToken(email, doc_number) {
  return Buffer.from(`${email}:${doc_number}`).toString("base64");
}

async function criarUsuario(user) {
  const { email, doc_number, password, username, full_name } = user;

  const [exists] = await pool.query(
    "SELECT * FROM users WHERE email = ? OR doc_number = ?",
    [email, doc_number]
  );
  if (exists.length > 0) {
    throw new Error("Usuário já existe.");
  }

  await pool.query(
    "INSERT INTO users (email, doc_number, password, username, full_name) VALUES (?, ?, ?, ?, ?)",
    [email, doc_number, password, username, full_name]
  );
  return generateToken(email, doc_number);
}
async function login(email, password) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) throw new Error('Email não encontrado.');
  const user = rows[0];

  if (user.password !== password) throw new Error('Senha incorreta.');

  await pool.query('UPDATE users SET loggedin = true WHERE id = ?', [user.id]);
  return generateToken(user.email, user.doc_number);
}

async function recoverPassword(document, email, new_password) {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE doc_number = ? AND email = ?',
    [document, email]
  );

  if (rows.length === 0) throw new Error('Usuário não encontrado.');

  await pool.query('UPDATE users SET password = ? WHERE id = ?', [
    new_password,
    rows[0].id,
  ]);

  return generateToken(email, document);
}

async function logout(token) {
  const [email, doc] = Buffer.from(token, 'base64').toString().split(':');
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ? AND doc_number = ?',
    [email, doc]
  );
  if (rows.length === 0) throw new Error('Token inválido.');

  await pool.query('UPDATE users SET loggedin = false WHERE id = ?', [rows[0].id]);
}

async function getUserData(token) {
  const [email, doc] = Buffer.from(token, 'base64').toString().split(':');
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ? AND doc_number = ?',
    [email, doc]
  );

  if (rows.length === 0) throw new Error('Token inválido.');
  return rows[0];
}

module.exports = {
  createUser,
  login,
  recoverPassword,
  logout,
  getUserData,
};