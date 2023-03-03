import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/service/data.service';
import { Editdeveloper, error } from './editdeveloper.model';
// import { error } from '../adduser/addusers.model';
 
@Component({
  selector: 'app-editdeveloper',
  templateUrl: './editdeveloper.component.html',
  styleUrls: ['./editdeveloper.component.scss']
})
export class EditdeveloperComponent implements OnInit {
  
  ID: any;
  editdeveloper = new Editdeveloper;
  data: any;
  developer: any;
  developerName: any;
  isDeveloper: any;
  error = new error;
   
  constructor(
    private route:ActivatedRoute,
    private dataservice: DataService,
    private router: Router
  ) { }
 
  ngOnInit(): void {
    this.ID=this.route.snapshot.params.id;
    this.getDeveloper();
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

  getDeveloper(){
    this.dataservice.getDeveloperbyid(this.ID).subscribe(res=>{
      this.data=res;
       this.developer=this.data;  
    })
  }
 
  updatedeveloper(){
    this.dataservice.editDeveloperData(this.ID,this.developer).subscribe(res=>{
      Swal.fire('Updated!', 'Developer has been Updated.', 'success');
      this.router.navigate(['/managedeveloper']);
    })
  }
}
