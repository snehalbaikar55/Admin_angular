import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
//import { Table } from '@fullcalendar/daygrid';
//import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
//import { dataTableSortableDirective, SortEvent } from '../tables/datatable/datatable-sortable.directive';
import { DataTableService } from '../tables/datatable/datatable.service';
import { Clientdetails, Propertydetails } from './manageproperties.model';

@Component({
  selector: 'app-manageproperties',
  templateUrl: './manageproperties.component.html',
  styleUrls: ['./manageproperties.component.scss']
})
export class ManagepropertiesComponent implements OnInit {
  propertiesArr: any;
  p: number = 1;
  searchTerm: any
  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    this.getPropertiessList();
  }

  getPropertiessList() {
    this.dataservice.getProperties().subscribe(res => {
      //console.log(res);
      this.propertiesArr = res;
    })
  }

  deleteproperty(ID: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.dataservice.deleteProperty(ID).subscribe(res => {
          Swal.fire('Deleted!', 'Your Property has been deleted.', 'success');
          this.getPropertiessList();
        });
      }
    })
  }

  key: string ='ID';
  reverse: boolean =false;
  sort(key:any){
    this.key = key;
    this.reverse = !this.reverse;
  }

}
