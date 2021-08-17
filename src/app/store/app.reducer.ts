import { createReducer, on } from '@ngrx/store';
import { receivedRecords } from './app.actions';

 
 export type AgentInfo = {
    accountID: number,
    firstname: string,
    lastname: string,
    company: string,
    splashMessage:string,
    customHeader: string
};

export type FloorPlan = {
    bedrooms: number,
    type: string,
    price: number
};

export type GeoCode = {
    Longitude: any,
    Latitude: any,
    Percision: string,
    IsValid: boolean
}

export type Property = {
    listID: number,
    order: number,
    propertyID: number,
    name: string,
    streetAddress: string,
    city: string,
    state: string,
    pets: boolean,
    washerDry: string,
    photo: string,
    favorite: boolean,
    highestSentCommissions: number,
    onsiteManager?: any,
    management?: any,
    proximity: number,
    section8: boolean,
    seniorHousing: boolean,
    studentHousting: boolean,
    floorplans:  FloorPlan[],
    highValueAmenities: string[],
    paidUtilities: string[],
    geocode: GeoCode

}

export type PropertyState = {
    agentInfo?: AgentInfo,
    records: Property[]
};


export const initialState : PropertyState = {
    agentInfo: undefined,
    records: []
};
 
const _appReducer = createReducer(
  initialState,
  on(receivedRecords, (state:any, action:any) => {
      console.log('inside function');
      return action.payload;
  }),
);
 
export function appReducer(state: any, action: any) {
  return _appReducer(state, action);
}