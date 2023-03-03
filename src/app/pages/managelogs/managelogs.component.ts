import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-managelogs',
  templateUrl: './managelogs.component.html',
  styleUrls: ['./managelogs.component.scss']
})
export class ManagelogsComponent implements OnInit {
  LogsArr: any;
  p: number = 1;
  searchTerm:any
  loader = false;

  constructor(
    private dataservice: DataService
  ) { }

  ngOnInit(): void {
    this.getlogsList();
  }
  getlogsList(){
    this.loader = true;
    this.dataservice.getLogsData().subscribe(res=>{
      this.loader = false;
       //console.log(res);
       this.LogsArr = res;
    })
  }
  key: string ='PropertyID';
  reverse: boolean =false;
  sort(key:any){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
