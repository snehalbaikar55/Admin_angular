import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { Manageregions} from '../manage-region/manage-region.model';
@Component({
  selector: 'app-manage-region',
  templateUrl: './manage-region.component.html',
  styleUrls: ['./manage-region.component.scss']
})
export class ManageRegionComponent implements OnInit {

  p: number = 1;
  public page = 1;
  public pageSize = 10;
  public regionsList: Array<Manageregions> = [];
  searchregions:string;
  regionsArr:any;
  totalCount: any;
  constructor(
    private dataservice : DataService,
  ) { }

  ngOnInit(): void {
    this.getRegionsData();
  }

  getRegionsData(){
    this.dataservice.getRegions().subscribe(res=>{
      this.regionsArr=res;
      // console.log(res, "RESULT");
      this.totalCount= this.regionsArr.length;
      this.regionsList= this.getRegionlist(this.totalCount);
      
    })
  }

  getRegionlist(count:any) {

    let list = [];
    
    for (let index = 0; index < count; index++) {
      list.push({random: Math.random()});
    }
    return list;
  }

  deleteRegionsData(region_id: any){
    Swal.fire({
      title: 'Are you sure?',
      //text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
  
        this.dataservice.deleteRegions(region_id).subscribe(res=>{
        Swal.fire('Deleted!', 'Team has been deleted.', 'success'); 
        this.getRegionsData();
        });
  
      }
    })
  }

}

