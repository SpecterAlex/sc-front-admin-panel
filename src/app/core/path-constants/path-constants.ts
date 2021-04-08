import { environment } from 'src/environments/environment';

export class PathConstants {
  // auth
  static LOGIN = 'auth/login';
  static CLOSE_SESSION = 'auth/logout';
  static RECOVERY_PASSWORD = '';
  static CHANGE_PASSWORD = '';
  static REFRESH_TOKEN = '';

  // users
  static USERS = 'users';
  static USER_UPDATE = 'users/{userId}';
  static USER_GET = 'users/{userId}';
  static USER_DELETE = 'users/{userId}';

  // customers
  static CUSTOMERS = 'customers';
  static CUSTOMER_UPDATE = 'customers/{customerId}';
  static CUSTOMER_GET = 'customers/{customerId}';
  static CUSTOMER_DELETE = 'customers/{customerId}';

  // addresses
  static ADDRESSES = 'addresses';
  static ADDRESS_UPDATE = 'addresses/{addressId}';
  static ADDRESS_DELETE = 'addresses/{addressId}';
  static ADDRESS_GET = 'addresses/{addressId}';

  // orders
  static ORDERS = '';

  // products
  static PRODUCTS = 'products';
  static PRODUCT_UPDATE = 'products/{productId}';
  static PRODUCT_DELETE = 'products/{productId}';
  static PRODUCT_GET = 'products/{productId}';

  // production lines
  static PRODUCTION_LINES = 'productionlines';
  static PRODUCTION_LINE_UPDATE = 'productionlines/{productionLineId}';
  static PRODUCTION_LINE_DELETE = 'productionlines/{productionLineId}';
  static PRODUCTION_LINE_GET = 'productionlines/{productionLineId}';

  // production stations
  static PRODUCTION_STATIONS = 'productionstations';
  static PRODUCTION_STATION_UPDATE = 'productionstations/{productionStationId}';
  static PRODUCTION_STATION_DELETE = 'productionstations/{productionStationId}';
  static PRODUCTION_STATION_GET = 'productionstations/{productionStationId}';

  // production shifts
  static PRODUCTION_SHIFTS = 'productionshifts';
  static PRODUCTION_SHIFT_UPDATE = 'productionshifts/{productionShiftId}';
  static PRODUCTION_SHIFT_DELETE = 'productionshifts/{productionShiftId}';
  static PRODUCTION_SHIFT_GET = 'productionshifts/{productionShiftId}';

  // catalogs
  static GET_SUBURBS = 'catalogs/zipcodes/{zipCode}';



  // return API endpoint
  public static getPath(path: string): string {
    return `${environment.apiUrl}${path}`;
  }

  public static getPathPublic(srcImage: string): string {
    return `${environment.apiUlrPublic}${srcImage}`;
  }
}
