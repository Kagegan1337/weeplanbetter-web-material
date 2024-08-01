export interface EventCreationDto {
  type: string;
  name:string
  von:string;
  bis:string;
  address: EventCreationAddressDto;
  contributors: string[];
}

export interface EventCreationAddressDto {
  street: string;
  number: string;
  zip: string;
  city: string;
  country: string;
  addition: string;
}
