import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { FormDetails } from './formInfo.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {

  FormData: any;
  ID: any;

  formInfodetails: any;
  editform_id: any;
  editformdetails: any;
  editID: any;
  PropertyID: any;

  form = new FormDetails;
  error = new FormDetails;
  email: any;
  loggername: any;
  loggerdata: any;
  Name:any;
  data: any;
  propn: any;
  property: any;
  logs = new Logs;
  propertydata: any;
  formdata: any;
  deletedata: any;
  updatedata: any;
  adddata: any;

  constructor(
    private dataservice: DataService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.form.PropertyID = this.PropertyID;
    this.getFormDetails();
    this.logger();
    //this.getProppertie();

  }

  logger() {
    this.email =  sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
        //console.log("rera",this.loggername);
      this.form.updatedby = this.loggername;
    })
  }

  // getProppertie(){
  //   this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
  //      this.data = res;
  //      this.propn = this.data[0].PropertyName;
  //       this.form.Msg = "Form Details of " + this.propn + " are added by";
  //    })
  //  }

  openModal(content: any) {
    this.modalService.open(content);
  }
  openModal1(edit: any, data: any) {
    this.editID = edit;
    //console.log(data);
    this.editformdetails = data
    this.modalService.open(edit, data);
  }
  getFormDetails() {
    this.dataservice.getFormInfodetails(this.PropertyID).subscribe(res => {
      this.formInfodetails = res;
      //console.log("this is form: ",this.formInfodetails);
    })
  }

  onSubmit() {
    this.dataservice.addForm_info(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  Update() {
    this.editform_id = this.editformdetails.ID;
    this.dataservice.updateFormInfo(this.editform_id, this.editformdetails).subscribe(
      data => this.handleResponse1(data),
      error => this.handleError1(error)
    )
  }


  handleResponse(data: any) {
    this.adddata= data;
    this.closeModal(content);
    this.addtologs(this.adddata);
    this.getFormDetails();
    //this.reloadComponent();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Form Information Details Has Been Added',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  handleError(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }


  handleResponse1(data: any) {
    this.updatedata= data;
    this.closeModal(content);
    this.addUpdationToLogs(this.updatedata);
    this.getFormDetails();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Form Information Details Has Been Updated',
      showConfirmButton: false,
      timer: 1500,
    })
  }
  handleError1(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }
  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }
  deleteFormData(data: any) {
    this.deletedata= data;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t delete this Form Information Detail!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.dataservice.deleteFormInfo(this.deletedata.ID).subscribe(response => {
          this.adddeleteToLogs(this.deletedata);
          //console.log(this.deletedata);
          Swal.fire('Deleted!', 'Form Information Detail has been deleted.', 'success');
          this.getFormDetails();
        });
      }
    });
  }

  addtologs(data:any){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
      this.property = res;
      this.formdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName =  this.propertydata.PropertyName;
      this.logs.Attribute =  "Form Info";
      this.logs.Msg = "Form Details of " + this.logs.PropertyName + " are added by " + this.logs.updatedby;
      // console.log(this.logs);
       this.dataservice.addLogs(this.logs).subscribe(res=>{
         //console.log(res);
       })
    })
  }
 // Form Details of Siddha Seabrook are added by Mehzabeen  
  addUpdationToLogs(data:any){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
        this.property = res;
        this.formdata = data;
        this.propertydata = this.property[0];
        this.logs.updatedby = this.loggername;
        this.logs.PropertyID = this.propertydata.PropertyID;
        this.logs.PropertyName =  this.propertydata.PropertyName;
        this.logs.Attribute =  "Form Info";
        this.logs.Msg = "Form details of " + this.logs.PropertyName +" has been updated to Formname: " + this.formdata.formname + " sid : " + this.formdata.id1 + " pid : " + this.formdata.id2 +" domain : " + this.formdata.domain +" by " + this.logs.updatedby;
        // console.log(this.logs);
        this.dataservice.addLogs(this.logs).subscribe(res=>{
          //console.log(res);
        })
    })
  }
  //Form details of Dynamix Astrum Malad updated to <br> Formname : Western- Malad-Kandivali Generic <br> sid : sid:b528261f102718ebe319f3d25d13f71ab191595a,1627539827 <br> pid : 71e79c0b71c65fea7841661c72009351 <br> domain : https://www.1stprelaunch.com/dynamix-astrum-malad/<br>by Mehzabeen

  adddeleteToLogs(data:any){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
      this.property = res;
      this.formdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName =  this.propertydata.PropertyName;
      this.logs.Attribute =  "Form Info";
      this.logs.Msg = "Form details of " + this.logs.PropertyName +" has been deleted to Formname: " + this.formdata.formname + "  sid : " + this.formdata.id1 + " pid : " + this.formdata.id2 +" domain : " + this.formdata.domain +" by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res=>{
        //console.log(res);
      })
  })
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}

function content(content: any) {
  throw new Error('Function not implemented.');
}
