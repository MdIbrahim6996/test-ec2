import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prismaClient";
import { Prisma } from "@prisma/client";
import { returnRandomQuotes } from "../utils/appConstants";

async function runTransactionWithRetry<T>(
  fn: (tx: typeof prisma) => Promise<T>,
  retries = 5,
  delayMs = 300
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      // @ts-ignore
      return await prisma.$transaction(fn);
    } catch (err) {
      console.warn(`Transaction attempt ${i + 1} failed:`, err);
      if (i === retries - 1) throw err; // last attempt → throw
      await new Promise((r) => setTimeout(r, delayMs)); // wait before retry
    }
  }
  throw new Error("Unreachable"); // should never reach
}

export const createLeadUpdated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("updated", req.body);
  const {
    title,
    firstName,
    middleName,
    lastName,
    centre,
    address,
    city,
    county,
    pincode,
    password,
    dateOfBirth,
    phone,
    process,
    plan,
    poa,
    closer,
    verifier,

    paymentMethod,
    // Bank
    bankName,
    accountName,
    accountNumber,
    sort,
    // Card
    cardName,
    cardBankName,
    cardNumber,
    expiry,
    cardCvv,
    shift,
    comment,
    // Appliances
    applianceName,
    makeOfAppliance,
    ageOfAppliance,
  } = req.body;
  const date = new Date();

  try {
    const status = await prisma.status.findFirst({
      where: { name: "pending" },
    });

    const leadUpdated = await runTransactionWithRetry(async (tx) => {
      const lead = await tx.lead.create({
        data: {
          title,
          firstName,
          middleName,
          lastName,
          centre,
          address,
          city,
          county,
          pincode,
          password,
          poa: poa === "true" ? true : false,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : Prisma.skip,
          phone,
          processId: parseInt(process),
          planId: parseInt(plan),
          // leadByUserId: req?.user?.id!,
          leadByUserId: req?.body?.leadByUserId!,
          closerId: parseInt(closer),
          verifierId: parseInt(verifier),
          paymentMethod,
          shift,
          comment: comment ? comment : Prisma.skip,
          // BANK
          bankName: bankName ? bankName : Prisma.skip,
          accountName: accountName ? accountName : Prisma.skip,
          accountNumber: accountNumber ? accountNumber : Prisma.skip,
          sort: sort ? sort : Prisma.skip,
          // CARD
          cardName: cardName ? cardName : Prisma.skip,
          cardBankName: cardBankName ? cardBankName : Prisma.skip,
          cardNumber: cardNumber ? cardNumber : Prisma.skip,
          expiry: expiry ? expiry : Prisma.skip,
          cardCvv: cardCvv ? cardCvv : Prisma.skip,
          statusId: status?.id,
        },
        include: { status: { select: { name: true } } },
      });

      const appliances = applianceName?.map((_: any, i: number) => ({
        name: applianceName[i],
        makeOfAppliance: makeOfAppliance[i],
        age: Number(ageOfAppliance[i]),
        leadId: lead?.id,
      }));

      if (appliances && appliances.length > 0) {
        await tx.appliance.createMany({ data: appliances });
      }

      await tx.leadCount.upsert({
        where: {
          userId: lead?.leadByUserId as number,
          uniqueDate: {
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear() - 1,
            userId: lead?.leadByUserId as number,
          },
        },
        create: {
          userId: lead?.leadByUserId as number,
          count: 1,
          date: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear() - 1,
        },
        update: { count: { increment: 1 } },
      });

      return lead;
    });

    // const dailyLeadCount = await prisma.leadCount.upsert({
    //   where: {
    //     userId: lead?.leadByUserId as number,
    //     uniqueDate: {
    //       date: date.getDate(),
    //       month: date.getMonth() + 1,
    //       year: date.getFullYear() - 1,
    //       userId: lead?.leadByUserId as number,
    //     },
    //   },
    //   create: {
    //     userId: lead?.leadByUserId as number,
    //     count: 1,
    //     date: date.getDate(),
    //     month: date.getMonth() + 1,
    //     year: date.getFullYear() - 1,
    //   },
    //   update: { count: { increment: 1 } },
    // });

    if (leadUpdated?.id) {
      return res.redirect("/user/add-lead?success=1");
    } else {
      return res.redirect("/user/add-lead?failed=1");
    }

    // res.send(lead);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //     {
  //   title: 'Mr.',
  //   firstName: 'dsfdsf',
  //   middleName: '',
  //   lastName: 'dfdsf',
  //   centre: 'dsfsdf',
  //   address: '',
  //   city: '',
  //   county: '',
  //   pincode: 'sdfsdf',
  //   password: '',
  //   dateOfBirth: '',
  //   phone: '3242343242',
  //   process: '1',
  //   plan: '1',
  //   closer: '6',
  //   verifier: '6',
  //   paymentMethod: 'demandDraft',
  //   shift: 'UNITED KINGDOM (UK)',
  //   bank: {
  //     bankName: 'dsfsdf',
  //     accountName: 'dsfsdf',
  //     accountNumber: 'sdfsdf',
  //     sort: 'sdfsdf'
  //   },
  //     card: {
  //     name: 'fsdf',
  //     bankName: 'sdf',
  //     cardNumber: 'sdf',
  //     expiry: 'dsf',
  //     cvv: 'sdf'
  //   }
  // }
  const {
    title,
    firstName,
    middleName,
    lastName,
    centre,
    address,
    city,
    county,
    pincode,
    password,
    dateOfBirth,
    phone,
    process,
    plan,
    poa,
    closer,
    verifier,

    paymentMethod,
    // Bank
    bankName,
    accountName,
    accountNumber,
    sort,
    // Card
    cardName,
    cardBankName,
    cardNumber,
    expiry,
    cardCvv,
    shift,
    comment,
    // Appliances
    applianceName,
    makeOfAppliance,
    ageOfAppliance,
  } = req.body;
  const date = new Date();

  try {
    const status = await prisma.status.findFirst({
      where: { name: "pending" },
    });

    const lead = await prisma.lead.create({
      data: {
        title,
        firstName,
        middleName,
        lastName,
        centre,
        address,
        city,
        county,
        pincode,
        password,
        poa: poa === "true" ? true : false,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : Prisma.skip,
        phone,
        processId: parseInt(process),
        planId: parseInt(plan),
        leadByUserId: req?.user?.id!,
        closerId: parseInt(closer),
        verifierId: parseInt(verifier),
        paymentMethod,
        shift,
        comment: comment ? comment : Prisma.skip,
        // BANK
        bankName: bankName ? bankName : Prisma.skip,
        accountName: accountName ? accountName : Prisma.skip,
        accountNumber: accountNumber ? accountNumber : Prisma.skip,
        sort: sort ? sort : Prisma.skip,
        // CARD
        cardName: cardName ? cardName : Prisma.skip,
        cardBankName: cardBankName ? cardBankName : Prisma.skip,
        cardNumber: cardNumber ? cardNumber : Prisma.skip,
        expiry: expiry ? expiry : Prisma.skip,
        cardCvv: cardCvv ? cardCvv : Prisma.skip,
        statusId: status?.id,
      },
      include: { status: { select: { name: true } } },
    });

    const appliances = applianceName?.map((_: any, i: number) => ({
      name: applianceName[i],
      makeOfAppliance: makeOfAppliance[i],
      age: Number(ageOfAppliance[i]),
      leadId: lead?.id,
    }));

    if (appliances && appliances.length > 0) {
      await prisma.appliance.createMany({ data: appliances });
    }
    const dailyLeadCount = await prisma.leadCount.upsert({
      where: {
        userId: lead?.leadByUserId as number,
        uniqueDate: {
          date: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear() - 1,
          userId: lead?.leadByUserId as number,
        },
      },
      create: {
        userId: lead?.leadByUserId as number,
        count: 1,
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear() - 1,
      },
      update: { count: { increment: 1 } },
    });

    if (lead?.id) {
      return res.redirect("/user/add-lead?success=1");
    } else {
      return res.redirect("/user/add-lead?failed=1");
    }

    // res.send(lead);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
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
        status: { select: { name: true } },
        process: { select: { name: true } },
        plan: { select: { name: true } },
        StatusChangeReason: true,
      },
      orderBy: { createdAt: "desc" },
    });
    console.log(leads);

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
      where: { OR: [{ role: "closer" }, { role: "verifier" }] },
      select: { id: true, name: true, alias: true },
    });

    res.render("pages/add-lead", {
      currentPath: "/user/add-lead",
      process,
      plan,
      users,
      quote: returnRandomQuotes(),
      success: req.query.success,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
