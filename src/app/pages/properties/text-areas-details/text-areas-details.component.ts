import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { TextAreaDetails } from './text-areas-details.model';

@Component({
  selector: 'app-text-areas-details',
  templateUrl: './text-areas-details.component.html',
  styleUrls: ['./text-areas-details.component.scss']
})
export class TextAreasDetailsComponent implements OnInit {
  textareadetails = new TextAreaDetails;
  PropertyID: any;
  textdada: any;
  adddata: any;
  adddata_id: any;
  edit_id: any;
  ReadMore:boolean = true;
  visible:boolean = false;
  constStatusObj = [];

  constructor(
    private dataservice : DataService,
    private http: HttpClient,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.PropertyID=this.route.snapshot.params.id;
      this.textareadetails.PropertyID=this.PropertyID;
      this.getData();
  }

  getData(){
    this.dataservice.gettextareabyid(this.textareadetails.PropertyID).subscribe(res=>{
      let constStatus = res[0].ConStatus;
      this.constStatusObj = JSON.parse(constStatus);
      this.textdada = res;
    })
  }

  add(data:any){
    this.adddata = data;
    this.adddata_id = this.adddata[0].PropertyID;
    // console.log(this.adddata_id);
     this.router.navigate(['/TextAreas/'+this.adddata_id]);
    // console.log(data);
  }
  edit(ID:any){
    this.edit_id = ID;
    this.router.navigate(['/EditTextAreas/'+this.edit_id]);
    // console.log(this.edit_id);
  }

  editShowHide() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible
  }
}
