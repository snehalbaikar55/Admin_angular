import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { Adddeveloper } from './adddeveloper.model';
 
@Component({
  selector: 'app-adddeveloper',
  templateUrl: './adddeveloper.component.html',
  styleUrls: ['./adddeveloper.component.scss']
})
export class AdddeveloperComponent implements OnInit {
 
  adddeveloper = new Adddeveloper; //model name of model.ts file
  constructor(
    private dataservice:DataService,
    private router: Router
 
    ) { }
 
  ngOnInit(): void {
  }
 
  addDvveloperdata(): void{
 
    this.dataservice.addDeveloper(this.adddeveloper).subscribe(res =>{
      Swal.fire('Added!', 'Developer has been Added.', 'success');
      this.router.navigate(['/managedeveloper']);
      // console.log(res);
    })
 
  }
 
 
}
