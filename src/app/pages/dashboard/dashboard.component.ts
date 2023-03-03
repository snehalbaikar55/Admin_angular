import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { circle, latLng, tileLayer } from 'leaflet';
import { walletOverview, investedOverview, marketOverview, walletlineChart, tradeslineChart, investedlineChart, profitlineChart, recentActivity, News, transactionsAll, transactionsBuy, transactionsSell } from './data';
import { ChartType } from './dashboard.model';
import { DataService } from 'src/app/service/data.service';
import { simplePieChart } from '../chart/apex/data';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 *  Dashboard Component
 */
export class DashboardComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  title: any;
  dataSource!: Object;
  walletOverview!: ChartType;
  investedOverview!: ChartType;
  marketOverview!: ChartType;
  walletlineChart!: ChartType;
  tradeslineChart!: ChartType;
  investedlineChart!: ChartType;
  profitlineChart!: ChartType;
  simplePiechart!: ChartType;
  recentActivity: any;
  News: any;
  transactionsAll: any;
  transactionsBuy: any;
  transactionsSell: any;
  // Coin News Slider
  timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    navText: ["", ""],
    dots: true,
    responsive: {
      680: {
        items: 4
      },
    }
  }
  TotalDevCount: any;
  TotalLeadCount : any;
  TodayLeadCount: any;
  length: any;
  TotalProperties: any;
  TotalFormCount: any;
  ActiveCount: any;
  DeactiveCount: any;
  Active =[];
  Deactive=[];
  ChartType: any;
  TotalActive: any;
  TotalDeactive: any;
  domaindata: any;
  count: any;
  local: any;
  staticDomain: any;
  all: any;
  constructor(
    private dataservice: DataService
  ) {
  }

  /**
   * Sale Location Map
   */
  options = {
    layers: [
      tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: -1,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      })
    ],
    zoom: 1.1,
    center: latLng(28, 1.5)
  };
  layers = [
    circle([41.9, 12.45], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([12.05, -61.75], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([1.3, 103.8], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
  ];
  

  ngOnInit(): void {
    /**
     * BreadCrumb 
     */

    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Dashboard', active: true }
    ];

    /**
     * Fetches the data
     */
    this.fetchData();
    this.DeveloperCount();
    this.LeadsCount();
    this.TodayLeadsCount();
    this.PropertiesCount();
    this.FormCountActive();
    this.getdomain();
    
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.walletOverview = walletOverview;
    this.investedOverview = investedOverview;
    this.marketOverview = marketOverview;
    this.walletlineChart = walletlineChart;
    this.tradeslineChart = tradeslineChart;
    this.investedlineChart = investedlineChart;
    this.profitlineChart = profitlineChart;
    this.recentActivity = recentActivity;
    this.News = News;
    this.transactionsAll = transactionsAll;
    this.transactionsBuy = transactionsBuy;
    this.transactionsSell = transactionsSell;
    this.simplePiechart = simplePieChart
  }
  
  DeveloperCount() {
    this.dataservice.TotalDeveloperCount().subscribe(res => {
      //console.log(res);
      this.TotalDevCount = res;
    })
  }
  LeadsCount() {
    this.dataservice.TotalLeadCount().subscribe(res => {
      //console.log(res);
      this.TotalLeadCount = res;
    })
  }
  TodayLeadsCount() {
    this.dataservice.TodayLeadCount().subscribe(res => {
      this.TodayLeadCount = res;
      this.TodayLeadCount= this.TodayLeadCount.length;
      //console.log(this.TodayLeadCount);
    })
  }
  PropertiesCount() {
    this.dataservice.TotalPropertyCount().subscribe(res => {
      //console.log(res);
      this.TotalProperties = res;
    })
  }

  FormCountActive() {
    this.dataservice.DomainActiveCount().subscribe(res => {
      this.ActiveCount = res;
      this.Active = this.ActiveCount.length;
      //console.log(this.Active);

      this.dataservice.DomainDeactiveCount().subscribe(res => {
        this.DeactiveCount = res;
        this.Deactive = this.DeactiveCount.length;
        //console.log(this.Deactive);

        this.ChartType = {
          chart: { height: 320, type: "pie" },
          series: [this.Active,this.Deactive],
          labels: ["Active", "Deactive", ],
          colors: ["#4ba6ef", "#fd625e"],
          legend: {
              show: !0,
              position: "bottom",
              horizontalAlign: "center",
              verticalAlign: "middle",
              floating: !1,
              fontSize: "14px",
              offsetX: 0,
          },
          responsive: [
              {
                  breakpoint: 600,
                  options: { chart: { height: 240 }, legend: { show: !1 } },
              },
          ],
      };
      })
    })
  }

  getdomain(){
    this.dataservice.getdomain().subscribe(res=>{
      this.domaindata = res;
      this.count = JSON.stringify(this.domaindata);
       this.local = ((this.count.match(new RegExp("horizonfp.com", "g")) || []).length);
       this.all = this.domaindata.length;
       this.staticDomain = (this.all - this.local);
         //console.log(this.staticDomain);
     
      })
  }
}
