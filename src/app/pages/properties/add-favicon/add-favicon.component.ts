import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { FavIcon } from './addfavicon.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-add-favicon',
  templateUrl: './add-favicon.component.html',
  styleUrls: ['./add-favicon.component.scss']
})
export class AddFaviconComponent implements OnInit {
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  public myFormData = {
    FeaturedImage: null,
  };
  email: any;
  loggername: any;
  loggerdata: any;
  property: any;
  img: any;
  propertydata: any;
  logs = new Logs;
  imgname = new FavIcon;
  adddata: any;
  deletedata: any;

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router
  ) { }

  docs: any;
  length: any;
  PropertyID: any;
  faviconDetails: any;

  faviconData = new FavIcon;
  error = new FavIcon;

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.faviconData.PropertyID = this.PropertyID;

    this.getFavicon();
    this.logger();
  }

  logger() {
    this.email = sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res => {
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
      //console.log("imagedetails",this.loggername);
      this.faviconData.updatedby = this.loggername;
    })
  }


  getFavicon() {
    //console.log(this.faviconData.PropertyID);

    this.dataservice.getFavIcon(this.PropertyID).subscribe(res => {
      this.faviconDetails = res;
      //console.log(this.faviconDetails);

    })
  }

  openModal(content: any) {
    this.modalService.open(content);
  }
  saveMultipleImage() {
    this.faviconData.updatedby = this.loggername;
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
    formdata.append('PropertyID', this.faviconData.PropertyID);
    formdata.append('updatedby', this.faviconData.updatedby);

    this.http.post('http://127.0.0.1:8000/api/tblfavicon', formdata
    ).subscribe(

      data => this.handleResponse(data),
      error => this.handleError(error)
    );

  }
  onSelectFile(e: any) {
    //  this.filedata = e.target.files[0];
    //console.log(e);
    this.docs = <File>e.target.files;
    this.length = <File>e.target.files.length;
  }


  handleResponse(data: any) {
    this.adddata= data;
    this.addtologs(this.adddata)
    this.closeModal(content);
    this.getFavicon();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Favicon Details Has Been Added',
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
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  deleteFaviconRow(data: any) {
    this.deletedata= data;
    //console.log(ID);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t delete this Favicon!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.dataservice.deleteFavicon(this.deletedata.ID).subscribe(response => {
          this.adddeleteToLogs(this.deletedata);
          //console.log(response);
          Swal.fire('Deleted!', 'Favicon Details has been deleted.', 'success');
          this.getFavicon();
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
      this.logs.Attribute = "Favicon";
      this.logs.Msg = this.imgname.FeaturedImage + " Favicon has been added to " + this.logs.PropertyName + " by " + this.logs.updatedby;
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
      this.logs.Attribute = "Favicon";
      this.logs.Msg = this.img.FeaturedImage + " Favicon of " + this.logs.PropertyName + " has been deleted by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }


}
function content(content: any) {
  throw new Error('Function not implemented.');
}

