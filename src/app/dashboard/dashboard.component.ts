import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
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
chart:any
  summarylist: any;
  weekdays: any;

  constructor(private auth:AuthserviceService) { }

  ngOnInit(): void {
    // reports chart

    this.auth.chart().subscribe((res:any)=>{
      console.log(res.data.last7Days);
    
     
      this.chart=res.data.last7Days;
  

      if(this.chart!=null){
        this.weekdays=this.chart;
      }
      this.createChart(this.weekdays);
    })
    this.auth.oredrList().subscribe((res:any)=>{
      console.log(res);
      this.storeData=res.data;
  this.orderslist();
  this.createChart(this.weekdays);
    
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
createChart(weekdays:any){
  
  this.chart = new Chart("reportsChart", {
    type: 'line', //this denotes tha type of chart

    data: {// values on X-Axis

       datasets: [
        {
          label: "Sales",
          data: weekdays,
          backgroundColor: 'blue'
        },
        {
          label: "Profit",
          data: ['542', '542', '536', '327', '17',
                 '0.00', '538', '541'],
          backgroundColor: 'limegreen'
        }  
      ]
    },
    options: {
      aspectRatio:2.5
    }
    
  });
}
}
