// notification when reserve have been accepted or rejected
// notification when reserve have been edited
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getHTML() {
  const templatePath = join(__dirname, "../template/mail.html");
  const htmlTemplate = await fs.readFile(templatePath, "utf-8");
  return htmlTemplate;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});


export async function sendMail(to, subject) {
  try {
    const htmlTemplate = await getHTML();

    await transporter.sendMail({
        to: to,
        subject: 'Test',
        html: htmlTemplate,
  });

  console.log("Email sent"); 
} catch (err) {
    console.error("Error:", err);
    throw err;
}}