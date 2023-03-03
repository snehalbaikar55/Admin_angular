import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-manageleads',
  templateUrl: './manageleads.component.html',
  styleUrls: ['./manageleads.component.scss']
})
export class ManageleadsComponent implements OnInit {
  LeadArr: any;
  p: number = 1;
  searchTerm: any;
  loader = false;

  constructor(
    private dataservice: DataService
  ) { }

  ngOnInit(): void {
    this.getleadsList();
  }

  getleadsList() {
    this.loader = true;
    this.dataservice.getLeadData().subscribe(res => {
      this.loader = false;
      //console.log(res);
      this.LeadArr = res;
    })
  }

  key: string ='ID';
  reverse: boolean =false;
  sort(key:any){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
