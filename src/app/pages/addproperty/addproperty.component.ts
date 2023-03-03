import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.scss']
})
export class AddpropertyComponent implements OnInit {
  propertytype : any;


  checkboxes: any[] = [
    { name: 'Premium Project', value: 'PRMPRJ', checked: false },
    { name: 'Focused Project', value: 'FCSPRJ', checked: false },
    { name: 'New Project', value: 'NWPRJ', checked: false },
    { name: 'AOP Project', value: 'AOP', checked: false },
    { name: 'Under Construction', value: 'UCSN', checked: false },
    { name: 'Ready To Move', value: 'RTM', checked: false },
  ];

  // error: any;
 public error = {
    Theme: null,
    PropertyName: null
 };

  PropertyTypeData = [
    "Commercial Apartments",
    "Residential Apartments"
  ]

  constructor(
    private dataservice: DataService,
    private router: Router,
    private modalService: NgbModal

  ) { }
  public form = {
    PropertyName: null,
    Theme: null,
    shortName: [],
    PropertyType: null
  }


  ngOnInit(): void {
  }

  onPropertyTypeChange(data : any) {
    this.propertytype = data;
  }

  CheckAllOptions() {
    if (this.checkboxes.every((val) => val.checked == true))
      this.checkboxes.forEach((val) => {
        val.checked = false;
      });
    else
      this.checkboxes.forEach((val) => {
        val.checked = true;
      });
    
    this.form.shortName = this.checkboxes;
  }

  CheckOptions() {
    let getChecked = this.checkboxes.filter((item) => item.checked);
    this.form.shortName = this.checkboxes;
  }


  onSubmit() {
    this.dataservice.addproperty(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
    
  }

  handleResponse(data: any) {
    this.closeModal(content);
    //this.reloadComponent();
    this.router.navigateByUrl('/manageproperties');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Add Property Has Been Added',
      showConfirmButton: false,
      timer: 1500,
    })
    
  }

  handleError(error: any) {
    
    this.error = error.error.errors;
  }
  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

}


function content(content: any) {
  throw new Error('Function not implemented.');
}
