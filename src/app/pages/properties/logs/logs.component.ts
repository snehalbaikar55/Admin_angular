import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  PropertyID: any;
  logsArr: any
  p: number = 1;
  searchTerm: any
  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.getLogsDetails();
  }
  getLogsDetails() {
    this.dataservice.getLogosByID(this.PropertyID).subscribe(res => {
      this.logsArr = res;
      //console.log("this is logsArr: ",this.logsArr);

    })
  }

  key: string ='ID';
  reverse: boolean =false;
  sort(key:any){
    this.key = key;
    this.reverse = !this.reverse;
  }

  back(){
    this.router.navigate(['/addData/'+this.PropertyID]);
   }

}
