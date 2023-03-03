import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/service/data.service';
import { Editdeveloper } from './editdeveloper.model';
 
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
   
  constructor(
    private route:ActivatedRoute,
    private dataservice: DataService,
    private router: Router
  ) { }
 
  ngOnInit(): void {
    this.ID=this.route.snapshot.params.id;
    this.getDeveloper();
  }
  getDeveloper(){
    // console.log(this.ID);
    this.dataservice.getDeveloperbyid(this.ID).subscribe(res=>{
      this.data=res;
       this.developer=this.data;
        //  console.log(res);
        
    })
  }
 
  updatedeveloper(){
    this.dataservice.editDeveloper(this.ID,this.developer).subscribe(res=>{
      Swal.fire('Updated!', 'Developer has been Updated.', 'success');
          // console.log(res);
          this.router.navigate(['/managedeveloper']);
    })
  }
 
}
