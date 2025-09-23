"use server";

import { auth } from "@/lib/auth";
import { DBConnect } from "@/lib/db";
import { getPublicIdFromUrl, uploadToCloudinary } from "@/lib/utils";
import { addCreationSchema } from "@/lib/validation";
import Creation from "@/models/creations";

export async function SubmitCreation({ values, coverImage, creationId }) {
  console.log(values);
  const session = await auth();
  if (!session) {
    return {
      error: "unauthorized",
    };
  }
  try {
    await DBConnect();

    const result = addCreationSchema.safeParse(values);
    console.log(result);
    if (!result.success) {
      return {
        error: "invalid input",
      };
    }
    const formValues = { ...result.data };

    let newCreation = null;
    if (creationId) {
      let coverUrl = null;
      if (
        coverImage &&
        coverImage.size > 0 &&
        coverImage.name !== "undefined"
      ) {
        coverUrl = await uploadToCloudinary(
          coverImage,
          session.user.id,
          "creations-covers",
          creationId.toString()
        );
      }
      if (coverUrl) {
        formValues.coverImage = coverUrl;
      }
      const updatedDoc = await Creation.findByIdAndUpdate(
        creationId,
        { $set: { creatorId: session.user.id, ...formValues } },
        { new: true }
      );
      if (!updatedDoc) {
        return {
          error: "creation not found",
        };
      }
      newCreation = JSON.parse(JSON.stringify(updatedDoc));
    } else {
      const newDoc = await Creation.create({
        creatorId: session.user.id,
        ...formValues,
      });
      if (
        coverImage &&
        coverImage.size > 0 &&
        coverImage.name !== "undefined"
      ) {
        const coverUrl = await uploadToCloudinary(
          coverImage,
          session.user.id,
          "creations-covers",
          newDoc._id.toString()
        );
        newDoc.coverImage = coverUrl;
        await newDoc.save();
        newCreation = JSON.parse(JSON.stringify(newDoc));
      }
    }
    return {
      success: true,
      newCreation,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "internal server error",
    };
  }
}

export async function DeleteCreation(creationId) {
  const session = await auth();
  if (!session) {
    return {
      error: "unauthorized",
    };
  }
  try {
    await DBConnect();
    const result = await Creation.findByIdAndDelete(creationId);
    if (!result) {
      return {
        error: "Creation not found",
      };
    }
    if (result.coverImage) {
      await cloudinary.uploader.destroy(getPublicIdFromUrl(result.coverImage));
    }

    console.log(result.toObject());
    return {
      success: true,
      deletedCreation: JSON.parse(JSON.stringify(result)),
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server error, try again later",
    };
  }
}
