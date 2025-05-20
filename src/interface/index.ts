export interface StoreType {
  id: number;
  phone: string | null;
  storeType: string | null;
  name: string | null;
  category: string | null;
  longitude: string | null;
  latitude: string | null;
  address: string | null;
  foodCertifyName: string | null;
}

export interface StoreAPIResponse {
  page: number;
  data?: StoreType[];
  totalCount?: number;
  totalPage?: number;
}