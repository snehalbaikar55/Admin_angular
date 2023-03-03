import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { Floorplans } from './floorplans.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-floorplans',
  templateUrl: './floorplans.component.html',
  styleUrls: ['./floorplans.component.scss']
})
export class FloorplansComponent implements OnInit {

  floorplans = new Floorplans;
  error = new Floorplans;
  docs: any;
  length: any;
  gimages: any;
  PropertyID: any;
  data: any;
  // error: any;
  fpimages: any;
  deleteID: any;
  deletefpid: any;
  titeldetails: any;
  titel: any;
  details: any;
  editdetails: any;
  edittitel_id: any;
  email: any;
  loggername: any;
  loggerdata: any;
  property: any;
  propertydata: any;
  logs = new Logs ;
  imgname: any;
  img: any;
  deleteimage: any;
  adddata: any;

  constructor(
    private dataservice: DataService,
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.floorplans.PropertyID = this.PropertyID;
    this.getfloorplans();
    this.logger();
   
  }

  logger(){
    this.email =  sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
       // console.log(this.loggername);
      this.floorplans.updatedby = this.loggername;
    })
  }

  getfloorplans() {
    // console.log(this.gimages.PropertyID);
    this.dataservice.getfloorplansimg(this.floorplans.PropertyID).subscribe(res => {
      this.fpimages = res;
      // console.log(this.fpimages);
    })
  }
  openModal(content: any) {
    this.modalService.open(content);
  }

  onSelectFile(e: any) {
    //  this.filedata = e.target.files[0];
    // console.log(e);
    this.docs = <File>e.target.files;
    this.length = <File>e.target.files.length;
  }

  // saveImage() {
  //   this.floorplans.updatedby = this.loggername;
  //   var formdata = new FormData();
  //   for (let i = 0; i < this.length; i++) {
  //     formdata.append('Image' + [i], this.docs[i], this.docs[i].name);
  //     formdata.append('length', this.length);
  //   }
  //   formdata.append('PropertyID', this.floorplans.PropertyID);
  //   formdata.append('Title', this.floorplans.Title);
  //   formdata.append('updatedby', this.floorplans.updatedby);
  //   this.dataservice.addfloorplans(formdata).subscribe(
  //     data => this.handleResponse(data),
  //     error => this.handleError(error)
  //   );
  // }

  saveMultipleImages() {
    this.floorplans.updatedby = this.loggername;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    //console.log(this.docs.FeaturedImage);
    var formdata = new FormData();
    //formdata.append('annonceId', '2' );
    for (let i = 0; i < this.length; i++) {
      formdata.append('Image' + [i], this.docs[i], this.docs[i].name);
      formdata.append('length', this.length);
    }
    formdata.append('PropertyID', this.floorplans.PropertyID);
    formdata.append('Title', this.floorplans.Title);
    formdata.append('updatedby', this.floorplans.updatedby);
    this.http.post('http://127.0.0.1:8000/api/tblfloorplans', formdata
    ).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    this.adddata= data;
    this.addtologs(this.adddata);
    this.closeModal(content);
    this.getfloorplans();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Floor Plan Has Been Added',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  handleError(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  deletefp(data: any) {
    this.deleteimage= data;
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
        this.dataservice.deletefloorplan(this.deleteimage.ID).subscribe(response => {
          this.adddeleteToLogs(this.deleteimage);
          //console.log(response);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Floor Plan Image Has Been Deleted',
            showConfirmButton: false,
            timer: 1500,
          })
          this.getfloorplans();
        });
      }
    });
  }

  opentitel(edittitel: any, data: any) {
    this.details = data;
    this.editdetails = this.details;
    this.modalService.open(edittitel, this.editdetails);
  }

  updateTitel() {
    this.edittitel_id = this.editdetails.ID;
    this.titel = this.editdetails;
    // console.log(this.titel);
    this.dataservice.editfloorplan(this.edittitel_id, this.titel).subscribe(
      data => this.handleResponse1(data),
      error => this.handleError1(error)
    )
  }
  addtologs(data:any){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
      this.property = res;
      this.imgname = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName =  this.propertydata.PropertyName;
      this.logs.Attribute =  "Floor Plan";
      this.logs.Msg =  this.imgname.Image+" Floor Plan has been added to " +this.logs.PropertyName + " by " + this.logs.updatedby;
       this.dataservice.addLogs(this.logs).subscribe(res=>{
         
       })
    })
  }

  adddeleteToLogs(data:any){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
      this.property = res;
      this.img = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName =  this.propertydata.PropertyName;
      this.logs.Attribute =  "Floor Plan";
      this.logs.Msg = this.img.Image +" Floor Plan of " + this.logs.PropertyName +" has been deleted by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res=>{
         //console.log(res);
      })
  })
  }
  handleResponse1(data: any) {
    this.closeModal(content);
    //this.reloadComponent();
    this.getfloorplans();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Floor Plan Title Has Been Updated',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  handleError1(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }

}
function content(content: any) {
  throw new Error('Function not implemented.');
}

