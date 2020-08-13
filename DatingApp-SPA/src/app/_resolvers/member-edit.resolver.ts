import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {catchError} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import {AlertifyService} from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
@Injectable()

export class MemberEditResolver implements Resolve<User>{
    constructor(private userService:UserService,private authService:AuthService,
        private alertify:AlertifyService,private router:Router) {} 

        resolve(route: ActivatedRouteSnapshot): Observable<User>  {
            debugger;
            return this.userService.getUser(this.authService.decodedToken.nameid).pipe(catchError(error=>
            {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/members']);
                return of(null);
            }));
        }
}