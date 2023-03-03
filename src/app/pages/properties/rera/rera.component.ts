import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { Rera } from './rera.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-rera',
  templateUrl: './rera.component.html',
  styleUrls: ['./rera.component.scss']
})
export class ReraComponent implements OnInit {

  rera = new Rera;
  PropertyID: any;
  ID: any;
  data: any;
  msg: any;
  err: any;
  error: any;
  rerano: any;
  modalContent: undefined;
  reradetails: any;
  reradata: any;
  rera_id: any;
  repos: any;
  errorMessage: any;
  errordetails: any;
  validationForm: any;
  formBuilder: any;
  reradata1: any;
  email: any;
  loggerdata: any;
  loggername: any;
  Name: any;
  property: any;
  propertydata: any;
  logs = new Logs;
  deletedata: any;
  updatedata: any;
  adddata: any;
  // loading: false | undefined;
  constructor(
    private dataservice: DataService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.rera.PropertyID = this.PropertyID;
    this.getProppertie();
    this.getreras();
    this.getupdatedby();

  }

  getupdatedby() {
    this.email = sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res => {
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
      //console.log("rera",this.loggername);
      this.rera.updatedby = this.loggername;
    })
  }
  openModal(content: any) {
    this.modalService.open(content);
  }


  openDetails(edit: any, data: any) {
    // console.log(data);
    this.reradetails = data;
    this.reradata = this.reradetails;
    this.modalService.open(edit, this.reradata);

  }
  updateRera() {
    this.reradata1 = this.reradata
    this.rera_id = this.reradata.ID;
    this.dataservice.editRera(this.rera_id, this.reradata1).subscribe(
      data => this.handleResponse1(data),
      error => this.handleError1(error)
    )
  }
  handleResponse1(data: any) {
    this.updatedata = data;
    this.closeModal(content);
    this.reloadComponent();
    this.addUpdationToLogs(this.updatedata);
    //console.log(this.updatedata);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Rera has been Updated.',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  handleError1(error: any) {
    // console.log(error);
    this.error = error.error.errors;
  }

  deleteReraRow(data: any) {
    this.deletedata = data;
    //console.log(this.deletedata);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t delete this Rera!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.dataservice.deleteRera(this.deletedata.ID).subscribe(response => {
          this.adddeleteToLogs(this.deletedata);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Rera has been deleted',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getreras();
        });
      }
    });
  }
  getreras() {
    this.dataservice.getRera(this.PropertyID).subscribe(res => {
      //console.log(res);
      this.rerano = res;
    })
  }
  addRerano() {
    this.dataservice.addrera(this.rera).subscribe(
      (response) => {
        this.repos = response;
        this.reloadComponent();
        this.closeModal(content);
        this.addtologs(this.repos.Rera);
        //console.log(this.repos);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Rera has been Added.',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        this.error = error.error.errors;
      })
  }

  addtologs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.reradata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Rera";
      this.logs.Msg = this.reradata + " - rera number has been added to " + this.logs.PropertyName + " by " + this.logs.updatedby;
      // console.log(this.logs);
      this.dataservice.addLogs(this.logs).subscribe(res => {
        // console.log(res);
      })
    })
  }

  addUpdationToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.reradata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Rera";
      this.logs.Msg = "Rera number of " + this.logs.PropertyName + " has been updated to " + this.reradata.Rera + " by" + this.logs.updatedby;
      // console.log(this.logs);
      this.dataservice.addLogs(this.logs).subscribe(res => {
        // console.log(res);
      })
    })
  }

  adddeleteToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.reradata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Rera";
      this.logs.Msg = this.reradata.Rera + " Rera number of " + this.logs.PropertyName + " has been deleted by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

  reloadComponent() {
    let ID = this.PropertyID;
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  getProppertie() {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      //  console.log(res);
    })
  }

}

function content(content: any) {
  throw new Error('Function not implemented.');
}

