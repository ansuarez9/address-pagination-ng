import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressBookComponent } from './address-book/address-book.component';
import { Address } from './interfaces/IAddress';
import { AddressService } from './services/address.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Address Pagination Demo';
  disableNavigation: {next: boolean, previous: boolean} = {
    next: false,
    previous: true
  };

  displaySize: number;

  @ViewChild(AddressBookComponent)
  addressBookComponent: AddressBookComponent;

  constructor(private addressService: AddressService){}

  ngOnInit() {
    this.displaySize = 4;
  }

  changeDisplaySize(size: number) {
    this.displaySize = size;
  }

  onPaginate(nav: string){
    let firstIdxView;
    let lastIdxView;

    if(nav === 'next'){
        firstIdxView = this.addressBookComponent.viewRange[0] + this.displaySize;
        lastIdxView = this.addressBookComponent.viewRange[1] + this.displaySize;
    } else if(nav === 'previous') {
        firstIdxView = this.addressBookComponent.viewRange[0] - this.displaySize;
        lastIdxView = this.addressBookComponent.viewRange[1] - this.displaySize;
    }

    this.addressBookComponent.viewRange = [firstIdxView, lastIdxView];
    this.addressBookComponent.viewAddresses = this.addressBookComponent.addresses.slice(this.addressBookComponent.viewRange[0], this.addressBookComponent.viewRange[1])

    this.disableNavigation = {
      next: this.addressBookComponent.viewRange[1] >= this.addressBookComponent.addresses.length,
      previous: this.addressBookComponent.viewRange[0] === 0
    }
  }

  addNewAddress() {
    this.addressService.sendAddressToModal(this.createNewAddress());
  }

  createNewAddress(): Address {
    return {
      id: null,
      nickname: '',
      fullName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      selected: false
    };
  }

}
