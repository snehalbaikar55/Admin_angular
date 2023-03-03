import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { developerStatusDetails } from './developers-property.model';


@Component({
  selector: 'app-developers-property',
  templateUrl: './developers-property.component.html',
  styleUrls: ['./developers-property.component.scss']
})
export class DevelopersPropertyComponent implements OnInit {
  propertyData : any[];
  DeveloperData: any;
  DeveloperResult: any[];
  DeveloperProperty: Object;
  email: string;
  loggerdata: Object;
  loggername: any;
  developerStatusDetails = new developerStatusDetails;

  constructor(
    private dataservice : DataService,
    private changeDetector: ChangeDetectorRef,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getAllDevelopers();
    // this.propertystatus();
    this.logger();
  }

  logger() {
    this.email =  sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
    })
  }

  getAllDevelopers() {
    this.dataservice.getDistDeveloper().subscribe(res=>{
      this.DeveloperData = res;
      let DevArr = [];

      this.DeveloperData.forEach((item, key) => {
        DevArr[key] = item.Developer;
      });

      this.DeveloperResult = DevArr;
    });
  }

  onDeveloperChange(event) {
    // let devName = event.trim();
    // console.log(devName);

    this.dataservice.getDeveloperProperty(event).subscribe(res => {
      // console.log(res, " RESULT");
      this.DeveloperProperty = res;
    });
  }

  propActivInactive(propId:any, data : any) {
    this.developerStatusDetails.updatedby = this.loggername;
    this.developerStatusDetails.status = data;

    if(this.developerStatusDetails.status == 0)
    {
      this.developerStatusDetails.status = 1;
    }
    else
    {
      this.developerStatusDetails.status = 0;
    }
    
    this.dataservice.activeDeactivateProp(propId, this.developerStatusDetails).subscribe(res=>{
      console.log("RESULT ", res);
      let propStatus = '';
      if(res['active'] == 1) propStatus = 'Active';
      else propStatus = 'Deactive';

      // this.router.navigate(['/devproperty']);
      Swal.fire({
        title: res['PropertyName']+': Property Status '+propStatus,
        text: 'Your Property Status Has Been updated!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Ok'
      }).then(res => {
        if (res.value) {
          window.location.href="/devproperty";
        }
      });
    })
    
  }

}
