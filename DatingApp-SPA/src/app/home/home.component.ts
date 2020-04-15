import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode:boolean=false;
  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }

  registerCancel(registerModeParam:boolean){
      this.registerMode=registerModeParam;
  }

  toogleRegister(){
    this.registerMode=!this.registerMode;
  }

}
