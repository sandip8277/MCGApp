import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private cos: CookieService,private _router: Router,private _sharedService:SharedService) { }

  ngOnInit(): void {
   
  }
  
  onLogout(){
    this.cos.deleteAll();
    this._router.navigate(['login']);
  }
}
