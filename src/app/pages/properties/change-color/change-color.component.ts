import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { ChangeColor } from './change-color.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss']
})
export class ChangeColorComponent implements OnInit {


  color = new ChangeColor;
  editColour_id: any; 
  editcolourdetails: any;
  PropertyID: any;
  ColourDetails: any;
  editID: any;

  public info = {
    ID:null,
    Colour1:null,
    Colour2:null,
    PropertyID:null
  }
  email: any;
  loggerdata: any;
  loggername: any;
  property: any;
  locationdata: any;
  propertydata: any;
  logs = new Logs;
  updatedata: any;
  
  
  constructor(
    private dataservice : DataService,
    private route : ActivatedRoute,
    private router : Router,
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
    this.PropertyID=this.route.snapshot.params.id;
    //this.info.PropertyID=this.PropertyID;
    this.getColourDetails();
    this.logger();
  }
  logger(){
    this.email =  sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
      //  console.log(this.loggername);
      this.color.updatedby = this.loggername;
    })
  }
  // onSubmit(){
  //   this.dataservice.addChangeColor(this.color).subscribe(res=>{
  //     Swal.fire('Added!', 'Colour has been Added.', 'success');
  //     //this.router.navigateByUrl('/form_info');
  //     this.getColourDetails();
  //   })
  // }
  getColourDetails(){
    this.dataservice.getColour(this.PropertyID).subscribe(res=>{
        this.ColourDetails=res;
        //console.log(this.ColourDetails); 
    })
  }
   Update(){
    this.editColour_id = this.editcolourdetails.PropertyID;
    this.dataservice.updateChangeColor(this.editColour_id,this.editcolourdetails).subscribe(res=>{
      //console.log("colour",res);
      this.updatedata= res;
      this.addUpdationToLogs(this.updatedata);
      Swal.fire('Updated!', 'Colour has been Updated.', 'success');
      this.closeModal(content);
    }) 
  }
  openModal1(edit: any, data:any) {
    this.editID = edit;
    //console.log(data);
    this.editcolourdetails=data
    this.modalService.open(edit,data);
  }
  closeModal(content:any){
    this.modalService.dismissAll(content);
   }
   addUpdationToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.locationdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Change Colour";
      this.logs.Msg = " Change Colour of " + this.logs.PropertyName + " has been updated by " + this.logs.updatedby;
      // console.log(this.logs);
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }
 

}
function content(content: any) {
  throw new Error('Function not implemented.');
}

