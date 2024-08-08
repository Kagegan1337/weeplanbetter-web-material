import {AddressDto} from "../general/address-dto";

export interface EventOverviewEntry {
  eventId: string;
  name: string;
  address: AddressDto;
  start: Date;
  end: Date;
  image: {
    url: string;
  };
}
