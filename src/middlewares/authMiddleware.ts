import { Request, Response, NextFunction } from "express";
// import { prisma } from "../lib/prismaClient";
import jwt from "jsonwebtoken";
import { IJwtPayload, User } from "../types/app.types";
import { prisma } from "../lib/prismaClient";
// import { CLIENT_URL } from "../utils/appContants";

// export const isAuth = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { token } = req.cookies;
//     if (!token) {
//       res.status(401);
//       throw new Error("Token expired login again.");
//     }
//     const { id } = jwt.verify(token, "fsdfsdf") as IJwtPayload;
//     if (id) {
//       const user = (await prisma.user.findUnique({
//         where: { id: parseInt(id) },
//         select: {
//           createdAt: false,
//           updatedAt: false,
//           password: false,
//           id: true,
//           email: true,
//           name: true,
//           role: true,
//           employeeId: true,
//           phone: true,
//           isBlocked: true,
//         },
//       })) as User;

//       req.user = user;
//     } else throw new Error("Invalid token. Please Sign in.");

//     next();
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };
export const isUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      return res.redirect("/login");
    }
    const { id } = jwt.verify(token, "fsdfsdf") as IJwtPayload;
    if (id) {
      const user = (await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: {
          createdAt: false,
          updatedAt: false,
          password: false,
          id: true,
          email: true,
          name: true,
          role: true,
          employeeId: true,
          phone: true,
          isBlocked: true,
        },
      })) as User;

      req.user = user;

      //   if (user.role === "superadmin") {
      //     return res.redirect(CLIENT_URL);
      //   }
    } else {
      res.redirect("/login");
      throw new Error("Invalid token. Please Sign in.");
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
