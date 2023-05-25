import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginModel} from '../../models/login.model';

@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginmodel?:LoginModel ;
   name:string='rps';
  constructor(private _router: Router) { 
    this.name='rps';
    this.loginmodel={} as LoginModel;
    this.loginmodel.username='rps';
    this.loginmodel.password='rps123';
  }
  
  ngOnInit(): void {
    
  }

  onLogin(event: any) {
  this._router.navigate(['dashboard']);
  }
}
