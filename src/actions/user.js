"use server";
import bcrypt from "bcrypt";
import User from "@/models/user";
import { DBConnect } from "@/lib/db";
import { profileSchema, signUpschema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { getPublicIdFromUrl, uploadToCloudinary } from "@/lib/utils";
import { auth } from "@/lib/auth";
import Creation from "@/models/creations";
import Payment from "@/models/payment";
import cloudinary from "@/lib/cloudinary";

export async function signup(credentials) {
  try {
    await DBConnect();
    const result = signUpschema.safeParse(credentials);
    if (!result.success) {
      return { error: "Invalid Input" };
    }
    const { email, username, password } = result.data;

    const exisitngUsername = await User.findOne({ username: username });
    if (exisitngUsername) {
      return { error: "Username already taken" };
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      if (!existingEmail.password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(existingEmail._id, {
          password: hashedPassword,
        });
        return { success: true };
      }
      return { error: "email already taken" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "Internal server error" };
  }
}

// Upload helper

export const updateProfile = async (formData) => {
  const session = await auth();
  if (!session) {
    return {
      error: "unauthorized",
    };
  }
  try {
    await DBConnect();
    const newAvatar = formData.get("avatar");
    const newCover = formData.get("cover");
    const userId = formData.get("userId");
    const data = formData.get("data");
    const parsed = JSON.parse(data);

    const { ...formValues } = profileSchema.parse(parsed);

    // Handle profilepic

    if (newAvatar && newAvatar.size > 0 && newAvatar.name !== "undefined") {
      const profilePicUrl = await uploadToCloudinary(
        newAvatar,
        userId,
        "avatars"
      );
      formValues.profilepic = profilePicUrl;
    }

    // Handle coverpic

    if (newCover && newCover.size > 0 && newCover.name !== "undefined") {
      const coverPicUrl = await uploadToCloudinary(
        newCover,
        userId,
        "coverPictures"
      );
      formValues.coverpic = coverPicUrl;
    }

    // Remove email if present (we don't want to allow update)

    console.log("data before db update", formValues);
    // Update user in DB

    const updated = await User.findByIdAndUpdate(userId, formValues, {
      new: true,
    })
      .select("-createdAt -updatedAt -__v")
      .lean();

    updated._id = updated._id.toString();

    revalidatePath("/dashboard");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return { success: false, error: "Failed to update profile" };
  }
};

export async function DeleteUser(userId) {
  try {
    const session = await auth();
    if (!session || session.user.id !== userId) {
      return {
        error: "unauthorized",
      };
    }
    await DBConnect();
    const publicIds = [];
    const user = await User.findById(userId);
    if (!user) {
      return {
        error: "user not found",
      };
    }
    if (user.profilepic) {
      const id = getPublicIdFromUrl(user.profilepic);
      if (id) publicIds.push(id);
    }
    if (user.coverpic) {
      const id = getPublicIdFromUrl(user.coverpic);
      if (id) publicIds.push(id);
    }
    const creations = await Creation.find({ creatorId: userId });
    creations.forEach((c) => {
      if (c.coverImage) {
        const id = getPublicIdFromUrl(c.coverImage);
        if (id) publicIds.push(id);
      }
    });

    await User.findByIdAndDelete(userId);
    await Payment.deleteMany({ to_user: userId });
    await Creation.deleteMany({ creatorId: userId });
    console.log(publicIds, "publicids from delete user");
    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
    }
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server error",
    };
  }
}
