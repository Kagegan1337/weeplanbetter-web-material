import {AddressDto} from "../general/address-dto";

export interface EventCreationDto {
  type: string;
  name: string;
  von: Date;
  bis: Date;
  contributors: string[];
  address: AddressDto;
}
