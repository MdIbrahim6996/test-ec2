import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prismaClient";
import { Prisma } from "@prisma/client";

export const getUserLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusId, saleDate, fromDate, toDate } = req.query;
  const { id } = req.user!;

  const newSaleDate = new Date(saleDate as string);
  newSaleDate.setUTCHours(0, 0, 0, 0);
  const nextDay = new Date(saleDate as string);
  nextDay.setUTCHours(0, 0, 0, 0);
  nextDay.setDate(nextDay.getDate() + 1);
  try {
    const status = await prisma.status.findMany();
    const leads = await prisma.lead.findMany({
      where: {
        leadByUserId: id,
        statusId: statusId ? parseInt(statusId as string) : Prisma.skip,
        saleDate: {
          gte: saleDate ? newSaleDate : Prisma.skip,
          lt: saleDate ? nextDay : Prisma.skip,
        },
        createdAt: {
          gte: fromDate ? new Date(fromDate as string) : Prisma.skip,
          lte: toDate ? new Date(toDate as string) : Prisma.skip,
        },
      },
      include: {
        Status: { select: { name: true } },
        Process: { select: { name: true } },
        Plan: { select: { name: true } },
        StatusChangeReason: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.render("pages/leads", { currentPath: "/user/leads", leads, status });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
