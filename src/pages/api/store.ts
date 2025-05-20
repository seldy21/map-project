import { PrismaClient } from "@/generated/prisma";
import { StoreAPIResponse } from "@/interface";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreAPIResponse>,
) {
  const { page = "1" } = req.query;
  const prisma = new PrismaClient();
  const stores = await prisma.store.findMany({
    orderBy: {
      id: "asc",
    },
    take: 10,
    skip: (Number(page) - 1) * 10,
  });
  const count = await prisma.store.count();

  //total page, data, current page


  res.status(200).json({
    page: parseInt(page as string),
    data: stores,
    totalCount: count,
    totalPage: Math.ceil(
      count / 10,
    ),
  });
}