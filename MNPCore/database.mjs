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

// User-related functions
export async function get_users() {
  const [rows] = await pool.query("SELECT * FROM mnp_user");
  return rows;
}

export async function get_user_by_username(username) {
  const [rows] = await pool.query(`SELECT * FROM mnp_user WHERE username = ?`, [
    username,
  ]);
  return rows[0];
}

export async function get_user_by_id(user_id) {
  const [rows] = await pool.query(`SELECT * FROM mnp_user WHERE user_id = ?`, [
    user_id,
  ]);
  return rows[0];
}

export async function create_user(
  username,
  password,
  email,
  role,
  name,
  phone,
  facebook_link,
  facebook_name,
  instagram_link,
  instagram_name,
  profile_image,
  verify_image
) {
  const [result] = await pool.query(
    `INSERT INTO mnp_user (username, password, email, role, name, phone, facebook_link, facebook_name, instagram_link, instagram_name, profile_image, verify_proof)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      username,
      password,
      email,
      role,
      name,
      phone,
      facebook_link,
      facebook_name,
      instagram_link,
      instagram_name,
      profile_image,
      verify_image,
    ]
  );
  return {
    user_id: result.insertId,
    username,
    email,
    role,
    name,
    phone,
    facebook_link,
    facebook_name,
    instagram_link,
    instagram_name,
    profile_image,
    verify_image,
  };
}

export async function update_user(
  user_id,
  name,
  phone,
  facebook_link,
  facebook_name,
  instagram_link,
  instagram_name,
  profile_image
) {
  try {
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      `UPDATE mnp_user 
       SET name = ?, phone = ?, facebook_link = ?, facebook_name = ?, 
           instagram_link = ?, instagram_name = ?, profile_image = ? 
       WHERE user_id = ?`,
      [
        name,
        phone,
        facebook_link,
        facebook_name,
        instagram_link,
        instagram_name,
        profile_image,
        user_id,
      ]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Update User Error:", error);
    throw error;
  }
}

export async function update_user_status(user_id, status) {
  try {
    const [result] = await pool.query(
      `UPDATE mnp_user SET verify_status = ? WHERE user_id = ?`,
      [status, user_id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Update User Status Error:", error);
    throw error;
  }
}

// Livehouse-related functions
export async function create_livehouse(
  user_id,
  name,
  location,
  province,
  description,
  price_per_hour,
  sample_image01,
  sample_image02,
  sample_image03,
  sample_image04,
  sample_image05
) {
  const [result] = await pool.query(
    `INSERT INTO mnp_livehouse (user_id, name, location, province, description, price_per_hour, sample_image01, sample_image02, sample_image03, sample_image04, sample_image05)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      name,
      location,
      province,
      description,
      price_per_hour,
      sample_image01,
      sample_image02,
      sample_image03,
      sample_image04,
      sample_image05,
    ]
  );
  return {
    livehouse_id: result.insertId,
    user_id,
    name,
    location,
    province,
    description,
    price_per_hour,
  };
}

export async function get_livehouse_by_id(livehouse_id) {
  const [rows] = await pool.query(
    "SELECT * FROM mnp_livehouse WHERE livehouse_id = ?",
    [livehouse_id]
  );
  return rows[0];
}

export async function get_all_livehouses() {
  const [rows] = await pool.query("SELECT * FROM mnp_livehouse");
  return rows;
}

// Facilities-related functions
export async function create_facilities(
  livehouse_id,
  mic,
  guitar,
  bass,
  drum,
  keyboard,
  pa_monitor,
  mic_price,
  guitar_price,
  bass_price,
  drum_price,
  keyboard_price,
  pa_monitor_price
) {
  const [result] = await pool.query(
    `INSERT INTO mnp_facilities (livehouse_id, mic, guitar, bass, drum, keyboard, pa_monitor,
                                mic_price, guitar_price, bass_price, drum_price, keyboard_price, pa_monitor_price)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      livehouse_id,
      mic,
      guitar,
      bass,
      drum,
      keyboard,
      pa_monitor,
      mic_price,
      guitar_price,
      bass_price,
      drum_price,
      keyboard_price,
      pa_monitor_price,
    ]
  );
  return {
    facilities_id: result.insertId,
    livehouse_id,
    mic,
    guitar,
    bass,
    drum,
    keyboard,
    pa_monitor,
    mic_price,
    guitar_price,
    bass_price,
    drum_price,
    keyboard_price,
    pa_monitor_price,
  };
}

export async function get_facilities_by_livehouse(livehouse_id) {
  const [rows] = await pool.query(
    "SELECT * FROM mnp_facilities WHERE livehouse_id = ?",
    [livehouse_id]
  );
  return rows[0];
}

// Booking-related functions
export async function create_booking(
  user_id,
  livehouse_id,
  start_time,
  end_time,
  total_price,
  status,
  guitar,
  bass,
  drum,
  mic,
  pa_monitor
) {
  try {
    const start = new Date(start_time);
    const end = new Date(end_time);

    const [result] = await pool.query(
      `INSERT INTO mnp_booking (user_id, livehouse_id, start_time, end_time, total_price, status, guitar, bass, drum, mic, pa_monitor)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        livehouse_id,
        start,
        end,
        total_price,
        status,
        guitar,
        bass,
        drum,
        mic,
        pa_monitor,
      ]
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function get_booking_by_id(booking_id) {
  const [rows] = await pool.query(
    `
    SELECT b.*, u.name as user_name, l.name as livehouse_name 
    FROM mnp_booking b
    JOIN mnp_user u ON b.user_id = u.user_id
    JOIN mnp_livehouse l ON b.livehouse_id = l.livehouse_id
    WHERE b.booking_id = ?
  `,
    [booking_id]
  );
  return rows[0];
}

export async function update_booking_status(booking_id, status) {
  const [result] = await pool.query(
    "UPDATE mnp_booking SET status = ? WHERE booking_id = ?",
    [status, booking_id]
  );
  return result.affectedRows > 0;
}

export async function upload_payment_proof(
  booking_id,
  payment_proof,
  mimetype
) {
  const [result] = await pool.query(
    "UPDATE mnp_booking SET payment_proof = ?, mimetype = ? WHERE booking_id = ?",
    [payment_proof, mimetype, booking_id]
  );
  return result.affectedRows > 0;
}

export async function get_payment_proof(booking_id) {
  const [rows] = await pool.query(
    "SELECT payment_proof, mimetype FROM mnp_booking WHERE booking_id = ?",
    [booking_id]
  );
  return rows[0];
}

// Patch (Update) functions
export async function patch_livehouse(
  livehouse_id,
  name,
  location,
  province,
  description,
  price_per_hour,
  sample_image01,
  sample_image02,
  sample_image03,
  sample_image04,
  sample_image05
) {
  try {
    const [result] = await pool.query(
      `UPDATE mnp_livehouse 
       SET name = ?, 
           location = ?,
           province = ?,
           description = ?,
           price_per_hour = ?,
           sample_image01 = ?,
           sample_image02 = ?,
           sample_image03 = ?,
           sample_image04 = ?,
           sample_image05 = ?
       WHERE livehouse_id = ?`,
      [
        name,
        location,
        province,
        description,
        price_per_hour,
        sample_image01,
        sample_image02,
        sample_image03,
        sample_image04,
        sample_image05,
        livehouse_id,
      ]
    );

    if (result.affectedRows === 0) {
      throw new Error(`No livehouse found with ID: ${livehouse_id}`);
    }

    return {
      livehouse_id,
      name,
      location,
      province,
      description,
      price_per_hour,
      sample_image01,
      sample_image02,
      sample_image03,
      sample_image04,
      sample_image05,
    };
  } catch (error) {
    console.error("Error updating livehouse:", error);
    throw error;
  }
}

export async function patch_facilities(
  facilities_id,
  mic,
  guitar,
  bass,
  drum,
  keyboard,
  pa_monitor,
  mic_price,
  guitar_price,
  bass_price,
  drum_price,
  keyboard_price,
  pa_monitor_price
) {
  try {
    const [result] = await pool.query(
      `UPDATE mnp_facilities 
       SET mic = ?,
           guitar = ?,
           bass = ?,
           drum = ?,
           keyboard = ?,
           pa_monitor = ?,
           mic_price = ?,
           guitar_price = ?,
           bass_price = ?,
           drum_price = ?,
           keyboard_price = ?,
           pa_monitor_price = ?
       WHERE facilities_id = ?`,
      [
        mic,
        guitar,
        bass,
        drum,
        keyboard,
        pa_monitor,
        mic_price,
        guitar_price,
        bass_price,
        drum_price,
        keyboard_price,
        pa_monitor_price,
        facilities_id,
      ]
    );

    if (result.affectedRows === 0) {
      throw new Error(`No facilities found with ID: ${facilities_id}`);
    }

    return {
      facilities_id,
      mic,
      guitar,
      bass,
      drum,
      keyboard,
      pa_monitor,
      mic_price,
      guitar_price,
      bass_price,
      drum_price,
      keyboard_price,
      pa_monitor_price,
    };
  } catch (error) {
    console.error("Error updating facilities:", error);
    throw error;
  }
}

export async function patch_booking(
  booking_id,
  start_time,
  end_time,
  total_price,
  status,
  guitar,
  bass,
  drum,
  mic,
  pa_monitor
) {
  try {
    const [result] = await pool.query(
      `UPDATE mnp_booking 
       SET start_time = ?,
           end_time = ?,
           total_price = ?,
           status = ?,
           guitar = ?,
           bass = ?,
           drum = ?,
           mic = ?,
           pa_monitor = ?
       WHERE booking_id = ?`,
      [
        start_time,
        end_time,
        total_price,
        status,
        guitar,
        bass,
        drum,
        mic,
        pa_monitor,
        booking_id,
      ]
    );

    if (result.affectedRows === 0) {
      throw new Error(`No booking found with ID: ${booking_id}`);
    }

    return {
      booking_id,
      start_time,
      end_time,
      total_price,
      status,
      guitar,
      bass,
      drum,
      mic,
      pa_monitor,
    };
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

export async function verify_reserve(booking_id) {
  try {
    const [result] = await pool.query(
      `UPDATE mnp_booking SET status = 'Accept' WHERE booking_id = ?`,
      [booking_id]
    );
    return result.affectedRows > 0;
  } catch (err) {
    console.log("Error verifying reserve:", err);
    throw err;
  }
}

export async function get_proof(booking_id) {
  try {
    const [rows] = await pool.query(
      "SELECT payment_proof, mimetype FROM mnp_booking WHERE booking_id = ?",
      [booking_id]
    );

    if (rows && rows.length > 0) {
      return rows[0]; // Return the first row containing payment_proof and mimetype
    }
    return null; // Return null if no booking found
  } catch (err) {
    console.log("Error getting proof:", err);
    throw err;
  }
}

export async function get_booking_by_user_id(user_id){
  try {
    const rows = await pool.query(
      `SELECT * FROM mnp_booking WHERE user_id = ?`,
      [user_id]
    );
    return rows;
  } catch (err) {
    console.log("Error getting booking by user id:", err);
    throw err;
  }
}