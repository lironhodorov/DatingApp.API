import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {catchError} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import {AlertifyService} from '../_services/alertify.service';
@Injectable()

export class ListsResolver implements Resolve<User[]>{
    pageNumber=1;
    pageSize=5;
    likeParam='Likers';

    constructor(private userService:UserService,
        private alertify:AlertifyService,private router:Router) {} 

        resolve(route: ActivatedRouteSnapshot): Observable<User[]>  {
            return this.userService.getUsers(this.pageNumber,this.pageSize,null,this.likeParam).pipe(catchError(error=>
            {
                this.alertify.error('Problem retrieving data of users');
                this.router.navigate(['/home']);
                return of(null);
            }));
        }
}