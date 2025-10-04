"use server";
import { signIn, signOut } from "@/lib/auth";
import { DBConnect } from "@/lib/db";
import User from "@/models/user";
import { forgotPasswordSchema, resetPasswordSchema } from "@/lib/validation";
import ResetPasswordToken from "@/models/resetPasswordToken";
import { randomBytes } from "crypto";
import crypto from "crypto";
import { addMinutes } from "date-fns";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export async function Login() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function Logout() {
  await signOut({ redirectTo: "/" });
}

export async function CredentialsLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return response;
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

export async function ResetPasswordLink(values) {
  try {
    await DBConnect();
    const result = forgotPasswordSchema.safeParse(values);
    if (!result.success) {
      return {
        error: "Invalid email",
      };
    }
    const { email } = result.data;

    const existingEmail = await User.findOne({ email: email });
    if (!existingEmail) {
      return { error: "user does not exist with this email" };
    }
    const token = randomBytes(32).toString("hex");
    const expiresAt = addMinutes(new Date(), 15);
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await ResetPasswordToken.create({
      email,
      token: hashedToken,
      expiresAt,
    });
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your Password",
      html: `<p>Click the link below to reset your password:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>This link is valid for 15 minutes.</p>`,
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Something went wrong. Please try again",
    };
  }
}
export async function ChangePassword(values, token) {
  try {
    await DBConnect();
    const result = resetPasswordSchema.safeParse(values);
    if (!result.success) {
      return {
        error: "Invalid input",
      };
    }
    const { password } = result.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const existingToken = await ResetPasswordToken.findOne({
      token: hashedToken,
    });
    if (!existingToken) {
      return { error: "Token not found or expired" };
    }

    if (existingToken.expiresAt < Date.now()) {
      await existingToken.deleteOne();
      return {
        error: "Token expired ",
      };
    }

    await User.updateOne(
      { email: existingToken.email },
      { $set: { password: hashedPassword } }
    );

    await existingToken.deleteOne();
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Something went wrong. Please try again",
    };
  }
}
