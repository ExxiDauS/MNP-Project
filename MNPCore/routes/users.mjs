import { Router } from "express";
import {
  get_userbyname,
  create_user,
  get_userbyid,
  patch_user,
  get_managerbyid,
  get_artistbyid,
} from "../database.mjs";

const router = Router();

// Utility function to handle server errors
const handleServerError = (res, error, message = "Internal Server Error") => {
  console.error("Server Error:", error);
  return res.status(500).json({
    error: message,
    details: error.message,
  });
};

// Authentication Routes
router.get("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.query;

    if (!username || !password) {
      return res.status(400).json({
        error: "Missing required credentials",
      });
    }

    const [user] = await get_userbyname(username);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Note: In production, use proper password hashing (e.g., bcrypt)
    if (user.password === password) {
      return res.status(200).json({
        message: "Sign in successful",
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
    }

    return res.status(401).json({
      error: "Invalid credentials",
    });
  } catch (error) {
    return handleServerError(res, error);
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const { username, password, name, email, role, phone, imageURL } =
      req.query;

    // Validate required fields
    const requiredFields = ["username", "password", "name", "email", "role"];
    const missingFields = requiredFields.filter((field) => !req.query[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    // Check if username already exists
    const [existingUser] = await get_userbyname(username);
    if (existingUser) {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    // Create new user
    const newUser = await create_user(
      username,
      password, // Note: Should hash password in production
      name,
      email,
      role,
      phone || null,
      imageURL || null
    );

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    return handleServerError(res, error, "Error creating user");
  }
});

router.post("/verify", (req, res) => {
  // TODO: Implement proper verification logic
  return res.status(200).json({
    message: "Verification successful",
  });
});

router.patch("/edit-profile", async (req, res) => {
  try {
    const userId = req.query.user_id;

    if (!userId) {
      return res.status(400).json({
        error: "Missing user_id parameter",
      });
    }

    // Get base user info
    const [user] = await get_userbyid(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Get role-specific details
    const [roleDetails] = await (user.role === "manager"
      ? get_managerbyid(userId)
      : get_artistbyid(userId));

    if (!roleDetails) {
      return res.status(404).json({
        error: `${user.role} details not found`,
      });
    }

    // Update user profile
    const updatedUser = await patch_user(
      req.query.name || roleDetails.name,
      req.query.phone || roleDetails.phone,
      req.query.imageURL || roleDetails.profile_image,
      userId
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return handleServerError(res, error, "Error updating profile");
  }
});

export default router;
//verify user from pdf and store it too db
//permission