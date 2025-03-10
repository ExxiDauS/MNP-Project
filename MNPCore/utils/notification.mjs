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

async function getHTMLAccept() {
  const templatePath = join(__dirname, "../template/accept.html");
  const htmlTemplate = await fs.readFile(templatePath, "utf-8");

  return htmlTemplate;
}
async function getHTMLManager() {
  const templatePath = join(__dirname, "../template/manager.html");
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
        subject: subject,
        html: htmlTemplate,
  });

  console.log("Email sent"); 
} catch (err) {
    console.error("Error:", err);
    throw err;
}}

export async function sendMailManager(to, subject) {
  try {
    const htmlTemplate = await getHTMLManager();

    await transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlTemplate,
  });

  console.log("Email sent"); 
} catch (err) {
    console.error("Error:", err);
    throw err;
}}

export async function sendMailAccept(to, subject) {
  try {
    const htmlTemplate = await getHTMLAccept();

    await transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlTemplate,
  });

  console.log("Email sent"); 
} catch (err) {
    console.error("Error:", err);
    throw err;
}}