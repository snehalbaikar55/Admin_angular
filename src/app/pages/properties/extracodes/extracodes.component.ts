import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { Extracode } from './extracode.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-extracodes',
  templateUrl: './extracodes.component.html',
  styleUrls: ['./extracodes.component.scss']
})
export class ExtracodesComponent implements OnInit {

  logs = new Logs;
  extracode = new Extracode;
  error= new Extracode;
  repos: any;
  PropertyID: any;
  codes: any;
  data: any;
  propn: any;
  msg: any;
  code1details: any;
  code1data: any;
  ID: any;
  code1_id: any;
  code1 : any;
  data1 : any[] = [];
  codes1: any[] = [];
  code2details: any;
  code2data: any;
  code2_id: any;
  code2: any;
  codes2: any[] = [];
  code3details: any;
  code3data: any;
  code3_id: any;
  code3: any;
  codes3: any[] = [];
  code4details: any;
  code4data: any;
  code4_id: any;
  code4: any;
  codes5: any[] = [];
  code: any;
  code1_del_id: any;
  del_code1: any;
  del_id: any;
  del_code1_id: any;
  del_data: any;
  del_code: any;
  dele_code2: any;
  code2_id_del: any;
  dele_code2_data: any;
  dele_code1: any;
  dele_code1_data: any;
  code1_id_del: any;
  dele_code3: any;
  dele_code3_data: any;
  code3_id_del: any;
  dele_code4: any;
  dele_code4_data: any;
  code4_id_del: any;
  email: any;
  loggerdata: any;
  loggername: any;
  property: any;
  propertydata: any;
  extracodedata: any;
  codestologs: any;
  code1name: any;
  updation_code1: any;
  code1update: any;
  code2name: any;
  code2update: any;
  code3name: any;
  code5: any;
  code4name: any;
  delete: any;
  codename: any;
  

  constructor(
    private dataservice: DataService,
    private modalService: NgbModal,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    this.extracode.PropertyID = this.PropertyID;
    this.getProppertie();
    this.getExtraCode();
    this.logger();
    
  }

  openModal(content: any) {
    this.modalService.open(content);
  }
  getProppertie(){
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
       this.data = res;
       this.propn = this.data[0].PropertyName;
        this.extracode.Msg = "Google analytics codes of " + this.propn + " updated to";
      //console.log(this.propn);
    
     })
   }
   getExtraCode(){
    //  this.code_id = PropertyID
    this.dataservice.getextracode(this.PropertyID).subscribe(  
      data => this.handleResponse(data),
      error=>this.handleError(error)
    )
  }
  handleResponse(data:any){
    this.codes = data;
      // console.log(this.codes);
  }

  handleError(error:any){
     this.error = error.error.errors;
  }
  addExtraCode(){
    this.dataservice.addextracode(this.extracode).subscribe(
      data => this.handleResponse1(data),
      error=>this.handleError1(error)
    )
  }

  handleResponse1(data:any){
    this.addtologs();
    this.repos = data;
      this.closeModal(content);
      this.getExtraCode();
      //this.reloadComponent();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Extra Code has been Added.',
        showConfirmButton: false,
        timer: 1500,
      });
  }

  handleError1(error:any){
    // console.log(error);
    this.error = error.error.errors;
  }

  

  closeModal(content: any) {
    this.modalService.dismissAll (content);
  } 

  reloadComponent() {
    let ID = this.PropertyID;
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

    opencode1(editcode1modal: any, data1: any) {
     
    this.code1details = data1;
    this.code1data = this.code1details;
    this.modalService.open(editcode1modal,this.code1data);
    
   }

   updateCode1(){
     this.code1_id = this.code1data.ID;
     this.code1 = this.code1data;
    this.dataservice.editextracode(this.code1_id,this.code1).subscribe(  
      data => this.handleResponse2(data,this.code1),
      error=>this.handleError2(error)
    )
   }

   handleResponse2(data:any,data1:any){
     this.codestologs = data1;
      this.code1name = "Clickcease";
      this.code1data = this.codestologs.code1;
        this.addUpdationToLogs(this.code1data, this.code1name);
         //console.log(this.code1name);
       this.closeModal(content);
       this.getExtraCode();
       //this.reloadComponent();
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Code1 has been Updated.',
        showConfirmButton: false,
        timer: 1500,
      });
        //  console.log(this.codes);
  }

  handleError2(error:any){
      // console.log(error);
     this.error = error.error.errors;
  }

    opencode2(editcode2modal: any, data2: any) {
        this.code2details = data2;
      this.code2data = this.code2details;
      //  console.log(this.code2data);
      this.modalService.open(editcode2modal, this.code2data);
      
    }

    updateCode2(){
      
      this.code2_id = this.code2data.ID;
      this.code2 = this.code2data;
     // console.log(this.code2update);
      this.dataservice.editextracode(this.code2_id,this.code2).subscribe(
        data => this.handleResponse3(data,this.code2),
        error=>this.handleError3(error)
      )
    }

    handleResponse3(data:any,data1:any){
        this.code2 = data1;
        this.code2name = "Google analytics";
        this.code2data = this.code2.code2;
        // console.log(this.code2update);
        this.addUpdationToLogs(this.code2data, this.code2name);
        this.closeModal(content);
        this.getExtraCode();
        //this.reloadComponent();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Code2 has been Updated.',
          showConfirmButton: false,
          timer: 1500,
        });
          // console.log(this.codes);
  }

  handleError3(error:any){
      //  console.log(error);
      this.error = error.error.errors;
  }

  opencode3(editcode3modal: any, data3: any) {
      this.code3details = data3;
    this.code3data = this.code3details;
    //  console.log(this.code3data);
    this.modalService.open(editcode3modal, this.code3data);

  }

    updateCode3(){
      this.code3_id = this.code3data.ID;
      this.code3 = this.code3data;
      // console.log(this.code3);
      this.dataservice.editextracode(this.code3_id,this.code3).subscribe(
        data => this.handleResponse4(data,this.code3),
        error=>this.handleError4(error)
      )
    }

    handleResponse4(data:any,data1:any){
        this.code3 = data1;
        this.code3name = "Facebook";
        this.code3data = this.code3.code3;
        this.addUpdationToLogs(this.code3data, this.code3name);
        // console.log(this.code3);
        this.closeModal(content);
        this.getExtraCode();
          //this.reloadComponent();
          Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Code 3 has been Updated.',
          showConfirmButton: false,
          timer: 1500,
        });
          // console.log(this.codes);
    }

    handleError4(error:any){
      //  console.log(error);
      this.error = error.error.errors;
    }

    opencode4(editcode4modal: any, data4: any) {
        this.code4details = data4;
        this.code4data = this.code4details;
        // console.log(this.code4data);
        this.modalService.open(editcode4modal, this.code4data);

    }

    updateCode4(){
      this.code4_id = this.code4data.ID;
      this.code4 = this.code4data;
      // console.log(this.code4);
      this.dataservice.editextracode(this.code4_id,this.code4).subscribe(
        data => this.handleResponse5(data,this.code4),
        error=>this.handleError5(error)
      )
    }

    handleResponse5(data:any,data1:any){
        this.codes5 = data;
        this.code4 = data1;
        this.code4name = "Event Snippet";
        this.code4data = this.code4.code4;
        this.addUpdationToLogs(this.code4data, this.code4name);
        this.closeModal(content);
        this.getExtraCode();
          //this.reloadComponent();
          Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Code 4 has been Updated.',
          showConfirmButton: false,
          timer: 1500,
        });
          // console.log(this.codes);
    }

    handleError5(error:any){
      //  console.log(error);
      this.error = error.error.errors;
    }

   

  deletecode1(data:any){
    this.dele_code1 = data;
    this.dele_code1_data = this.dele_code1;
    this.code1_id_del = this.dele_code1.ID;
    this.dele_code1_data.code1 = null;
    // console.log(this.dele_code1_data)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t delete this Extra Codes!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.dataservice.editextracode(this.code1_id_del,this.dele_code1_data).subscribe(
          data => this.handleResponse7(data),
          error=>this.handleError7(error)
        )}
    });
  }

  handleResponse7(data:any){
    this.delete = "Clickcease";
    this.adddeleteToLogs(this.delete);
    // console.log(data);
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Code 1 has been Deleted.',
        showConfirmButton: false,
        timer: 1500,
      });
       //console.log(data);
  }

  handleError7(error:any){
    //  console.log(error);
    this.error = error.error.errors;
  }

  deletecode2(data:any){
    this.dele_code2 = data;
    this.dele_code2_data = this.dele_code2;
    this.code2_id_del = this.dele_code2.ID;
    this.dele_code2_data.code2 = null;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t delete this Extra Codes!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.dataservice.editextracode(this.code2_id_del,this.dele_code2_data).subscribe(
          data => this.handleResponse8(data),
          error=>this.handleError8(error)
        )}
    });
  }

  handleResponse8(data:any){
    this.delete = "Google analytics";
    this.adddeleteToLogs(this.delete);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Code 2 has been Deleted.',
      showConfirmButton: false,
      timer: 1500,
    });
       //console.log(this.codes5);
    }

    handleError8(error:any){
      //console.log(error);
      this.error = error.error.errors;
    }

    deletecode3(data:any){
      this.dele_code3 = data;
      this.dele_code3_data = this.dele_code3;
      this.code3_id_del = this.dele_code3.ID;
      this.dele_code3_data.code3 = '<script> !function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0"; n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window, document,"script", "https://connect.facebook.net/en_US/fbevents.js"); fbq("init", "2687918367998614"); fbq("track", "PageView"); </script> <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2687918367998614&ev=PageView&noscript=1"/> </noscript>'	
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t delete this Extra Codes!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Yes, delete it!'
      }).then(res => {
        if (res.value) {
          this.dataservice.editextracode(this.code3_id_del,this.dele_code3_data).subscribe(
            data => this.handleResponse9(data),
            error=>this.handleError9(error)
          )}
      });
    }

    handleResponse9(data:any){
      this.delete = "Facebook";
      this.adddeleteToLogs(this.delete);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Code 3 has been Deleted.',
        showConfirmButton: false,
        timer: 1500,
      });
        //console.log(this.codes5);
    }

    handleError9(error:any){
    //console.log(error);
    this.error = error.error.errors;
    }

    deletecode4(data:any){
      this.dele_code4 = data;
      this.dele_code4_data = this.dele_code4;
      this.code4_id_del = this.dele_code4_data.ID;
      this.dele_code4_data.code4 = null;	
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t delete this Extra Codes!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Yes, delete it!'
      }).then(res => {
        if (res.value) {
          this.dataservice.editextracode(this.code4_id_del,this.dele_code4_data).subscribe(
            data => this.handleResponsecode4(data),
            error=>this.handleErrorcode4(error)
          )}
      });
    }

    handleResponsecode4(data:any){
      this.delete = "Event Snippet";
      this.adddeleteToLogs(this.delete);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Code 4 has been Deleted.',
        showConfirmButton: false,
        timer: 1500,
      });
        // console.log(this.codes5);
    }

    handleErrorcode4(error:any){
    //console.log(error);
    this.error = error.error.errors;
    }

    logger(){
      this.email =  sessionStorage.getItem('loggedUser');
      this.dataservice.getuserslist(this.email).subscribe(res=>{
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
    })
    }

    addtologs(){
      this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
        this.property = res;
        this.propertydata = this.property[0];
        this.logs.updatedby = this.loggername;
        this.logs.PropertyID = this.propertydata.PropertyID;
        this.logs.PropertyName =  this.propertydata.PropertyName;
        this.logs.Attribute =  "Extra codes";
        this.logs.Msg =  " Extra codes of " +this.logs.PropertyName +" are added by "+ this.logs.updatedby;
         this.dataservice.addLogs(this.logs).subscribe(res=>{
           
         })
      })
    }
    addUpdationToLogs(data:any,data1:any){
        //console.log(data1);
      this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
          this.property = res;
          this.extracodedata = data;
          this.updation_code1 = data1;
          this.propertydata = this.property[0];
          this.logs.updatedby = this.loggername;
          this.logs.PropertyID = this.propertydata.PropertyID;
          this.logs.PropertyName =  this.propertydata.PropertyName;
          this.logs.Attribute =  " Extra codes";
          this.logs.Msg = this.updation_code1+" codes of "+ this.logs.PropertyName +" updated to " + this.extracodedata +" by "+ this.logs.updatedby;
          //  console.log(this.logs);
          this.dataservice.addLogs(this.logs).subscribe(res=>{
            // console.log(res);
          })
      })
    }
    adddeleteToLogs(data:any){
      this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res=>{
        this.property = res;
        this.codename = data;
        this.propertydata = this.property[0];
        this.logs.updatedby = this.loggername;
        this.logs.PropertyID = this.propertydata.PropertyID;
        this.logs.PropertyName =  this.propertydata.PropertyName;
        this.logs.Attribute =  " Extra codes";
        this.logs.Msg = this.codename +" code of " + this.logs.PropertyName +" has been deleted by " + this.logs.updatedby;
        this.dataservice.addLogs(this.logs).subscribe(res=>{
          // console.log(res);
        })
    })
    }
    
}
function content(content: any) {
  throw new Error('Function not implemented.');
}

