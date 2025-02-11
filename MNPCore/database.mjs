import mysql from "mysql2";

import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function get_user() {
  const [rows] = await pool.query("SELECT * FROM mnp_user");
  return rows;
}

export async function get_userbyname(name) {
  const [rows] = await pool.query(`SELECT * FROM mnp_user WHERE username = ?`, [
    name,
  ]);
  return rows;
}

export async function get_userbyid(user_id) {
  const [rows] = await pool.query(`SELECT * FROM mnp_user WHERE user_id = ?`, [
    user_id,
  ]);
  return rows;
}

export async function get_artistbyid(user_id) {
  const [rows] = await pool.query(`SELECT * FROM mnp_artist WHERE user_id = ?`, [
    user_id,
  ]);
  return rows;
}

export async function get_managerbyid(user_id) {
  const [rows] = await pool.query(`SELECT * FROM mnp_livehouse_manager WHERE user_id = ?`, [
    user_id,
  ]);
  return rows;
}

export async function create_user(username, password, name, email, role, phone, imageURL) {
  const [user_result] = await pool.query(
    "INSERT INTO mnp_user (username, password, email, role) VALUES (?, ?, ?, ?)",
    [username, password, email, role]
  );
  if (role === "manager") {
    const [result] = await pool.query(
      "INSERT INTO mnp_livehouse_manager (user_id, name, phone) VALUES (?, ?, ?)",
      [user_result.insertId, name, phone]
    );
    return { id: result.insertId, user_id: user_result.insertId, name, phone };
  } else {
    const [result] = await pool.query(
      "INSERT INTO mnp_artist (user_id, name, phone, profile_image) VALUES (?, ?, ?, ?)",
      [user_result.insertId, name, phone, imageURL]
    );
    return { id: result.insertId, user_id: user_result.insertId, name, phone, imageURL };
  }
}

export async function patch_user(name, phone, imageURL, user_id) {
  const [user_result] = await pool.query("SELECT * FROM mnp_user WHERE user_id = ?", [user_id])
  console.log(user_result);
  if (user_result[0].role === "manager") {
    const [result] = await pool.query("UPDATE mnp_livehouse_manager SET name = ?, phone = ? WHERE user_id = ?", [name, phone, user_id]);
    return { user_id, name, phone };
  } else {
    const [result] = await pool.query("UPDATE mnp_artist SET name = ?, phone = ?, profile_image = ? WHERE user_id = ?", [name, phone, imageURL, user_id]);
    return { user_id, name, phone, imageURL };
  }
  
}

// const users = await get_userbyname("t4e");
// const add_user = await create_user(
//   "kawin",
//   "it66070009",
//   "Kawin Isalamala",
//   "66070009@kmitl.ac.th",
//   "manager",
//   "087-846-9812",
//   "https://cdn.discordapp.com/attachments/1264240494188429434/1337614540531040308/Kawin_Profile.jpg?ex=67ac0a9e&is=67aab91e&hm=32854857758a1408679ed49d432ffb7c9709f564fe9e1b4a08f2f8111c1d3d0c&"
// );

// console.log(users);
// console.log(add_user);
