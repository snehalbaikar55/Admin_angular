import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  PropertyID: any;

  constructor(
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
  }
  back(){
    this.router.navigate(['/addData/'+this.PropertyID]);
   }
}
