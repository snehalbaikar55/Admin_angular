import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { JarwisService } from 'src/app/service/jarwis.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
import { form ,error } from './addusers.model';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

 form = new form;
 error = new error;

// public form = {
//   Name :null,
//   email : null,
//   password : null,
//   password_confirmation:null,
//   mobile_no :null,
//   role : null
 
// };
// public error = {
//   Name:null,
//   email : null,
//   password : null,
//   password_confirmation:null,
//   mobile_no :null,
//   role : null

// };

  constructor(
    private Jarwis: JarwisService,
    private Token:TokenService,
    private router:Router,
    private auth : AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.form.active = 1;
    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponse(data),
     error=>this.handleError(error)
);
  }

  checkMobile(event : any) {
    // this.formBuilder.group({
    //   mobile_no: ['', [ Validators.required,
    //     Validators.pattern("^[0-9]*$"),
    //     Validators.minLength(10), Validators.maxLength(10)]]
    // });
    
  }

  handleResponse(data:any){
    this.Token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    Swal.fire('Added!', 'User Details has been Added.', 'success');
    this.router.navigateByUrl('/manageusers');
  }

  handleError(error:any){
    this.error = error.error.errors;
    console.log(error, 'ERROR');
    
  }
}
