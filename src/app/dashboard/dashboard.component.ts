import { Component, Input, OnInit } from '@angular/core';
import { from, toArray } from 'rxjs';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
storeData:any;
seacrhfilter:any;
countlist:any;
salelist:any;
totalist:any
total:number=145;
  summarylist: any;

  constructor(private auth:AuthserviceService) { }

  ngOnInit(): void {
    this.auth.oredrList().subscribe((res:any)=>{
      console.log(res);
      this.storeData=res.data;
  this.orderslist();
  this.chartpage();
    
    })
  }
orderslist(){
  this.auth.totalOrders().subscribe((el:any)=>{
    console.log(el.data)
    console.log(el.data.overview.average_sale,'111')
    this.countlist=el.data.overview.new_orders;
    console.log(this.countlist,'countlist')
    this.salelist=el.data.overview.average_sale;
    this.totalist=el.data.overview.total_earnings;
    this.summarylist=el.data.summary;
    console.log(this.summarylist,'ll')
 
  })
}
 chartpage(){
  this.auth.chart().subscribe((res:any)=>{
    console.log(res);
    
  })
 }
}
