import { Router } from "express";
import {
  create_user,
  get_user_by_id,
  get_user_by_username,
  update_user,
} from "../database.mjs";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});


// Utility function to handle server errors
const handleServerError = (res, error, message = "Internal Server Error") => {
  console.error("Server Error:", error);
  return res.status(500).json({
    error: message,
    details: error.message,
  });
};

router.get("/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await get_user_by_id(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {}
});

router.get("/profile/image/:id", async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await get_user_by_id(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.setHeader("Content-Type", "image/jpeg");
    return res.send(user.profile_image);
  }catch(error){
    return handleServerError(res, error);
  }
});

router.get("/profile/verify/:id", async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await get_user_by_id(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.setHeader("Content-Type", "image/jpeg");
    return res.send(user.verify_proof);
  }catch(error){
    return handleServerError(res, error);
  }
});

// Authentication Routes
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Missing required credentials",
      });
    }

    const user = await get_user_by_username(username);

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
          id: user.user_id,
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

router.post(
  "/sign-up",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "verify", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
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
      } = req.body;

      // Validate required fields
      const requiredFields = [
        "username",
        "password",
        "name",
        "email",
        "role",
        "phone",
      ];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: "Missing required fields",
          fields: missingFields,
        });
      }

      // Check if username already exists
      const existingUser = await get_user_by_username(username);
      if (existingUser) {
        return res.status(409).json({
          error: "Username already exists",
        });
      }

      const profileImageBuffer = req.files?.profileImage?.[0]?.buffer || null;
      const verifyImageBuffer = req.files?.verify?.[0]?.buffer || null;

      // Create new user
      const newUser = await create_user(
        username,
        password,
        email,
        role,
        name,
        phone,
        facebook_link || null,
        facebook_name || null,
        instagram_link || null,
        instagram_name || null,
        profileImageBuffer,
        verifyImageBuffer
      );

      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser.user_id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          name: newUser.name,
          phone: newUser.phone,
        },
      });
    } catch (error) {
      return handleServerError(res, error, "Error creating user");
    }
  }
);

router.patch("/edit-profile/:id", upload.single("image"), async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        error: "Missing user_id parameter",
      });
    }

    // Get base user info
    const user = await get_user_by_id(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Update user profile
    const updatedUser = await update_user(
      userId,
      req.body.name || user.name,
      req.body.phone || user.phone,
      req.body.facebook_link || user.facebook_link,
      req.body.facebook_name || user.facebook_name,
      req.body.instagram_link || user.instagram_link,
      req.body.instagram_name || user.instagram_name,
      req.file ? req.file.buffer : user.profile_image
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return handleServerError(res, error, "Error updating profile");
  }
});

router.patch("/profile/change-status/:id", async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await get_user_by_id(userId);

    if(!user){
      return res.status(404).json({
        error: "User not found",
      });
    }

    const status = req.body.status || user.verify_status;

    const updatedUser = await update_user(status, userId);

    return res.status(200).json({
      message: "User status updated successfully",
      user: updatedUser,
    });
  }catch(error){
    return handleServerError(res, error);
  }
});

export default router;
//verify user from pdf and store it too db
//permission
