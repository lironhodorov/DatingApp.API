import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../../../_services/auth.service';
import {AlertifyService} from '../../../_services/alertify.service';
import {User} from '../../../_models/user';
import { UserService } from '../../../_services/user.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;
  constructor(private authService:AuthService,private userService:UserService,private alertifyService:AlertifyService) { 

  }

  ngOnInit() {
  }

  sendLike(likeeId:number){
    this.userService.sendLike(this.authService.decodedToken.nameid,likeeId).subscribe(data=>{
      this.alertifyService.success("you liked "+this.user.knownAs);
    },error=>{
      this.alertifyService.error(error);
    });
  }

}
