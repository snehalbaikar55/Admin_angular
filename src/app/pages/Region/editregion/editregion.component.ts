import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { editregion } from './editregion.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editregion',
  templateUrl: './editregion.component.html',
  styleUrls: ['./editregion.component.scss']
})

export class EditregionComponent implements OnInit {
  region_id: any;
  regionData: any;
  editregion = new editregion;
  myRegionName: any;
  region_name: any;

  constructor(
    private route:ActivatedRoute,
    private dataservice : DataService,
    private router:Router
  ) { }

  ngOnInit(): void {
    let region_id = this.route.snapshot.params.id;

    this.region_id = region_id;
    this.getSelectedRegion();
  }

  onSubmit(){
    this.regionData.region_name = this.region_name;
    this.dataservice.getUpdateRegion(this.regionData.region_id, this.regionData).subscribe(res=>{

      Swal.fire('Updated!', 'Region has been updated.', 'success'); 
      this.router.navigate(['/manage_region']);
    });
  }

  getSelectedRegion() {
    this.dataservice.getOneRegion(this.region_id).subscribe(res=>{
      
      this.regionData = res;
      this.region_name = this.regionData.region_name;
    });
  }

  key: string ='ID';
  reverse: boolean =false;
  sort(key:any){
    this.key = key;
    this.reverse = !this.reverse;
  }

}
