import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class SharedService {
    public sharedServiceListner=new Subject<any>();
    constructor() {}
}