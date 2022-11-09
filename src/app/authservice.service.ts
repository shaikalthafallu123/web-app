import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
url='http://13.76.214.165:8001/api/login'
  constructor(private http:HttpClient) { }
  login(username:string,password:string){
    return this.http.post(this.url,{
      username,password
    }).pipe(
      map(user=>{
        localStorage.setItem('token',JSON.stringify(user))
        return user;

      })
    )

  }
  totalOrders(){
    return this.http.get<any[]>('http://13.76.214.165:8001/api/analytics/summary').pipe(
      map(res=>{
     
        return res
      })
    )
  }

  oredrList(){
    return this.http.get('http://13.76.214.165:8001/api/orders?page=1&limit=15&order_status=');
  }



  chart(){
    return this.http.get('http://13.76.214.165:8001/api/analytics/last7Days');
  }
}
