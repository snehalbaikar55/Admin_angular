import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Regions} from '../region/region.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
 
  regions = new Regions();
  error = new Regions();

  constructor(private dataservice: DataService,
    private route: Router,
    // private Token:TokenService

    ) { }

  ngOnInit(): void {
  }


  submitregion(){
    this.dataservice.registerRegions(this.regions).subscribe(
        data=>this.handleResponse(data),
        error=>this.handleError(error)
      );
    }
  
  
    handleResponse(data : any){
      // this.Token.handle(data.access_token);
      Swal.fire('Added!', 'Region has been added.', 'success'); 
      this.route.navigate(['/manage_region']);
    }
  
     
    handleError(error : any){
      this.error = error.error.errors;
    }

}