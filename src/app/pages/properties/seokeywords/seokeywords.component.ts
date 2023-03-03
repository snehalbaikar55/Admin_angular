import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { error, Seok } from './seokeywords.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-seokeywords',
  templateUrl: './seokeywords.component.html',
  styleUrls: ['./seokeywords.component.scss']
})
export class SeokeywordsComponent implements OnInit {


  PropertyID: any;
  seok = new Seok;
  error = new error;
  data: any;
  seokdetails: any;
  Msg = "message";
  editID: any;
  editseokdetails: any;
  editseoid: any;
  SEO: any;
  data1: any[] = [];
  userDisplayName: any;
  userdata: any;
  user: any;
  email: any;
  loggerdata: any;
  loggername: any;
  Name:any;
  property: any;
  propertydata: any;
  seodata: any;
  logs = new Logs;
  img: any;
  deletedata: any;
  adddata: any;
  updatedata: any;
  constructor(
    private dataservice: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    //console.log(this.PropertyID);
    this.seok.PropertyID = this.PropertyID;
    this.getseokeywords();
    this.getPropperties();
    this.getupdatedby();
    
  }


  getPropperties() {
    this.dataservice.getProppertiesD(this.PropertyID).subscribe(res => {
      this.data = res;
      this.seok = this.data;
      this.seok.PropertyName = this.seok.PropertyName;
      this.seok.Msg = "Data Of " + this.seok.PropertyName + " Added ";

    })
  }
  getupdatedby() {
    this.email =  sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
        //console.log("seok",this.loggername);
      this.seok.updatedby = this.loggername;
    })
  }

  getseokeywords() {
    this.dataservice.getkeywords(this.PropertyID).subscribe(res => {
      this.seokdetails = res;
      // console.log(this.seokdetails);

    })
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  onSubmit() {
    this.dataservice.addkeywords(this.seok).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data: any) {
    this.adddata= data;
    this.addtologs(this.adddata);
    this.closeModal(content);
    this.getseokeywords();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'SEO Keywords Details Has Been Added',
      showConfirmButton: false,
      timer: 1500,
    })
    this.getseokeywords();
  }

  handleError(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }

  openModal1(edit: any, data1: any) {
    //this.editID = ID;
    // console.log(data1);
    this.SEO = data1;
    this.editseokdetails = this.SEO;
    this.modalService.open(edit, this.editseokdetails);

  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

  Update() {
    this.editseoid = this.editseokdetails.ID;
    //console.log(this.editseokdetails);
    this.dataservice.updateseok(this.editseoid, this.editseokdetails).subscribe(
      data => this.handleResponse1(data),
      error => this.handleError1(error)
    )
  }

  handleResponse1(data: any) {
    this.updatedata= data;
    this.addUpdationToLogs(this.updatedata);
    this.closeModal(content);
    this.getseokeywords();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'SEO Keywords Details Has Been Updated',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  handleError1(error: any) {
    this.error = error.error.errors;
    console.log(this.error);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  deleteSEORow(data: any) {
    this.deletedata= data;
    //console.log(ID);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t delete this SEO Keywords!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.dataservice.deleteseo(this.deletedata.ID).subscribe(response => {
          this.adddeleteToLogs(this.deletedata);
          Swal.fire('Deleted!', 'SEO Keywords Details has been deleted.', 'success');
          this.getseokeywords();
        });
      }
    });
  }
  addtologs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.seodata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "SEO Keywords";
      this.logs.Msg = " Meta Description of "+ this.logs.PropertyName + " has been added by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }
  addUpdationToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.seodata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "SEO Keywords";
      this.logs.Msg = " Meta Description of " + this.logs.PropertyName + "has been updated to " + this.seodata.metadescription + " by " + this.logs.updatedby;
      // console.log(this.logs);
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }
  adddeleteToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.seodata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "SEO Keywords";
      this.logs.Msg = " Meta Description of "+ this.logs.PropertyName + " has been deleted by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }
}
function content(content: any) {
  throw new Error('Function not implemented.');
}

