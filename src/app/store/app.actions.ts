import { createAction, props, Action } from '@ngrx/store';
import { PropertyState } from './app.reducer';

export enum PropertyActionTypes {
    ReceivedRecords = '[Properties] receivedRecords'
};

export const receivedRecords = createAction(
    PropertyActionTypes.ReceivedRecords,
    props<{payload: PropertyState}>()
);

