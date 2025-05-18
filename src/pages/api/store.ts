import { StoreType } from "@/interface";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreType[]>,
) {
  const stores = (await import("@/data/storeData.json")).DATA as StoreType[];

  res.status(200).json(stores);
}