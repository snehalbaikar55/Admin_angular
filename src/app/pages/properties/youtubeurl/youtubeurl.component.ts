import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { YouTubeUrl } from './youtubeurl.model';
import { Logs } from '../../managelogs/managelogs.model';
@Component({
  selector: 'app-youtubeurl',
  templateUrl: './youtubeurl.component.html',
  styleUrls: ['./youtubeurl.component.scss']
})
export class YoutubeurlComponent implements OnInit {

  youtube = new YouTubeUrl;
  YouTubeDetails: any;
  editID: any;
  edityoutubedetails: any;
  edityoutube_id: any;
  PropertyID: any;

  public info = {
    ID: null,
    youtubeURL: null,
    PropertyID: null
  }
  email: any;
  loggerdata: any;
  extracode: any;
  loggername: any;
  Name:any;
  property: any;
  propertydata: any;
  logs= new Logs;
  youtubeurldata: any;
  adddata: any;
  updatedata: any;
  deletedata: any;

  constructor(
    private dataservice: DataService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.youtube.PropertyID = this.PropertyID;
    this.getYouTubeDetails();
    this.getupdatedby();

  }

  getupdatedby() {
    this.email =  sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
        //console.log("youtube",this.loggername);
      this.youtube.updatedby = this.loggername;
    })
  }

  onSubmit() {
    this.dataservice.addYoutube_url(this.youtube).subscribe(res => {
      this.adddata = res;
      this.addtologs(this.adddata);
      Swal.fire('Added!', 'Youtube Url has been Added.', 'success');
      //this.router.navigateByUrl('/form_info');
      this.getYouTubeDetails();
      this.closeModal(content);
    })
  }
  openModal(content: any) {
    this.modalService.open(content);
  }
  getYouTubeDetails() {
    this.dataservice.getYouTubedetails(this.PropertyID).subscribe(res => {
      this.YouTubeDetails = res;
      //console.log(this.YouTubeDetails);

    })
  }
  openModal1(edit: any, data: any) {
    this.editID = edit;
    //console.log(data);
    this.edityoutubedetails = data
    this.modalService.open(edit, data);
  }
  Update() {
    this.edityoutube_id = this.edityoutubedetails.ID;
    this.dataservice.updateYouTubeUrl(this.edityoutube_id, this.edityoutubedetails).subscribe(res => {
      this.updatedata=res;
      this.addUpdationToLogs(this.updatedata);
      Swal.fire('Updated!', 'YouTube Url has been Updated.', 'success');
      this.closeModal(content);
    })
  }
  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }
  deleteToutubeData(data: any) {
    this.deletedata = data;
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
        this.dataservice.deleteYouTubeUrl(this.deletedata.ID).subscribe(response => {
          this.adddeleteToLogs(this.deletedata);
          Swal.fire('Deleted!', 'Youtube Url Detail has been deleted.', 'success');
          this.getYouTubeDetails();
        });
      }
    });
  }

  addtologs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.youtubeurldata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "YouTube URL";
      this.logs.Msg = "YouTube URL "+ this.youtubeurldata.youtubeURL + "  has been added to : " + this.logs.PropertyName +  " by " + this.logs.updatedby;
      // console.log(this.logs);
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }
 
  addUpdationToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.youtubeurldata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "YouTube URL";
      this.logs.Msg = " YouTube URL details of " + this.logs.PropertyName + "has been updated to " + this.youtubeurldata.youtubeURL + " by " + this.logs.updatedby;
      // console.log(this.logs);
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }

  adddeleteToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.youtubeurldata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "YouTube URL";
      this.logs.Msg = " YouTube URL "  + this.youtubeurldata.youtubeURL+ "  of " + this.logs.PropertyName + " has been deleted by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res => {
        console.log(res);
      })
    })
  }


}
function content(content: any) {
  throw new Error('Function not implemented.');
}

