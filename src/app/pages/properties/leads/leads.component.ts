import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  leadsArr: any;
  PropertyID: any;
  p: number = 1;
  searchTerm: any

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.getleadsArrDetails();
  }

  getleadsArrDetails() {
    this.dataservice.getLeadByID(this.PropertyID).subscribe(res => {
      this.leadsArr = res;
      //console.log("this is leadsArr: ",this.leadsArr);

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
