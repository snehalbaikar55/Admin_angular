
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import { latLng, tileLayer, circle, polygon, marker, icon, Layer } from 'leaflet';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { LocationUrl } from './location-url.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-location-url',
  templateUrl: './location-url.component.html',
  styleUrls: ['./location-url.component.scss']
})
export class LocationurlComponent implements OnInit {

  @ViewChild('map') mapElement: any;

  locationUrl = new LocationUrl;
  PropertyID: any;
  locationurl: any;
  location: any;
  lurl: any;
  error = new LocationUrl;
  editdata: any;
  edit_id: any;
  url: any;
  locationurl1: any;
  breadCrumbItems!: Array<{}>;
  urldata: any;
  mapUrl: any;
  email: any;
  loggerdata: any;
  loggername: any;
  property: any;
  propertydata: any;
  logs= new Logs;
  locationdata: any;
  deletedata: any;
  adddata: any;
  updatedata: any;
  constructor(
    private dataservice: DataService,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID)
    private platformId: Object,
    private mapsAPILoader: MapsAPILoader,
  ) {

  }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.locationUrl.PropertyID = this.PropertyID;
    this.getLocationurl();
    this.logger();

  }
  logger() {
    this.email = sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res => {
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
      //console.log("locationUrl",this.loggername);
      this.locationUrl.updatedby = this.loggername;
    })
  }
  getLocationurl() {
    this.dataservice.getUrl(this.PropertyID).subscribe(res => {
      this.locationurl = res;
      this.urldata = this.locationurl[0].URL;
      this.url = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAZZTZlEZj4vS5xIdoXd-kyQmfjsS4Ti-E &q=' + this.urldata;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      // console.log(this.urldata);
    })
  }
  openModal(content: any) {
    this.modalService.open(content);
  }
  addURL() {
    this.locationUrl.updatedby = this.loggername;
    this.dataservice.addlocationurl(this.locationUrl).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    this.adddata=data;
    this.addtologs(this.adddata);
    this.closeModal(content);
    this.getLocationurl();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Location Url Has Been Added',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  handleError(error: any) {
    this.error = error.error.errors;
    //  this.error.URL = "The url field is required";
    //  this.error.PropertyID = "Location Url has already Added";
  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

  deleteurl(data: any) {
    this.deletedata = data;
    //console.log(this.deletedata);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t delete this Location URL!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.dataservice.deletelocationurl(this.deletedata.ID).subscribe(response => {
          this.adddeleteToLogs(this.deletedata);
          Swal.fire('Deleted!', 'Location URL has been Deleted.', 'success');
          this.getLocationurl();
        });
      }
    });
  }
  
  openEditModal(edit: any, data: any) {
    this.editdata = data;
    this.modalService.open(edit, this.editdata);
  }

  editURL() {
    this.edit_id = this.editdata.ID;
    this.dataservice.editlocationurl(this.edit_id, this.editdata).subscribe(
      data => this.handleResponse2(data),
      error => this.handleError2(error)
    )
  }

  handleResponse2(data: any) {
    this.updatedata=data;
    this.addUpdationToLogs(this.updatedata);
    this.closeModal(content);
    this.getLocationurl();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Location URL Has Been Updated',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  handleError2(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }

  addtologs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.locationdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Location URL";
      this.logs.Msg = "For " + this.locationdata.URL + " has been added to " + this.logs.PropertyName + " by " + this.logs.updatedby;
      // console.log(this.logs);
      this.dataservice.addLogs(this.logs).subscribe(res => {
        ///console.log(res);
      })
    })
  }

  addUpdationToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.locationdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Location URL";
      this.logs.Msg = " Location URL of " + this.logs.PropertyName + " has been updated to "  + this.locationdata.URL + " by " + this.logs.updatedby;
      // console.log(this.logs);
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }
 
  adddeleteToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.locationdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Location URL";
      this.logs.Msg = " Location URL of " + this.logs.PropertyName + " has been deleted " + this.locationdata.URL + " by " + this.logs.updatedby;
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

