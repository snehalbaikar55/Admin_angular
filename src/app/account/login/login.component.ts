import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { JarwisService } from 'src/app/service/jarwis.service';
import { TokenService } from 'src/app/service/token.service';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { Form } from 'src/app/app.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  
  
  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  layout_mode!: string;
  fieldTextType!: boolean;
  

  form = new Form;
  Name: any;
  userdata: any;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private Jarwis: JarwisService,
    private Token:TokenService,
    private auth : AuthService,
    private dataservice:DataService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    if(this.Token.loggedIn())
    {
      this.router.navigate(['dashboard']);
    }
    else
    {
      this.router.navigate(['/login']);
    }
   }

  
  /**
   * Form submit
   */

  onSubmit() {
    this.userdata = this.form;
     //console.log(this.form);
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data,this.userdata),
      error=>this.handleError(error)
    );
  }
  handleError(error:any){
    this.error=error.error.error;
  
   }
  handleResponse(data: any,user: any) {
    this.Token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.Name = user;
    sessionStorage.setItem('loggedUser', this.Name.email);
    localStorage.setItem('loggedUser', this.Name.email);
     this.router.navigateByUrl('dashboard');
     
    // console.log(this, "THIS");
  }

  /**
   * Password Hide/Show
   */
  // toggleFieldTextType() {
  //   this.fieldTextType = !this.fieldTextType;
  // }

}
