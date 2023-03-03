import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ManageusersService } from './manageusers.service';


@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.scss']
})
export class ManageusersComponent implements OnInit {

  p: number = 1;
  searchTerm: any;
  usersdetailsArr: any;

  constructor(private dataservice: ManageusersService) { }

  ngOnInit(): void {
    this.getUsersdetailsData();
  }

  getUsersdetailsData() {
    this.dataservice.getUsersdetails().subscribe(res => {
      //console.log(res);
      this.usersdetailsArr = res;
    })
  }

  deleteuser(ID: any) {

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
        this.dataservice.deleteuser(ID).subscribe(res => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          this.getUsersdetailsData();
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
