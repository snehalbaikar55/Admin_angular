import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { Propertydetails } from '../manageproperties/manageproperties.model';
import { Logs } from '../managelogs/managelogs.model';
import { FormDetails } from '../properties/form-info/formInfo.model';
import { AddData } from './adddata.model';


@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  data: any;
  ID: any;
  data1: any;
  error1: any;
  currentName: any;
  propertydetailsArr: any;
  length: any;
  PropertyID: any;
  propertydetails = new Propertydetails;
  leadsArr: any;
  textAreaArr: any;
  logs = new Logs;
  adddata = new AddData;

  public property = {
    PropertyName: null,
    Rera: null,
    ID: null,
    PropertyID: null
    //updatedby : null
  }

  breadCrumbItems!: Array<{}>;
  public Collapsed = false;
  public firstCollapse = false;
  public secondCollapse = false;
  public bothColleaps = false;


  @ViewChildren('myDiv')
  divs!: QueryList<ElementRef>;

  public disabledButton = false;
  items = [{ name: 'Yes' }];
  propertydata: any;
  fname: any;
  loggername: any;
  formdata: any;
  //forminfo :any;
  forminfo = new FormDetails;
  resdata: any;
  error: any;
  forminfodata: any;
  email: any;
  loggerdata: any;
  loader = false;

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
     this.getTextAreasData();
    this.getLeadsDetails();
    this.getPropperties();
    this.getProppertiesdetails();
    this.propertystatus();
    this.logger();
    this.breadCrumbItems = [
      { label: 'Components' },
      { label: 'Tabs & Accordions', active: true }
    ];
  }
  logger() {
    this.email =  sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
        //console.log("rera",this.loggername);
      this.forminfo.updatedby = this.loggername;
    })
  }

  getTextAreasData(){
    this.dataservice.getTextAreaByID(this.PropertyID).subscribe(res=>{
        this.textAreaArr=res;
        //console.log("this text area details",res);
    })
  }

  onSubmit() {
    this.dataservice.addrera(this.property).subscribe(res => {
      // console.log(res);
      this.router.navigate(['/manageproperties']);
    })
  }

  getLeadsDetails() {
    this.loader = true;
    this.dataservice.getLeadByID(this.PropertyID).subscribe(res => {
      this.loader = false;
      //console.log("leads:",res);
      this.leadsArr = res;
      this.leadsArr.PropertyID = this.property.PropertyID;
      // console.log(this.property.PropertyID);
    })
  }
  getPropperties() {
    this.dataservice.getProppertiesD(this.PropertyID).subscribe(res => {
      //console.log(res);
      this.data = res;
      this.property = this.data;
      this.property.PropertyID = this.property.PropertyID;
      // console.log(this.property.PropertyID);
    })
  }
  getProppertiesdetails() {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      //console.log(res);
      this.propertydetailsArr = res;
      var len = this.propertydetailsArr.length;
      this.length = this.propertydetailsArr.length;
      //console.log(len);
    });

  }
  openModal(content: any) {
    this.modalService.open(content);
  }

  onSubmit1() {
    this.dataservice.addToPropertyDetails(this.property).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Property Is Registered Successfully',
        showConfirmButton: false,
        timer: 1500,
      })
      this.getProppertiesdetails();
    });
  }
  ngAfterViewInit() {
    this.disabledButton = this.divs.length > 0;
    this.changeDetector.detectChanges();
    this.divs.changes.subscribe((divs) => {
      this.disabledButton = divs.length > 0;
      this.changeDetector.detectChanges();
    });
  }
  activInactive(data:any){
    this.formdata = data;
    this.forminfo = this.formdata[0];
    this.forminfo.updatedby = this.loggername;
    if(this.forminfo.status == 0){
      this.forminfo.status = 1;
    }else{
      this.forminfo.status = 0;
    }
      // console.log(this.forminfo);
    this.dataservice.editforminfo(this.forminfo.PropertyID,this.forminfo).subscribe(
       data =>  this.handleResponse1(data,this.forminfo),
      ( error: any) =>  this.handleError1(error)
    )
  }

  handleResponse1(data:any,data1:any){
    this.resdata = data1;
    // console.log(data1);
    if (this.resdata.status == 1){
       this.addUpdationtolog(this.resdata.formname+" Activated");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: this.resdata.formname + 'Property Has Been Activated',
          showConfirmButton: false,
          timer: 1500,
        })
    }else{
       this.addUpdationtolog(this.resdata.formname+" Deactivated");
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: this.resdata.formname + 'Property Has Deactivated',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  handleError1(error:any){
    this.error = error.error.errors;
  }

  addUpdationtolog(data:any){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
      this.propertydata = res;
       this.fname = data;
      // console.log(this.amenities);
      this.propertydata = this.propertydata[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName =  this.propertydata.PropertyName;
      //console.log(this.logs.PropertyName);
      this.logs.Attribute =  "Form Information";
      this.logs.Msg =  this.fname+" Form Information of " + this.logs.PropertyName +" by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res=>{
        //console.log(res);
      })
  })
  }
  propertystatus(){
    this.dataservice.FormInfoData(this.PropertyID).subscribe(res=>{
      this.formdata = res;
      this.forminfodata = this.formdata[0].PropertyID;
      // console.log(this.forminfo);
    })
  }


}
