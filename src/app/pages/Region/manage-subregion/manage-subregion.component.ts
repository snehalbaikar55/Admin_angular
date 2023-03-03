import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { subRegions } from '../sub-region/subregion.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import {searchregionsPipe} from '../manage-subregion/searchregions.pipe'

@Component({
  selector: 'app-manage-subregion',
  templateUrl: './manage-subregion.component.html',
  styleUrls: ['./manage-subregion.component.scss']
})
export class ManageSubregionComponent implements OnInit {

  public page = 1;
  public pageSize = 10;
  public subregionList: Array<subRegions> = [];
  subregionsArr:any;
  totalCount: any;
  searchregions:string;
  searchsubregions:string;
  /**Sorting**/
  order: string = 'info.name';
  reverse: boolean = false;
  sortedCollection: any[];
  caseInsensitive: boolean = false;
 /**Searching**/
//  SearchregionsPipe = new searchregionsPipe;
  region_name_search:"";
  subregion_name_Search: "";
  searchbyReg:"";

  constructor(private dataservice:DataService, /*orderPipe: OrderPipe*/) { 
    /*this.sortedCollection = orderPipe.transform(this.subregionsArr, 'info.name');*/
  }

  ngOnInit(): void {
    this.getSubregionsData();
  }

  getSubregionsData(){
    this.dataservice.getSubregions().subscribe(res=>{
      this.subregionsArr=res;
      this.totalCount= this.subregionsArr.length;
      this.subregionList = this.getSubregionlist(this.totalCount);
    })
  }

  getSubregionlist(count: number) {

    let list = [];
  
  
    //console.log(count);

    for (let index = 0; index < count; index++) {
      list.push({random: Math.random()});
    }
    return list;
  }

  deleteSubregionsData(subproject_id: any){
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
  
        this.dataservice.deleteSubregions(subproject_id).subscribe(res=>{
        Swal.fire('Deleted!', 'Subregion has been deleted.', 'success'); 
        this.getSubregionsData();
        });
  
      }
    })
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

}