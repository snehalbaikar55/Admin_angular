import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { CommericialAmmenities } from './CommericialAmmenities.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-commericial-ammenities',
  templateUrl: './commericial-ammenities.component.html',
  styleUrls: ['./commericial-ammenities.component.scss']
})
export class CommericialAmmenitiesComponent implements OnInit {

  commericialammenities = new CommericialAmmenities;
  PropertyID: any;
  GlassFacade = new CommericialAmmenities;
  error: any;
  SpaciousEntranceLobby = new CommericialAmmenities;
  WellPlannedOffices = new CommericialAmmenities;
  HighSpeedElevators = new CommericialAmmenities;
  AmpleParkingSpace = new CommericialAmmenities;
  RobustSecurity = new CommericialAmmenities;
  DedicatedPantries = new CommericialAmmenities;
  DedicatedWashrooms = new CommericialAmmenities;
  DGBackupforCommonAreas = new CommericialAmmenities;
  AirConditioningOfficeSpaces = new CommericialAmmenities;
  email: any;
  loggername: any;
  loggerdata: any;
  property: any;
  propertydata: any;
  logs = new Logs;
  amenitiesdata: any;
  constructor(
    private dataservice: DataService,
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.commericialammenities.PropertyID = this.PropertyID;
    this.logger();
  }

  logger() {
    this.email = sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res => {
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
    })
  }
  openModal(content: any) {
    this.modalService.open(content);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  add_GlassFacade() {
    this.GlassFacade.updatedby = this.loggername;
    this.GlassFacade.PropertyID = this.PropertyID;
    this.GlassFacade.source = "amenities/glassfacade.png";
    this.GlassFacade.Title = "Glass Facade";
    this.GlassFacade.Amenitiesimage = "glassfacade.png";
    this.GlassFacade.status = 1;
    //console.log(this.GlassFacade);
    this.dataservice.addamenities(this.GlassFacade).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          this.addtologs(this.GlassFacade.Title);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Glass Facade Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
          //  console.log(error)
        }
      });
  }

  add_SpaciousEntranceLobby() {
    this.SpaciousEntranceLobby.updatedby = this.loggername;
    this.SpaciousEntranceLobby.PropertyID = this.PropertyID;
    this.SpaciousEntranceLobby.source = "amenities/enterancelobby.png";
    this.SpaciousEntranceLobby.Title = "Spacious Entrance Lobby";
    this.SpaciousEntranceLobby.Amenitiesimage = "enterancelobby.png";
    this.SpaciousEntranceLobby.status = 1;
    //  console.log( this.SpaciousEntranceLobby);
    this.dataservice.addamenities(this.SpaciousEntranceLobby).subscribe(
      data => {
        if (data) {
          this.addtologs(this.SpaciousEntranceLobby.Title);
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.SpaciousEntranceLobby.Title + ' Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
          //  console.log(error)
        }
      });
  }

  add_WellPlannedOffices() {
    this.WellPlannedOffices.updatedby = this.loggername;
    this.WellPlannedOffices.PropertyID = this.PropertyID;
    this.WellPlannedOffices.source = "amenities/wellplannedofficespace.png";
    this.WellPlannedOffices.Title = "Well Planned Offices";
    this.WellPlannedOffices.Amenitiesimage = "wellplannedofficespace.png";
    this.WellPlannedOffices.status = 1;
    this.dataservice.addamenities(this.WellPlannedOffices).subscribe(
      data => {
        if (data) {
          this.addtologs(this.WellPlannedOffices.Title);
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.WellPlannedOffices.Title + ' Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_HighSpeedElevators() {
    this.HighSpeedElevators.updatedby = this.loggername;
    this.HighSpeedElevators.PropertyID = this.PropertyID;
    this.HighSpeedElevators.source = "amenities/highspeedelevators.png";
    this.HighSpeedElevators.Amenitiesimage = "highspeedelevators.png";
    this.HighSpeedElevators.Title = "High Speed Elevators";
    this.HighSpeedElevators.status = 1;
    this.dataservice.addamenities(this.HighSpeedElevators).subscribe(
      data => {
        if (data) {
          this.addtologs(this.HighSpeedElevators.Title);
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.HighSpeedElevators.Title + ' Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_AmpleParkingSpace() {
    this.AmpleParkingSpace.updatedby = this.loggername;
    this.AmpleParkingSpace.PropertyID = this.PropertyID;
    this.AmpleParkingSpace.source = "amenities/parkingspace.jpg";
    this.AmpleParkingSpace.Title = "Ample Parking Space";
    this.AmpleParkingSpace.Amenitiesimage = "parkingspace.jpg";
    this.AmpleParkingSpace.status = 1;
    this.dataservice.addamenities(this.AmpleParkingSpace).subscribe(
      data => {
        if (data) {
          this.addtologs(this.AmpleParkingSpace.Title);
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.AmpleParkingSpace.Title + ' Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_RobustSecurity() {
    this.RobustSecurity.updatedby = this.loggername;
    this.RobustSecurity.PropertyID = this.PropertyID;
    this.RobustSecurity.source = "amenities/security.png";
    this.RobustSecurity.Amenitiesimage = "security.png";
    this.RobustSecurity.Title = "Robust Security";
    this.RobustSecurity.status = 1;
    this.dataservice.addamenities(this.RobustSecurity).subscribe(
      data => {
        if (data) {
          this.addtologs(this.RobustSecurity.Title);
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.RobustSecurity.Title + ' Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_DedicatedPantries() {
    this.DedicatedPantries.updatedby = this.loggername;
    this.DedicatedPantries.PropertyID = this.PropertyID;
    this.DedicatedPantries.source = "amenities/dedicatedpantries.jpg";
    this.DedicatedPantries.Amenitiesimage = "dedicatedpantries.jpg";
    this.DedicatedPantries.Title = "Dedicated Pantries";
    this.DedicatedPantries.status = 1;
    this.dataservice.addamenities(this.DedicatedPantries).subscribe(
      data => {
        if (data) {
          this.addtologs(this.DedicatedPantries.Title);
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.DedicatedPantries.Title + ' Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_DedicatedWashrooms() {
    this.DedicatedWashrooms.updatedby = this.loggername;
    this.DedicatedWashrooms.PropertyID = this.PropertyID;
    this.DedicatedWashrooms.source = "amenities/dedicatedwashrooms.png";
    this.DedicatedWashrooms.Amenitiesimage = "dedicatedwashrooms.png";
    this.DedicatedWashrooms.Title = "Dedicated Washrooms";
    this.DedicatedWashrooms.status = 1;
    this.dataservice.addamenities(this.DedicatedWashrooms).subscribe(
      data => {
        if (data) {
          this.addtologs(this.DedicatedWashrooms.Title);
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.DedicatedWashrooms.Title + ' Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_WaitingLounge() {
    this.DedicatedWashrooms.updatedby = this.loggername;
    this.DedicatedWashrooms.PropertyID = this.PropertyID;
    this.DedicatedWashrooms.source = "amenities/waitinglounge.jpg";
    this.DedicatedWashrooms.Amenitiesimage = "waitinglounge.jpg";
    this.DedicatedWashrooms.Title = "Waiting Lounge";
    this.DedicatedWashrooms.status = 1;
    this.dataservice.addamenities(this.DedicatedWashrooms).subscribe(
      data => {
        if (data) {
          this.addtologs(this.DedicatedWashrooms.Title);
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.DedicatedWashrooms.Title + ' Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_DGBackupforCommonAreas() {
    this.DGBackupforCommonAreas.updatedby = this.loggername;
    this.DGBackupforCommonAreas.PropertyID = this.PropertyID;
    this.DGBackupforCommonAreas.source = "amenities/DGbackup.jpg";
    this.DGBackupforCommonAreas.Amenitiesimage = "DGbackup.jpg";
    this.DGBackupforCommonAreas.Title = "DG Backup for Common Areas";
    this.DGBackupforCommonAreas.status = 1;
    this.dataservice.addamenities(this.DGBackupforCommonAreas).subscribe(
      data => {
        if (data) {
          this.addtologs(this.DGBackupforCommonAreas.Title);
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.DGBackupforCommonAreas.Title + ' Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_AirConditioningOfficeSpaces() {
    this.AirConditioningOfficeSpaces.updatedby = this.loggername;
    this.AirConditioningOfficeSpaces.PropertyID = this.PropertyID;
    this.AirConditioningOfficeSpaces.source = "amenities/airconditionedoffice.jpg";
    this.AirConditioningOfficeSpaces.Amenitiesimage = "airconditionedoffice.jpg";
    this.AirConditioningOfficeSpaces.Title = "Air Conditioning Office Spaces";
    this.AirConditioningOfficeSpaces.status = 1;
    this.dataservice.addamenities(this.AirConditioningOfficeSpaces).subscribe(
      data => {
        if (data) {
          this.addtologs(this.AirConditioningOfficeSpaces.Title);
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.AirConditioningOfficeSpaces.Title + ' Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  adddeleteToLogs(){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
      this.property = res;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName =  this.propertydata.PropertyName;
      this.logs.Attribute =  "Commericial Amenities";
      this.logs.Msg = "Commericial amenities of " + this.logs.PropertyName +" has been deleted by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res=>{
        //console.log(res);
      })
  })
  }

  addtologs(data:any){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
      this.property = res;
      this.amenitiesdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName =  this.propertydata.PropertyName;
      this.logs.Attribute =  "Commericial Amenities";
      this.logs.Msg =  this.amenitiesdata+" Commericial Amenities has been added to " +this.logs.PropertyName + " by " + this.logs.updatedby;
       this.dataservice.addLogs(this.logs).subscribe(res=>{
        console.log(res);
       })
    })
  }
}
