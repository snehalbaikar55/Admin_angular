import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { subRegions} from './subregion.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-region',
  templateUrl: './sub-region.component.html',
  styleUrls: ['./sub-region.component.scss']
})
export class SubRegionComponent implements OnInit {

  region_id :any; 
  regionsArr :any;
  subregions = new subRegions();
  error = new subRegions();

  constructor(private dataservice: DataService,
    private route: Router,
    private router:Router

    ) { }

  ngOnInit(): void {
    // this.getSubregionData();
    this.getRegion();
  }

  getRegion(){
    this.dataservice.getRegionslist().subscribe(res=>{
      this.regionsArr = res;
    })
  }

  getRegionid(event : any){
    var obj = {
      region_id : event.target.value
    }

    this.dataservice.registerSubregions(this.subregions).subscribe(res =>{
     
    })
  }


  submitsubregion(){
    console.log(this.subregions)
    this.dataservice.registerSubregions(this.subregions).subscribe(
        
       
        data=>this.handleResponse(data),
        error=>this.handleError(error)
      );
    }
  
  
    handleResponse(data: Object){
      // console.log(data);
      // this.Token.handle(data.access_token);
      Swal.fire('Added!', 'Subegion has been added.', 'success'); 
        this.router.navigate(['/manage_sub_region']);
    }
  
     
    handleError(error: { error: { errors: subRegions; }; }){
      this.error = error.error.errors;
    }


}