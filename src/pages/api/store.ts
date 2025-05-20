import { PrismaClient } from "@/generated/prisma";
import { StoreType } from "@/interface";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreType[]>,
) {
  const prisma = new PrismaClient();
  const stores = await prisma.store.findMany({
    orderBy: {
      id: "asc",
    }
  });

  res.status(200).json(stores);
}