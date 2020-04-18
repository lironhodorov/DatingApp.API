import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() registerCancel=new EventEmitter();
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
    this.authService.register(this.model).subscribe(resp=>{
      console.log('register success');
    },error=>{
      console.log(error);
      console.log('register failed');
    });
  }

  cancel(){
    this.registerCancel.emit(false);
    console.log('cancelled');
  }

}
