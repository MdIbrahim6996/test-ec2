import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prismaClient";
import { generateAuthToken } from "../utils/token";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (!existingUser) {
      throw new Error("User Does not Exist.");
    }

    if (existingUser?.isBlocked) {
      res.status(401);
      throw new Error("You Have Been Blocked By Admin.");
    }
    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (matchedPassword) {
      const token = generateAuthToken(
        String(existingUser?.id),
        existingUser.role
      );

      const { password, ...userData } = existingUser;
      // if (existingUser?.role === "user") {
      //     res.json({
      //         success: true,
      //         redirectUrl: "http://localhost:4000/user",
      //     });
      // }

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 12 * 60 * 60 * 1000,
        })
        .send({ user: userData });
    } else {
      throw new Error("Invalid Credentials.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const loginFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (!existingUser) {
      throw new Error("User Does not Exist.");
    }

    if (existingUser?.isBlocked) {
      res.status(401);
      throw new Error("You Have Been Blocked By Admin.");
    }
    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (matchedPassword) {
      const token = generateAuthToken(
        String(existingUser?.id),
        existingUser.role
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in prod only
        sameSite: "lax",
        maxAge: 12 * 60 * 60 * 1000,
        path: "/",
      });
      if (existingUser?.role === "user") {
        return res.redirect(303, "/user/profile");
      }

      //   if (existingUser?.role === "superadmin") {
      //     return res.redirect(`${CLIENT_URL}superadmin/main-dashboard`);
      //   }
    } else {
      throw new Error("Invalid Credentials.");
    }
  } catch (error: any) {
    console.log(error);
    res.render("pages/login", { layout: false, error: error.message });
    // next(error);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("token");
  res.send({ msg: "logout success" });
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
