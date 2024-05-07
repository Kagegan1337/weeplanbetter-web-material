export interface SignUpRequest {
  person: PersonDto;
  accountDto: AccountDto;
}

export interface PersonDto {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  birth: Date;
  email: string;
  telPrivate: string;
  telBusiness: string;
  privateAddress: AddressDto;
  invoiceAddress: AddressDto;
}

export interface AccountDto {
  userName: string;
  password: string;
  isBusiness: boolean;
}

export interface AddressDto {
  country: string;
  zipcode: string;
  city: string;
  street: string;
  addition: string;
  number: string;
}
