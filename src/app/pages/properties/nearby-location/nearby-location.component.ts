import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { NearByLocation } from './nearbyLocation.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-nearby-location',
  templateUrl: './nearby-location.component.html',
  styleUrls: ['./nearby-location.component.scss']
})
export class NearbyLocationComponent implements OnInit {

  //location = new NearByLocation;
  nearbylocDetails: any;
  editID: any;
  editNearbylocation: any;
  editnearLoc_id: any;
  PropertyID: any;
  data:any;
  Name:any;

  // public location = {
  //   //ID:null,
  //   l:null,
  //   PropertyID:null
  // }
  location = new NearByLocation;
  error = new NearByLocation;
  email: any;
  loggerdata: any;
  loggername: any;
  property: any;
  propertydata: any;
  logs = new Logs;
  nearByData: any;
  deletedata: any;
  adddata: any;
  updatedata: any;
  // public error = {
  //   ID:null,
  //   l:null,
  //   PropertyID:null
  // }
  constructor(
    private dataservice:DataService,
    private modalService: NgbModal,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.PropertyID=this.route.snapshot.params.id;
    //console.log(this.PropertyID);
    this.location.PropertyID=this.PropertyID;

    this.getNearbyLocDetails();
    this.getupdatedby();

  }

  getupdatedby() {
    this.email =  sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
        //console.log("location",this.loggername);
      this.location.updatedby = this.loggername;
    })
  }
  getNearbyLocDetails(){
    this.dataservice.getNearbyLocation(this.PropertyID).subscribe(res=>{
        this.nearbylocDetails=res;
        //console.log(this.nearbylocDetails);
    })
  }
  onSubmit(){
    this.dataservice.addNearbyLocation(this.location).subscribe(
      data =>  this.handleResponse(data),
      error =>  this.handleError(error)
    )
   }

  Update(){
    this.editnearLoc_id = this.editNearbylocation.ID;
    this.dataservice.updateNearbyLoc(this.editnearLoc_id,this.editNearbylocation).subscribe(
      data =>  this.handleResponse1(data),
      error =>  this.handleError1(error)
    )
  }

  handleResponse(data:any){
  this.adddata= data;
  this.addtologs(this.adddata);
  //console.log(this.adddata);
  this.closeModal(content);
  //this.reloadComponent();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Price Details Has Been Added',
    showConfirmButton: false,
    timer: 1500,
  })  
  this.getNearbyLocDetails();
  }

  handleError(error:any){
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }


  handleResponse1(data:any){
    this.updatedata= data;
    this.addUpdationToLogs(this.updatedata);
    this.closeModal(content);
    this.getNearbyLocDetails();
    // this.reloadComponent();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Price Details Has Been Updated',
      showConfirmButton: false,
      timer: 1500,
    })  
  }
  handleError1(error:any){
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }

  closeModal(content:any){
    this.modalService.dismissAll(content);
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  openModal1(edit: any, data:any) {
    this.editID = edit;
    //console.log(data);
    this.editNearbylocation=data
    this.modalService.open(edit,data);
  }


  deleteLocationData(data:any){
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
          this.dataservice.deleteNearbyloc(this.deletedata.ID).subscribe(response => {
            this.adddeleteToLogs(this.deletedata);
            //console.log(response);
            Swal.fire('Deleted!', 'NearBy Location Detail has been deleted.', 'success');
            this.getNearbyLocDetails();
          });
      }
    });
  }

  addtologs(data:any){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
      this.property = res;
      this.nearByData = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName =  this.propertydata.PropertyName;
      this.logs.Attribute =  "Nearby Locations";
      this.logs.Msg = "Nearby Location : " + this.nearByData.l + " has been added to "+ this.logs.PropertyName + " by "+ this.logs.updatedby;
       //console.log(this.logs);
       this.dataservice.addLogs(this.logs).subscribe(res=>{
         //console.log(res);
       })
    })
  }
   
  addUpdationToLogs(data:any){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
        this.property = res;
        this.nearByData = data;
        this.propertydata = this.property[0];
        this.logs.updatedby = this.loggername;
        this.logs.PropertyID = this.propertydata.PropertyID;
        this.logs.PropertyName =  this.propertydata.PropertyName;
        this.logs.Attribute =  "Nearby Locations";
        this.logs.Msg = "Nearby Location of " + this.logs.PropertyName +" has been updated " + this.nearByData.l +" by " + this.logs.updatedby;
        // console.log(this.logs);
        this.dataservice.addLogs(this.logs).subscribe(res=>{
          //console.log(res);
        })
    })
  }

  adddeleteToLogs(data:any){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
      this.property = res;
      this.nearByData = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName =  this.propertydata.PropertyName;
      this.logs.Attribute =  "Nearby Locations";
      this.logs.Msg ="Nearby Location of " + this.logs.PropertyName +" i.e. Nearby Landmarks - " + this.nearByData.l +" has been deleted by " + this.logs.updatedby;
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
  
