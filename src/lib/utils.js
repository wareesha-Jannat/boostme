import { notFound } from "next/navigation";
import { DBConnect } from "@/lib/db";
import User from "@/models/user";
import Payment from "@/models/payment";
import cloudinary from "./cloudinary";

export const getUser = async (username) => {
  try {
    await DBConnect();
    const data = await User.findOne({ username: username }).select(
      "-createdAt -updatedAt -payfastid -payfastsecret"
    );
    if (!data) {
      notFound();
    }

    return data;
  } catch (error) {
    notFound();
  }
};

export async function getUsers() {
  try {
    await DBConnect();
    const users = await User.find({})
      .lean()
      .select("username profilepic name bio");

    return { profiles: JSON.parse(JSON.stringify(users)), success: true };
  } catch (error) {
    return { error: "Internal server error" };
  }
}
export const getLoggedInUser = async (id) => {
  try {
    await DBConnect();
    const userData = await User.findOne({ _id: id })
      .select("-createdAt -updatedAt -__v")
      .lean();
    userData._id = userData._id.toString();
    if (!userData) {
      return {
        success: false,
        error: "User not found",
      };
    }
    return { data: userData, success: true };
  } catch (error) {
    return { success: false, error: "Failed to get User data" };
  }
};

export async function CheckPayment(id) {
  try {
    await DBConnect();
    const payment = await Payment.findById(id);
    if (!payment) {
      return { error: "payment not found" };
    }

    return { paymentStatus: payment.done, user: payment.name };
  } catch (err) {
    return { error: "Server error" };
  }
}

export const uploadToCloudinary = async (
  file,
  userId,
  folderName,
  creationId
) => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `BoostMe/${folderName}`,
          public_id: creationId ? `${userId}_${creationId}` : userId,
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed", error);
    throw new Error("failed to upload image on cloudinary");
  }
};

export function getPublicIdFromUrl(url) {
  const cleanUrl = url.split("?")[0];
  const parts = cleanUrl.split("/upload/");
  if (parts.length < 2) return null;
  const segments = parts[1].split("/");
  // Remove version segment if present (like "v1759331497")
  if (/^v[0-9]+$/.test(segments[0])) {
    segments.shift();
  }

  // Join all remaining parts, then strip extension
  return segments.join("/").replace(/\.[^/.]+$/, "");
}
