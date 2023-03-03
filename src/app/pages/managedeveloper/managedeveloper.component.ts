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
  p: number = 1;
  searchTerm: any;

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [10, 25, 50,100];
  
  constructor(
    private dataservice: DataService,
  ) { }

  ngOnInit(): void {
    this.getDeveloperList();
  }

  getDeveloperList() {
    this.dataservice.getDeveloper().subscribe((res: any) => {
      // console.log(res);
      this.developerArr = res;
    })
  }

  deleteDeveloperRow(ID: number) {

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

  key: string = 'PropertyID';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  handlePageSizeChange(event:any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getDeveloperList();
  }
}
