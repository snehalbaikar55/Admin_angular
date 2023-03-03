import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { Amenities } from './amenities.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent implements OnInit {

  logs = new Logs;
  amenities = new Amenities;
  PropertyID: any;
  swimmingData = new Amenities;
  swmAmenitie_id: any;
  swmAmenitie_source: any;
  swimmingDetails: any;
  length: any;
  docs: any;
  error: any;
  amenitiesdetails: any;
  context: any;
  statusdata: any;
  status: any;
  edit_id: any;
  resdata: any;
  delete_id: any;
  gymnasiumData = new Amenities;
  libraryData = new Amenities;
  data: any;
  IndoorGamesData = new Amenities;
  MultiPurposeHallData = new Amenities;
  ChildrenPlayAreaData = new Amenities;
  GreenLawnData = new Amenities;
  SeniorCitizenArea = new Amenities;
  SquashCourt = new Amenities;
  title: any;
  Meditation = new Amenities;
  DigitalFitnessWorkoutZone = new Amenities;
  VirtualGamingRoom = new Amenities;
  BoxOffice = new Amenities;
  MultiPurposeCourt = new Amenities;
  email: any;
  loggerdata: any;
  loggername: any;
  property: any;
  reradata: any;
  propertydata: any;
  amenitiesdata: any;
  deletedata: any;
  deletitel: any;
  deletitle: any;

  constructor(
    private dataservice: DataService,
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.amenities.PropertyID = this.PropertyID;
    this.getAmenities();
    this.logger();


  }
  getAmenities() {
    this.dataservice.getamenities(this.PropertyID).subscribe(res => {
      this.amenitiesdetails = res;
      // console.log(res);
    })
  }

  logger() {
    this.email = sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res => {
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
    })
  }

  add_Swimming_Pool() {
    this.swimmingData.updatedby = this.loggername;
    this.swimmingData.PropertyID = this.PropertyID;
    this.swimmingData.source = "amenities/swm.png";
    this.swimmingData.Title = "Swimming Pool";
    this.swimmingData.Amenitiesimage = "swm.png";
    this.swimmingData.status = 1;
    this.addtologs(this.swimmingData.Title);
    this.dataservice.addamenities(this.swimmingData).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }


  handleResponse(data: any) {
    this.reloadComponent();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Swimming Pool Has Been Added',
      showConfirmButton: false,
      timer: 1500,
    })

  }

  handleError(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }

  activateAmenities(data: any) {
    // console.log(data);
    this.statusdata = data;
    this.amenities = this.statusdata;
    this.title = this.statusdata.Title;
    if (this.amenities.status == 0) {
      this.amenities.status = 1;
    } else {
      this.amenities.status = 0;
    }
    this.amenities.updatedby = this.loggername;
    // console.log(this.amenities);
    this.dataservice.editamenitiesStatus(this.amenities.ID, this.amenities).subscribe(
      data => this.handleResponse1(data, this.title),
      error => this.handleError1(error)
    );

  }
  handleResponse1(data: any, data1: any) {
    this.resdata = data;
    this.deletitle = data1;
    // this.deletitle = "Activated";

    if (this.resdata.status == 1) {
      this.addUpdationtolog(this.deletitle + " Activated");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: this.resdata.Title + ' Has Been Activated',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      this.addUpdationtolog(this.deletitle + " Deactivated");
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: this.resdata.Title + ' Has Been Deactivated',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  handleError1(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }

  DeleteAmenities(data: any) {
    this.deletedata = data;
    this.title = this.deletedata.Title;
    this.delete_id = this.deletedata.ID;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t delete ' + this.title + '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.dataservice.deleteamenities(this.delete_id).subscribe(
          data => this.handleResponse2(data, this.title),
          error => this.handleError2(error))
      }
    });
  }
  handleResponse2(data: any, data1: any) {
    this.deletitel = data1;
    //  console.log(data1);
    this.adddeleteToLogs(this.deletitel);
    this.reloadComponent();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Amenities has been Deleted.',
      showConfirmButton: false,
      timer: 1500,
    });
    //  console.log(data);
  }

  handleError2(error: any) {
    //  console.log(error);
    this.error = error.error.errors;
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  add_gymnasium() {
    this.gymnasiumData.updatedby = this.loggername;
    this.gymnasiumData.PropertyID = this.PropertyID;
    this.gymnasiumData.source = "amenities/gym.png";
    this.gymnasiumData.Amenitiesimage = "gym.png";
    this.gymnasiumData.Title = "Gymnasium";
    this.gymnasiumData.status = 1;
    // console.log( this.gymnasiumData);
    this.addtologs(this.gymnasiumData.Title);
    this.dataservice.addamenities(this.gymnasiumData).subscribe(
      data => this.handleD(data),
      error => this.handleE(error)
    );

  }

  handleD(data: any) {
    this.reloadComponent();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Gymnasium Has Been Added',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  handleE(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

  add_Library() {
    this.libraryData.updatedby = this.loggername;
    this.libraryData.PropertyID = this.PropertyID;
    this.libraryData.source = "amenities/libaray.png";
    this.libraryData.Amenitiesimage = "libaray.png";
    this.libraryData.Title = "Library";
    this.libraryData.status = 1;
    this.addtologs(this.libraryData.Title);
    // console.log( this.libraryData);
    this.dataservice.addamenities(this.libraryData).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Library Has Been Added',
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

  add_IndoorGames() {
    this.IndoorGamesData.updatedby = this.loggername;
    this.IndoorGamesData.PropertyID = this.PropertyID;
    this.IndoorGamesData.source = "amenities/indoor.png";
    this.IndoorGamesData.Amenitiesimage = "indoor.png";
    this.IndoorGamesData.Title = "Indoor Games";
    this.IndoorGamesData.status = 1;
    this.addtologs(this.IndoorGamesData.Title);
    this.dataservice.addamenities(this.IndoorGamesData).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Indoor Games Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      }
    );
  }

  add_MultiPurposeHall() {
    this.MultiPurposeHallData.updatedby = this.loggername;
    this.MultiPurposeHallData.PropertyID = this.PropertyID;
    this.MultiPurposeHallData.source = "amenities/multipurposehall.png";
    this.MultiPurposeHallData.Amenitiesimage = "multipurposehall.png";
    this.MultiPurposeHallData.Title = "Multi Purpose Hall";
    this.MultiPurposeHallData.status = 1;
    this.addtologs(this.MultiPurposeHallData.Title);
    this.dataservice.addamenities(this.MultiPurposeHallData).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Multi Purpose Hall Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      }
    );
  }

  add_ChildrenPlayArea() {
    this.ChildrenPlayAreaData.updatedby = this.loggername;
    this.ChildrenPlayAreaData.PropertyID = this.PropertyID;
    this.ChildrenPlayAreaData.source = "amenities/childern.png";
    this.ChildrenPlayAreaData.Amenitiesimage = "childern.png";
    this.ChildrenPlayAreaData.Title = "Children Play Area";
    this.ChildrenPlayAreaData.status = 1;
    this.addtologs(this.ChildrenPlayAreaData.Title);
    this.dataservice.addamenities(this.ChildrenPlayAreaData).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Children Play Area Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_GreenLawn() {
    this.GreenLawnData.updatedby = this.loggername;
    this.GreenLawnData.PropertyID = this.PropertyID;
    this.GreenLawnData.source = "amenities/lawn.png";
    this.GreenLawnData.Amenitiesimage = "lawn.png";
    this.GreenLawnData.Title = "Green Lawn";
    this.GreenLawnData.status = 1;
    // console.log( this.GreenLawnData);
    this.addtologs(this.GreenLawnData.Title);
    this.dataservice.addamenities(this.GreenLawnData).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Green Lawn Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });

  }

  add_SeniorCitizenArea() {
    this.SeniorCitizenArea.updatedby = this.loggername;
    this.SeniorCitizenArea.PropertyID = this.PropertyID;
    this.SeniorCitizenArea.source = "amenities/seniorcitizen.png";
    this.SeniorCitizenArea.Amenitiesimage = "seniorcitizen.png";
    this.SeniorCitizenArea.Title = "Senior Citizen Area";
    this.SeniorCitizenArea.status = 1;
    this.addtologs(this.SeniorCitizenArea.Title);
    // console.log( this.SeniorCitizenArea);
    this.dataservice.addamenities(this.SeniorCitizenArea).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Senior Citizen Area Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });

  }

  add_SquashCourt() {
    this.SquashCourt.updatedby = this.loggername;
    this.SquashCourt.PropertyID = this.PropertyID;
    this.SquashCourt.source = "amenities/Squash.png";
    this.SquashCourt.Amenitiesimage = "Squash.png";
    this.SquashCourt.Title = "Squash Court";
    this.SquashCourt.status = 1;
    this.addtologs(this.SquashCourt.Title);
    // console.log( this.SquashCourt);
    this.dataservice.addamenities(this.SquashCourt).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          // this.closeModal(content);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Squash Court Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_Meditation() {
    this.Meditation.updatedby = this.loggername;
    this.Meditation.PropertyID = this.PropertyID;
    this.Meditation.source = "amenities/mediation.png";
    this.Meditation.Amenitiesimage = "mediation.png";
    this.Meditation.Title = "Meditation";
    this.Meditation.status = 1;
    this.addtologs(this.Meditation.Title);
    // console.log( this.Meditation);
    this.dataservice.addamenities(this.Meditation).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          // this.closeModal(content);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Meditation Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_DigitalFitnessWorkoutZone() {
    this.DigitalFitnessWorkoutZone.updatedby = this.loggername;
    this.DigitalFitnessWorkoutZone.PropertyID = this.PropertyID;
    this.DigitalFitnessWorkoutZone.source = "amenities/treadmill.png";
    this.DigitalFitnessWorkoutZone.Amenitiesimage = "treadmill.png";
    this.DigitalFitnessWorkoutZone.Title = "Digital Fitness Workout Zone";
    this.DigitalFitnessWorkoutZone.status = 1;
    this.addtologs(this.DigitalFitnessWorkoutZone.Title);
    //  console.log( this.DigitalFitnessWorkoutZone);
    this.dataservice.addamenities(this.DigitalFitnessWorkoutZone).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Digital Fitness Workout Zone Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_VirtualGamingRoom() {
    this.VirtualGamingRoom.updatedby = this.loggername;
    this.VirtualGamingRoom.PropertyID = this.PropertyID;
    this.VirtualGamingRoom.source = "amenities/controller.png";
    this.VirtualGamingRoom.Amenitiesimage = "controller.png";
    this.VirtualGamingRoom.Title = "Virtual Gaming Room";
    this.VirtualGamingRoom.status = 1;
    this.addtologs(this.VirtualGamingRoom.Title);
    //  console.log( this.VirtualGamingRoom);
    this.dataservice.addamenities(this.VirtualGamingRoom).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Virtual Gaming Room Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_BoxOffice() {

    this.BoxOffice.updatedby = this.loggername;
    this.BoxOffice.PropertyID = this.PropertyID;
    this.BoxOffice.source = "amenities/box.png";
    this.BoxOffice.Amenitiesimage = "box.png";
    this.BoxOffice.Title = "Box Office";
    this.BoxOffice.status = 1;
    this.addtologs(this.BoxOffice.Title);
    //  console.log( this.BoxOffice);
    this.dataservice.addamenities(this.BoxOffice).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Box Office Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  add_MultiPurposeCourt() {
    this.MultiPurposeCourt.updatedby = this.loggername;
    this.MultiPurposeCourt.PropertyID = this.PropertyID;
    this.MultiPurposeCourt.source = "amenities/courthouse.png";
    this.MultiPurposeCourt.Amenitiesimage = "courthouse.png";
    this.MultiPurposeCourt.Title = "Multi Purpose Court";
    this.MultiPurposeCourt.status = 1;
    this.addtologs(this.MultiPurposeCourt.Title);
    //  console.log( this.MultiPurposeCourt);
    this.dataservice.addamenities(this.MultiPurposeCourt).subscribe(
      data => {
        if (data) {
          this.reloadComponent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Multi Purpose Court Has Been Added',
            showConfirmButton: false,
            timer: 1500,
          })
        }
        if (this.error) {
          this.error = this.error.error.errors;
        }
      });
  }

  adddeleteToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.amenities = data;
      // console.log(this.amenities);
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Amenities";
      this.logs.Msg = this.amenities + " Amenities of " + this.logs.PropertyName + " has been deleted by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res => {
        // console.log(res);
      })
    })
  }

  addtologs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.amenitiesdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Amenities";
      this.logs.Msg = this.amenitiesdata + " amenity has been added to " + this.logs.PropertyName + " by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res => {

      })
    })
  }

  addUpdationtolog(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.amenities = data;
      // console.log(this.amenities);
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Amenities";
      this.logs.Msg = this.amenities + " Amenities of " + this.logs.PropertyName + " has been Updated Status  by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res => {
        // console.log(res);
      })
    })
  }

}
function content(content: any) {
  throw new Error('Function not implemented.');
}

