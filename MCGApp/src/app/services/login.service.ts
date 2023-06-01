import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class LoginService {

    constructor(private _http: HttpClient) {}

    login(){

        let result={
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImd0eSI6WyJwYXNzd29yZCJdLCJraWQiOiJkZGM2ZmY2ZDEifQ.eyJhdWQiOiI2YzA3Mjg0My0yN2Q5LTQ4OTEtYTFmMC1jMDBmM2Q3Y2RiMjIiLCJleHAiOjE2ODUzNjI1MjEsImlhdCI6MTY4NTM1ODkyMSwiaXNzIjoiaHR0cHM6Ly9hdXRoLnN5bXBob255aW5kYWkuY29tIiwic3ViIjoiNjQwZjNhN2EtYTZlNy00Y2JhLTgxOGEtYzVlNGNhMDM4YTYxIiwianRpIjoiNTJiZTI1YzEtODJhYi00NmRmLWFiNjItZDcxNTI0MTQ4NjZkIiwiYXV0aGVudGljYXRpb25UeXBlIjoiUEFTU1dPUkQiLCJlbWFpbCI6InRyaWNrZXR0QHN5bXBob255aW5kdXN0cmlhbC5haSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0cmlja2V0dCIsImFwcGxpY2F0aW9uSWQiOiI2YzA3Mjg0My0yN2Q5LTQ4OTEtYTFmMC1jMDBmM2Q3Y2RiMjIiLCJyb2xlcyI6W10sInNjb3BlIjoib2ZmbGluZV9hY2Nlc3MiLCJzaWQiOiJlMzQ4MmUzYS0xMDEwLTQ1NjMtYjM1Yy04MmQxN2NkZDEyNGMiLCJhdXRoX3RpbWUiOjE2ODUzNTg5MjEsInRpZCI6ImQ4NDA5ZDVmLWUzNTEtNDhmZC1iNzY2LTcxMjBlODhmNzE1MyIsInN1cGVyVXNlciI6ZmFsc2UsIm5hbWUiOiJ1bmRlZmluZWQsIHVuZGVmaW5lZCJ9.7gLWZYIEvb-GLHbZw8K2eCn-F9zTzMf1Sw6UIujlVU4",
            "expires_in": 3599,
            "grant_type": "password",
            "refresh_token": "BJM7ZzOctyvl7dt_si8ab4E1kn9zzIU_eiFJdnCwFJUds7mGD-UMbg"
        }
        return result;


      
    }
}