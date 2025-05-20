
// import * as data from '@/data/storeData.json';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

async function seedData() {

  // data?.DATA?.map(async (store) => {
  //   const storeData = {
  //     phone: store.tel_no,
  //     address: store.rdn_code_nm,
  //     latitude: store.y_dnts,
  //     longitude: store.x_cnts,
  //     name: store.upso_nm,
  //     category: store.bizcnd_code_nm,
  //     storeType: store.cob_code_nm,
  //     foodCertifyName: store.crtfc_gbn_nm
  //   };

  //   const res = await prisma.store.create({
  //     data: storeData
  //   });
  //   console.log(`Created store: ${res}`);
  // });
}

export async function main() {
  await seedData();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
})