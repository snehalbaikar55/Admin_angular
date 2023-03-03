import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { subRegions } from '../sub-region/subregion.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editsubregion',
  templateUrl: './editsubregion.component.html',
  styleUrls: ['./editsubregion.component.scss']
})
export class EditsubregionComponent implements OnInit {
  subregions= new subRegions;
  regionsArr :any;
  subregionid:any;
  data:any;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private dataservice:DataService
  ) { }

  ngOnInit(): void {
    this.subregionid=this.route.snapshot.params.id;
    this.getSubregionData();
    this.getRegion();
  }

  getSubregionData(){
    this.dataservice.getOneSubregions(this.subregionid).subscribe(res=>{
      this.data=res;
      this.subregions=this.data;
  })
  }


  getRegion(){
    this.dataservice.getRegionslist().subscribe(res=>{
      this.regionsArr = res;
      
    })
  }

  updateregions(){
    console.log('updateregions');
    this.dataservice.updateSubregions(this.subregionid,this.subregions).subscribe(res=>{
          Swal.fire('Updated!', 'Sub-Region has been updatd.', 'success');
          this.router.navigate(['/manage_sub_region']);
    })
  }

}
