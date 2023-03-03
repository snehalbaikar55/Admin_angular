import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { Price } from './add-pricing.model';
import { Logs } from '../../managelogs/managelogs.model';

@Component({
  selector: 'app-add-pricing',
  templateUrl: './add-pricing.component.html',
  styleUrls: ['./add-pricing.component.scss']
})
export class AddPricingComponent implements OnInit {

  prices: any
  PropertyID: any;
  data: any;
  priceArr: any
  pricedetails: any;
  editprice: any;
  editpricedetails: any;
  editprice_id: any;

  public price = {
    ID: null,
    Price: null,
    PropertyID: null,
    Type: null,
    CarpetArea: null,
    updatedby: null,
    updationDate: null
  };

  public error = {
    ID: null,
    Price: null,
    PropertyID: null,
    Type: null,
    CarpetArea: null,
    updatedby: null,
    updationDate: null
  }

  editID: any;
  updatedprice: any;
  email: any;
  loggerdata: any;
  loggername: any;
  property: any;
  pricingdata: any;
  propertydata: any;
  logs = new Logs;
  deletedata: any;
  updatedata: any;
  adddata: any;
  constructor(
    private dataservice: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.PropertyID = this.route.snapshot.params.id;
    //console.log(this.PropertyID);
    this.price.PropertyID = this.PropertyID;
    this.getpricingdetails();
    this.logger();
  }

  logger() {
    this.email = sessionStorage.getItem('loggedUser');
    this.dataservice.getuserslist(this.email).subscribe(res => {
      this.loggerdata = res;
      this.loggername = this.loggerdata[0].Name;
      //console.log("price",this.loggername);
      this.price.updatedby = this.loggername;
    })
  }
  getpricingdetails() {
    this.dataservice.getprice(this.PropertyID).subscribe(res => {
      this.pricedetails = res;
    })
  }
  onSubmit() {
    this.dataservice.addprice(this.price).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      //this.router.navigateByUrl('/manageusers');
    )
  }

  handleResponse(data: any) {
    this.adddata = data;
    this.closeModal(content);
    //this.reloadComponent();
    this.addtologs(this.adddata);
    this.getpricingdetails();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Price Details Has Been Added',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  handleError(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }

  Update() {
    this.editprice_id = this.editpricedetails.ID;
    this.dataservice.updatepricedetails(this.editprice_id, this.editpricedetails).subscribe(
      data => this.handleResponse1(data),
      error => this.handleError1(error)
    )
  }
  handleResponse1(data: any) {
    this.updatedata = data;
    this.addUpdationToLogs(this.updatedata);
    this.closeModal(content);
    //this.reloadComponent();
    this.getpricingdetails();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Price Details has been Updated',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  handleError1(error: any) {
    this.error = error.error.errors;
    //console.log(this.error.Type);
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

  openModal1(ID: any, data: any) {
    // this.editID = ID;
    // console.log(data);
    this.editpricedetails = data
    this.modalService.open(ID, data);
  }

  deletePriceRow(data: any) {
    this.deletedata = data;
    //console.log(this.deletedata);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t delete this Developer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.dataservice.deletePrice(this.deletedata.ID).subscribe(response => {
          this.adddeleteToLogs(this.deletedata);
          Swal.fire('Deleted!', 'Price Details has been deleted.', 'success');
          this.getpricingdetails();
        });
      }
    });
  }

  addtologs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.pricingdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Pricing";
      this.logs.Msg = "For " + this.logs.PropertyName + " pricing has been added as Property type : " + this.pricingdata.Type + " Carpet Area : " + this.pricingdata.CarpetArea + " Price : " + this.pricingdata.Price + " by " + this.logs.updatedby;
      // console.log(this.logs);
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }
 
  addUpdationToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.pricingdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Pricing";
      this.logs.Msg = " Pricing details of " + this.logs.PropertyName + " has been updated to Property type : " + this.pricingdata.Type + " Carpet Area : " + this.pricingdata.CarpetArea + " Price : " + this.pricingdata.Price + " by " + this.logs.updatedby;
      // console.log(this.logs);
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }

  adddeleteToLogs(data: any) {
    this.dataservice.getProppertiesDetails(this.PropertyID).subscribe(res => {
      this.property = res;
      this.pricingdata = data;
      this.propertydata = this.property[0];
      this.logs.updatedby = this.loggername;
      this.logs.PropertyID = this.propertydata.PropertyID;
      this.logs.PropertyName = this.propertydata.PropertyName;
      this.logs.Attribute = "Price";
      this.logs.Msg = " Pricing details of " + this.logs.PropertyName + " has been deleted by " + this.logs.updatedby;
      this.dataservice.addLogs(this.logs).subscribe(res => {
        //console.log(res);
      })
    })
  }

  reloadComponent() {
    let ID = this.PropertyID;
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}

function content(content: any) {
  throw new Error('Function not implemented.');
}

