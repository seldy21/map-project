import { PrismaClient } from "@/generated/prisma";
import { StoreAPIResponse, StoreType } from "@/interface";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreAPIResponse | StoreType[]>,
) {
  const { page = "" } = req.query;
  const prisma = new PrismaClient();
  if (page) {
    //page query가 있다면 페이징
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
  } else {
    //query가 없다면 모든 데이터
    const stores = await prisma.store.findMany({
      orderBy: {
        id: 'asc'
      }
    });

    res.status(200).json(stores);
  }
}