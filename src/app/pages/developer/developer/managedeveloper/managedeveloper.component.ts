import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
 
 
@Component({
  selector: 'app-managedeveloper',
  templateUrl: './managedeveloper.component.html',
  styleUrls: ['./managedeveloper.component.scss']
})
export class ManagedeveloperComponent implements OnInit {
 
  developerArr: any;
 
  constructor(
    private dataservice: DataService,
  ) { }
 
  ngOnInit(): void {
    this.getDeveloperList();
  }
 
  getDeveloperList(){
    this.dataservice.getDeveloper().subscribe((res: any)=>{
      // console.log(res);
       this.developerArr = res;
    })
  }
 
  deleteDeveloperRow(ID:number){
 
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t delete this Developer!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Yes, delete it!'
      }).then(res => {
        if (res.value) {
            this.dataservice.deleteDeveloper(ID).subscribe(response => {
              Swal.fire('Deleted!', 'Developer has been deleted.', 'success');
              this.getDeveloperList();
            });
        }
      });
   }
 
 
}
