import 'next-auth';
import { DefaultSession } from 'next-auth';

// This file extends the default NextAuth types to include custom user fields

declare module 'next-auth' {
  /**
   * Extend the user object to include additional fields
   */
  interface User {
    role?: string;
    username?: string;
    phone?: string;
    facebook_link?: string;
    facebook_name?: string;
    instagram_link?: string;
    instagram_name?: string;
  }

  /**
   * Extend the session to include additional fields
   */
  interface Session {
    user: {
      role?: string;
      username?: string;
      phone?: string;
      facebook_link?: string;
      facebook_name?: string;
      instagram_link?: string;
      instagram_name?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the JWT to include additional fields
   */
  interface JWT {
    role?: string;
    username?: string;
    phone?: string;
    facebook_link?: string;
    facebook_name?: string;
    instagram_link?: string;
    instagram_name?: string;
  }
}

// Define the User interface for use in components
export interface User {
  user_id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  name: string;
  phone: string;
  facebook_link: string;
  facebook_name: string;
  instagram_link: string;
  instagram_name: string;
}

// Define the sign-up form interface
export interface SignUpFormData {
  username: string;
  password: string;
  email: string;
  role: string;
  name: string;
  phone: string;
  facebook_link: string;
  facebook_name: string;
  instagram_link: string;
  instagram_name: string;
}