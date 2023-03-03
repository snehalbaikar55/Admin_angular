import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { ComponentsModule } from '../../components/components.module';
import { Gimages } from './galleryimages.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-galleryimages',
  templateUrl: './galleryimages.component.html',
  styleUrls: ['./galleryimages.component.scss']
})
export class GalleryimagesComponent implements OnInit {
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });


  public myFormData = {
    FeaturedImage: null,
  };

  title = 'fileupload';
  remark = '';
  filedata: any[] = [];
  public users = {
    FeaturedImage: null
  }
  docs: any;
  length: any;
  PropertyID: any;
  galleryimages: any;

  gimages = new Gimages;
  error = new Gimages;
  editimage = new Gimages;
  editimage_id: any;
  formdata: any;
  name: any;
  docss: any;
  email: any;
  loggerdata: any;
  loggername: any;
  imgname: any;
  property: any;
  propertydata: any;
  logs = new Logs;
  img: any;
  deletedata: any;
  adddata: any;
  constructor(
    private dataservice: DataService,
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }
  myFiles: string[] = [];

  sMsg: string = '';
  StudentIdUpdate: string | undefined;

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.gimages.PropertyID = this.PropertyID;
    this.getgalleryimages();
    this.logger();

  }

logger(){
  this.email =  sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
        //console.log("this gallery image",this.loggername);
      this.gimages.updatedby = this.loggername;
    })
}

  getgalleryimages() {
    this.dataservice.getgimages(this.PropertyID).subscribe(res => {
      this.galleryimages = res;
      //console.log(this.galleryimages);
    })
  }
  onSelectFile(e: any) {
    //  this.filedata = e.target.files[0];
    //console.log(e);
    this.docs = <File>e.target.files;
    this.length = <File>e.target.files.length;
  }

  saveMultipleImage() {
    this.gimages.updatedby = this.loggername;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    //console.log(this.docs.FeaturedImage);
    var formdata = new FormData();
    //formdata.append('annonceId', '2' );
    for (let i = 0; i < this.length; i++) {
      formdata.append('FeaturedImage' + [i], this.docs[i], this.docs[i].name);
      formdata.append('length', this.length);
    }
    formdata.append('PropertyID', this.gimages.PropertyID);
    formdata.append('updatedby', this.gimages.updatedby);
    // console.log("formdata aasssddd", formdata);
    this.http.post('http://127.0.0.1:8000/api/tblgalleryimages', formdata
    ).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    this.adddata= data;
    this.closeModal(content);
    this.addtologs(this.adddata);
    //this.reloadComponent();
    this.getgalleryimages();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Gallery Image Details Has Been Added',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

  handleError(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  openModal1(edit: any, data: any) {
    // this.editID = ID;
    // console.log(data);
    this.formdata = data
    this.modalService.open(edit, data);
  }

  onSelectFile1(e: any) {
    //  this.filedata = e.target.files[0];
    //console.log(e);
    this.docss = <File>e.target.files;

    this.length = <File>e.target.files.length;
  }

  Update() {
    this.gimages.updatedby = this.loggername;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    //console.log(this.formdata.PropertyID);
    var formdata = new FormData();
    var id = this.formdata.ID;
    for (let i = 0; i < this.length; i++) {
      formdata.append('FeaturedImage' + [i], this.docss[i], this.docss[i].name);
      formdata.append('length', this.length);
    }
    formdata.append('PropertyID', this.formdata.PropertyID);
    formdata.append('ID', this.formdata.ID);
    formdata.append('updatedby', this.formdata.updatedby);

    this.http.patch('http://127.0.0.1:8000/api/tblgalleryimages/' + id, formdata
    ).subscribe(

      data => this.handleResponse(data),
      error => this.handleError(error)
    );

  }

  handleResponse1(data: any) {
    this.closeModal(content);
    this.getgalleryimages();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Gallery Image Details Has Been Updated',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  handleError1(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }


  deleteImageRow(data: any) {
    this.deletedata= data;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t delete this Gallery Image!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.dataservice.deleteImage(this.deletedata.ID).subscribe(response => {
          this.adddeleteToLogs(this.deletedata);
          Swal.fire('Deleted!', 'Gallery Image Details has been deleted.', 'success');
          this.getgalleryimages();
        });
      }
    });
  }

  addtologs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.imgname = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Gallery Image";
      this.logs.Msg = this.imgname.FeaturedImage + " Gallery Image has been added to " + this.logs.PropertyName + " by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }

  adddeleteToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.img = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Gallery Image";
      this.logs.Msg = this.img.FeaturedImage + " Gallery Image of " + this.logs.PropertyName + " has been deleted by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res => {
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

