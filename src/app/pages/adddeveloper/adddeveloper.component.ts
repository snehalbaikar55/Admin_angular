import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { Adddeveloper, error } from './adddeveloper.model';
import { Logs } from '../managelogs/managelogs.model';
 
@Component({
  selector: 'app-adddeveloper',
  templateUrl: './adddeveloper.component.html',
  styleUrls: ['./adddeveloper.component.scss']
})
export class AdddeveloperComponent implements OnInit {
 
  adddeveloper = new Adddeveloper; //model name of model.ts file
  error = new error;
  developerName: any;
  isDeveloper: any;
  email: string;
  loggername: any;
  loggerdata: any;

  constructor(
    private dataservice:DataService,
    private router: Router
 
    ) { }
 
  ngOnInit(): void {
    this.logger();
  }
 
  logger(){
    // this.email =  sessionStorage.getItem('loggedUser');
    this.email =  localStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
      this.adddeveloper.updatedby = this.loggername;
    })
    
  }

  addDvveloperdata(): void{
 
    this.dataservice.addDeveloper(this.adddeveloper).subscribe(res =>{
      Swal.fire('Added!', 'Developer has been Added.', 'success');
      this.router.navigate(['/managedeveloper']);
      // console.log(res);
    })
 
  }

  checkAvail(event : any){
      this.developerName = event.target.value;
      if(this.developerName)
      {
        this.dataservice.checkDeveloper(this.developerName).subscribe(
          
          data => this.handleResponse(data),
          error=>this.handleError(error)  
          );
      }
    }  
    
    handleResponse(data:any){
      
      if(data == 1) this.isDeveloper = "Developer is Already Exists!";
      else this.isDeveloper = "";
      
  }

  handleError(error:any){
    this.error = error.error.errors;
  }
 
}
