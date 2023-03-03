import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { ManageusersService } from '../manageusers/manageusers.service';
import { EditusersService } from './edituser.service';
import { edituser } from './editusers.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editusers',
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.scss']
})

export class EditusersComponent implements OnInit {
  data:any;
  user_id:any;
  id:any;
  error = new edituser;
  role: any;
 
  public users = {
   Name : null,
   mobile_no:null,
   email:null,
   role:null
  }

  roleData = [
    "IT",
    "Team Leader"
  ]
  constructor(

    private dataservice : EditusersService,
    private route:ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    let user_id = this.route.snapshot.params.id;
    this.id=user_id;
    this.getUserslist();
   
  }

  onRoleChange(data : any) {
    this.role = data;
  }

  onSubmit(){
    this.dataservice.updateusers(this.id,this.users).subscribe(
      data => this.handleResponse(data),
      error=>this.handleError(error)
    );
   }
 
 
   getUserslist(){
   this.dataservice.getuserslist(this.id).subscribe(res=>{
   this.data=res;
   this.users = this.data;
    })
  }

  handleResponse(data:any){
    Swal.fire('Added!', 'User Details has been Added.', 'success');
    this.router.navigateByUrl('/manageusers');
  }

  handleError(error:any){
    this.error = error.error.errors;
  }
}
