import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import {NgForm} from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
user:User;
photoUrl:string;
@ViewChild("editForm",{static:true}) editForm:NgForm;
@HostListener("window:beforeunload",["$event"])
beforeUnload($event:any){
if(this.editForm.dirty){
  $event.returnValue=true;
}
}
  constructor(private route:ActivatedRoute,
              private alertify:AlertifyService,
              private userService:UserService,
              private authService:AuthService) { }

  ngOnInit() {
   this.route.data.subscribe(result=>{
     debugger;
     this.user=result['user'];
    });
   this.authService.currentPhotoUrl.subscribe(x=>this.photoUrl=x);
  }

  updateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid,this.user).subscribe(success=>{
      console.log(this.user);
      this.alertify.success("Profile updated Successfully");
      this.editForm.reset(this.user);
    },error=>{
      this.alertify.error("error update user");
    });
  }
  updateMainPhoto(photoUrl){
    debugger;
    this.user.photoUrl=photoUrl;
  }
}
