import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  public signupForm :any=FormGroup;
  visable:boolean=true;
  changetype:boolean=true;
  constructor(private fb:FormBuilder,
    private authservice:AuthserviceService, 
    private toast:NgToastService,
    private router:Router) { }

  ngOnInit(): void {

this.signupForm=this.fb.group({

 email:['',[Validators.email, Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
  password:['',[Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern("[0-9]+$")]],
  UserName:['',[Validators.required, Validators.minLength(4)]],
});


  }

  show(){
this.visable=!this.visable;
this.changetype=!this.changetype
  }
 login(){
  
  let f=this.signupForm.value.email;
  let p=this.signupForm.value.password;

this.authservice.login(f,p).subscribe((el:any)=>{
  console.log(el);
  if(el){
    this.toast.success({summary:'login success',duration:2000,detail:" Loginsuccess"});
    this.signupForm.reset();
  this.router.navigate(['dashboard']);
  const user =el.find((a:any)=>{
             return a.uname == this.signupForm.value.email && a.password == this.signupForm.value.password
          },(err:any)=>{
            this.toast.error({detail:"Login failed",duration:2000,summary:'login failed'})
          });
 
  }
},err=>{
  console.log(err);
  this.toast.error({detail:"Login failed",duration:2000,summary:'some thing issue'})
})

  }
}