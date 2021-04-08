export interface INavLink {
  id?: string;
  routerLink?: string;
  title?: string;
  icon?: string;
  navLinks?: INavLink[];
}
export interface IPatternInterface {
  pattern: RegExp;
  message: string;
}
export interface IResponse<T> {
  status: string;
  statusCode?: number;
  message: string;
  data: T;
}
export interface IConfigPage {
  id: string;
  title: string;
  titleList: string;
  titleButtonAdd: string;
  linkCreate: string;
  linkUpdate: string;
  urlFetchInfo: string;
}

export interface IListPaginationData<T> {
  data: T[];
  total: number;
}
export interface ILogin {
  userId?: number;
  access_token: string;
  expires_at: Date;
  token_type: string;
  roles?: string[];
  user?: IUser;
}
export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  _full_name?: string;
  email: string;
  phone_number: string;
  created_at: Date;
  deteled_at: Date;
  updated_at: Date;
}
export interface IState {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
export interface ICity {
  id: number;
  name: string;
  state_id: number;
  created_at: Date;
  updated_at: Date;
  state?: IState;
}
export interface IZipCode {
  id: number;
  zipcode: string;
  city_id: number;
  created_at: Date;
  updated_at: Date;
  city?: ICity;
  suburbs?: ISuburb[];
}
export interface ISuburb {
  id: number;
  name: string;
  zipcode_id: number;
  created_at: Date;
  updated_at: Date;
  zipcode?: IZipCode;
}
export interface IAddress {
  id: number;
  street: string;
  number: number;
  suburb_id: number;
  phone_number: string;
  customer_id: number;
  invoice: boolean;
  suburb?: ISuburb;
  _edit?: boolean;
  zip_code?: string;
  created_at: Date;
  deteled_at: Date;
  updated_at: Date;
}
export interface ICustomer {
  id: number;
  name: string;
  rfc: string;
  email: string;
  phone_number: string;
  contact_name: string;
  contact_number: string;
  addresses: IAddress[];
  created_at: Date;
  deteled_at: Date;
  updated_at: Date;
}
export interface IOrder {
  id: number;
}
export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  url_image: string;
  created_at: Date;
  deteled_at: Date;
  updated_at: Date;
}
export interface IProductionLine {
  id: number;
  name: string;
  code: string;
  created_at: Date;
  deteled_at: Date;
  updated_at: Date;
}
export interface IProductionStation {
  id: number;
  name: string;
  code: string;
  capacity_per_hour: number;
  production_line_id: number;
  productionLine?: IProductionLine;
}
export interface IProductionShift {
  id: number;
  name: string;
  code: string;
  description: string;
  total_hours: number;
}
