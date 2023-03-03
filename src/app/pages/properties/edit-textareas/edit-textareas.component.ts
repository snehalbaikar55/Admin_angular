import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { EditTextAreas } from './edit-textareas.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-edit-textareas',
  templateUrl: './edit-textareas.component.html',
  styleUrls: ['./edit-textareas.component.scss']
})
export class EditTextareasComponent implements OnInit {
  logs = new Logs;
  edittextqreas = new EditTextAreas;
  PropertyID: any;
  editdata: any;
  editpropertydata: any;
  editdetails: any;
  edit_id: any;
  propertydata: any;
  resdata: any;
  res_id: any;
  goback_id: any;
  email: any;
  loggername: any;
  loggerdata: any;
  property: any;
  subregiondetails : any = [];
  regionData : any;
  Region: any[];
  getAllDeveloper : any = [];
  // Region : any;
  regionName : any;
  propertytype : any;
  Developer : any;
  ConStatus : any;
  loader = false;
  loader_textareas = false;

  // regionData = [
  //   "Central Region",
  //   "Kalyan - Dombivali Region",
  //   "Dombivali - Navi Mumbai Region",
  //   "Western - East Region",
  //   "Western - West Region",
  //   "Thane Region",
  //   "SOBO Region",
  //   "Others"
  // ];

  PropertyTypeData = [
    "Commercial Apartments",
    "Residential Apartments"
  ]

  // conStatusData = [
  //   "New Launch",
  //   "Ready To Move",
  //   "Under Construction"
  // ]

  conStatusData: any[] = [
    { name: 'Premium Project', value: 'PRMPRJ', checked: false },
    { name: 'Focused Project', value: 'FCSPRJ', checked: false },
    { name: 'New Project', value: 'NWPRJ', checked: false },
    { name: 'AOP Project', value: 'AOP', checked: false },
    { name: 'Under Construction', value: 'UCSN', checked: false },
    { name: 'Ready To Move', value: 'RTM', checked: false },
  ];
  selectCategory: any[];
  propConStatus: any;

  constructor(
    private dataservice : DataService,
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.PropertyID=this.route.snapshot.params.id;
    this.edittextqreas.PropertyID = this.PropertyID;
    this.getdetails();
    this.logger();
    this.getAllRegions();
    this.getSubRegion();
    this.showAllDevelopers();
  }
  logger(){
    this.email =  sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
    })
  }


  CheckAllOptions() {
    if (this.propConStatus.every((val) => val.checked == true))
      this.propConStatus.forEach((val) => {
        val.checked = false;
      });
    else
      this.propConStatus.forEach((val) => {
        val.checked = true;
      });
    
    this.edittextqreas.shortName = this.conStatusData;
  }

  CheckOptions() {
    // let getChecked = this.conStatusData.filter((item) => item.checked);
    let getChecked = this.propConStatus.filter((item) => item.checked);
    // console.log(this.propConStatus, "getChecked");
    this.selectCategory = this.propConStatus;
    this.editpropertydata.shortName = getChecked;
  }

  getdetails(){
    this.loader_textareas = true;
    this.dataservice.gettextareabyid(this.PropertyID).subscribe(res=>{
      this.loader_textareas = false;
      if(res[0].ConStatus === null || res[0].ConStatus === "") { 
        this.propConStatus = this.conStatusData; 
      }
      else 
      { 
        this.propConStatus = JSON.parse(res[0].ConStatus); 
      }
      // this.editpropertydata.ConStatus = this.propConStatus;
      this.editpropertydata = res;
    })
  }

  update(data:any){
    
    // this.updatedby = this.loggername;
    this.loader = true;
    this.editdetails = data;
    this.editdetails.updatedby = this.loggername;
    this.propertydata = this.editdetails;
    this.propertydata.ConStatus = this.selectCategory;
    this.edit_id = this.editdetails.PropertyID;
     console.log(this.propertydata);
    this.addtologs();
    this.dataservice.edittextData(this.edit_id,this.propertydata).subscribe(res=>{
      this.loader = false;
       this.router.navigate(['/addData/'+this.edit_id]);
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Text areas & description Has Been Updated',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

  addtologs(){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
      this.property = res;
      // this.amenitiesdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName =  this.propertydata.PropertyName;
      this.logs.Attribute =  "Text areas & description";
      this.logs.Msg =  "Text areas & description has been updated to " +this.logs.PropertyName + " by " + this.logs.updatedby;
       this.dataservice.addLogs(this.logs).subscribe(res=>{
         
       })
    })
  }

  back(){
   this.router.navigate(['/addData/'+this.PropertyID]);
  }

  getAllRegions() {
    this.dataservice.getRegions().subscribe((res:any)=>{
      this.Region = this.getRegionNames(res);
      this.regionData = res;
  // console.log("regionData", this.Region);
      
      // console.log("regionResult", res);
    });
  }

  getRegionNames(Result : any){
    let tempRegion = [];
    Result.forEach((item : any) => {
      tempRegion[item.region_name] = item.region_name;
    });
    // console.log(tempRegion,);
    
    return tempRegion;
  }

  onRegionChange(event : any) {
    // this.edittextqreas.Region = event;
    // console.log(event,"dddd");
    
    // this.regionName = value;
    // console.log(value, "VALUE");
    
    this.dataservice.getSubRegions(event).subscribe(res=>{
      this.subregiondetails = res;
    });
    
  }

  onPropertyTypeChange(data : any) {
    this.propertytype = data;
  }

  onDeveloperChange(data : any) {
    this.Developer = data;
    this.edittextqreas.Developer = data;
  }

  // onConstatusChange(data : any) {
  //   this.ConStatus = data;
  // }

  getSubRegion(){
    this.dataservice.getSubRegions(this.regionName).subscribe(res=>{
      this.subregiondetails = res;
    });
  }

  showAllDevelopers(){
      this.dataservice.getDeveloper().subscribe(res=>{
        console.log(res, "getDeveloper");
      this.getAllDeveloper = res;
    })
  }

}
