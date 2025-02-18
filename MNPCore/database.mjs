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
  const [rows] = await pool.query(
    `SELECT * FROM mnp_artist WHERE user_id = ?`,
    [user_id]
  );
  return rows;
}

export async function get_managerbyid(user_id) {
  const [rows] = await pool.query(
    `SELECT * FROM mnp_livehouse_manager WHERE user_id = ?`,
    [user_id]
  );
  return rows;
}

export async function create_user(
  username,
  password,
  name,
  email,
  role,
  phone,
  imageURL
) {
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
    return {
      id: result.insertId,
      user_id: user_result.insertId,
      name,
      phone,
      imageURL,
    };
  }
}

export async function patch_user(name, phone, imageURL, user_id) {
  const [user_result] = await pool.query(
    "SELECT * FROM mnp_user WHERE user_id = ?",
    [user_id]
  );
  console.log(user_result);
  if (user_result[0].role === "manager") {
    const [result] = await pool.query(
      "UPDATE mnp_livehouse_manager SET name = ?, phone = ? WHERE user_id = ?",
      [name, phone, user_id]
    );
    return { user_id, name, phone };
  } else {
    const [result] = await pool.query(
      "UPDATE mnp_artist SET name = ?, phone = ?, profile_image = ? WHERE user_id = ?",
      [name, phone, imageURL, user_id]
    );
    return { user_id, name, phone, imageURL };
  }
}

export async function create_reserve(
  artist_id,
  live_house_id,
  start_time,
  end_time,
  status
) {
  const formatToUTC7 = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.getTime() + 7 * 60 * 60 * 1000);
  };

  const format_start_time = formatToUTC7(start_time);
  const format_end_time = formatToUTC7(end_time);
  const total_hours = format_end_time.getHours() - format_start_time.getHours();
  const [price] = await pool.query(
    "SELECT price_per_hour FROM mnp_livehouse WHERE livehouse_id = ?",
    [live_house_id]
  );
  console.log(price);
  console.log(total_hours);
  const total_price = total_hours * price[0].price_per_hour;
  const [rows] = await pool.query(
    "INSERT INTO mnp_booking (artist_id, livehouse_id, start_time, end_time, total_price, status) VALUES (?, ?, ?, ?, ?, ?)",
    [
      artist_id,
      live_house_id,
      format_start_time,
      format_end_time,
      total_price,
      status,
    ]
  );
  return {
    id: rows.insertId,
    artist_id,
    live_house_id,
    start_time: format_start_time,
    end_time: format_end_time,
    total_price,
    status,
  };
}

export async function get_reserve_from_id(booking_id) {
  try {
    // Get booking information
    const [bookings] = await pool.query(
      "SELECT * FROM mnp_booking WHERE booking_id = ?",
      [booking_id]
    );

    // Check if booking exists
    if (!bookings || bookings.length === 0) {
      throw new Error(`Booking not found with ID: ${booking_id}`);
    }
    const booking = bookings[0];

    // Get livehouse information
    const [livehouses] = await pool.query(
      "SELECT * FROM mnp_livehouse WHERE livehouse_id = ?",
      [booking.livehouse_id]
    );

    // Check if livehouse exists
    if (!livehouses || livehouses.length === 0) {
      throw new Error(`Livehouse not found with ID: ${booking.livehouse_id}`);
    }
    const livehouse = livehouses[0];

    // Get manager information
    const [managers] = await pool.query(
      "SELECT * FROM mnp_livehouse_manager WHERE manager_id = ?",
      [livehouse.manager_id]
    );

    // Check if manager exists
    if (!managers || managers.length === 0) {
      throw new Error(`Manager not found with ID: ${livehouse.manager_id}`);
    }
    const manager = managers[0];

    return {
      booking,
      manager,
    };
  } catch (error) {
    // Log the error for debugging
    console.error("Error in get_reserve_from_id:", error);
    throw error; // Re-throw to let caller handle the error
  }
}

// const reserve = create_reserve(
//   1,
//   1,
//   "2022-12-1212:00:00",
//   "2022-12-12 15:00:00",
//   "pending"
// );
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
