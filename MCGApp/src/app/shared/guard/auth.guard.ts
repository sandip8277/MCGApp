import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import {
    ActivatedRouteSnapshot, CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private _router: Router, private _cookieService: CookieService) { }
    canActivate() {
        let isAuthenticated = this._cookieService.get('isLoggedInUser');
        if (isAuthenticated === 'true') {
            return true;
        }
        this._router.navigate(['login']);
        return false;
    }
}