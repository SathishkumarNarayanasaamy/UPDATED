import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()

export class GlobalConfig {
}
export const GlobalVariable = Object.freeze({
    BASE_API_URL: environment.api_url,
    BASE_FOLDER_URL: 'api/',
    BASE_FRONTEND_URL: environment.frontend_url,
    PORT_NUMBER: '4200'
});
export const GlobalMessage = Object.freeze({
    1: 'Success.',
    2: 'Error.',
    3: 'Invalid.',
    4: 'Something went wrong. Please try again later.',

    11: 'There are some error with query.',

    101: 'Registration Successfull.',
    102: 'Invalid email.',
    103: 'Email already exist.',
    104: 'Invalid credentials.',
    105: 'Wrong Password.',
    106: 'Your account is inactive.',
    107: 'No Records Found.',
    108: 'Welcome to SeedLinked Portal.',
    109: 'Profile has been updated succussfully.',

    201: 'Record added succussfully.',
    202: 'Record updated successfully.',
    203: 'Record deleted successfully.'
});
