import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() registerCancel=new EventEmitter();
  constructor(private authService:AuthService,private alertify:AlertifyService) {
   }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
    this.authService.register(this.model).subscribe(resp=>{
      this.alertify.success('register success');
    },error=>{
      this.alertify.error(error);
    });
  }

  cancel(){
    this.registerCancel.emit(false);
    console.log('cancelled');
  }

}