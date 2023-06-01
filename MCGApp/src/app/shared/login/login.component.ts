import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login.model';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [CookieService]
})
export class LoginComponent implements OnInit {

  public loginmodel?: LoginModel;
  name: string = 'rps';
  constructor(private _router: Router, private _loginService: LoginService, private _cookieService: CookieService) {
    this.name = 'rps';
    this.loginmodel = {} as LoginModel;
    this.loginmodel.username = 'rps';
    this.loginmodel.password = 'rps123';
  }

  ngOnInit(): void {

  }

  onLogin(event: any) {
    //this._loginService.login().subscribe((result) => { this.result = result; });
    var result = this._loginService.login();
    this._cookieService.deleteAll();
    this._cookieService.set('isLoggedInUser','true');
    this._cookieService.set('refresh_token', result['refresh_token']);
    this._cookieService.set('access_token', result['access_token']);

    this._router.navigate(['dashboard']);
  }

  ngOnDestroy() {
	}
}
