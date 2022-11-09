import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthserviceService } from '../authservice.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm :any=FormGroup;
  visable:boolean=true;
  changetype:boolean=true;
  constructor(private fb:FormBuilder,
    private authservice:AuthserviceService, 
    private toast:NgToastService,
    private router:Router) { }

  ngOnInit(): void {

this.loginForm=this.fb.group({

  username:['',[Validators.email, Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
  password:['',[Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern("[0-9]+$")]],
});


  }

  show(){
this.visable=!this.visable;
this.changetype=!this.changetype
  }
 login(){
  this.authservice.login(this.loginForm.value.username,this.loginForm.value.password).subscribe((res:any)=>{

    console.log(res);
    this.toast.success({duration:2000,summary:"success",detail:res.message})
    this.router.navigate(['dashboard'])
  },err=>{
    this.toast.error({duration:2000,summary:"unauthorized",detail:err.message})
  })

 }
 

 }