import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prismaClient";
import { Prisma } from "@prisma/client";
import { returnRandomQuotes } from "../utils/appConstants";

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

export const getAddLeadPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const process = await prisma.process.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true },
    });
    const plan = await prisma.plan.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, processId: true },
    });
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { role: "closer" },
      select: { id: true, name: true },
    });

    res.render("pages/add-lead", {
      currentPath: "/user/add-lead",
      process,
      plan,
      users,
      quote: returnRandomQuotes(),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
