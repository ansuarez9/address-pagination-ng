import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Address } from "../interfaces/IAddress";

@Injectable()
export class AddressService {
    private _addressToUpdate: Subject<{address: Address, deleteAddress: boolean}> = new Subject();
    addressToUpdate$: Observable<{address: Address, deleteAddress: boolean}> = this._addressToUpdate.asObservable();

    private _addressToModal: Subject<Address> = new Subject();
    addressToModal$: Observable<Address> = this._addressToModal.asObservable();

    private 

    randomIdGenerator() {
        return Math.floor(Math.random() * 10000);
    }
    
    data: Address[] = [
        {
            "id": this.randomIdGenerator(),
            "nickname": 'Primary',
            "fullName": "Haile Quench",
            "address1": "111 West 53rd St",
            "city": "New York",
            "state": "NY",
            "zip": '11201',
            "selected": true
        },
        {
            "id": this.randomIdGenerator(),
            "nickname": 'Parent\'s Home',
            "fullName": "Bill Truitt",
            "address1": "6984 Fair Oaks Rd",
            "address2": "#207",
            "city": "Arlington",
            "state": "VA",
            "zip": '22204',
            "selected": false
        },
        {
            "id": this.randomIdGenerator(),
            "nickname": 'Summer Home',
            "fullName": "Weston McCload",
            "address1": "539 University Dr",
            "address2": "#7D",
            "city": "Chicago",
            "state": "Il",
            "zip": '60653',
            "selected": false
        },
        {
            "id": this.randomIdGenerator(),
            "nickname": 'Winter Home',
            "fullName": "Weston McCload",
            "address1": "533 Tavern Rd",
            "city": "San Jose",
            "state": "CA",
            "zip": '11201',
            "selected": false
        },
        {
            "id": this.randomIdGenerator(),
            "nickname": 'Parent\'s Home',
            "fullName": "Amy Truitt",
            "address1": "6984 Fair Oaks Rd",
            "address2": "#207",
            "city": "Arlington",
            "state": "VA",
            "zip": '22204',
            "selected": false
        },
        {
            "id": this.randomIdGenerator(),
            "nickname": 'Summer Home',
            "fullName": "Steve McCload",
            "address1": "539 University Dr",
            "address2": "#7D",
            "city": "Chicago",
            "state": "Il",
            "zip": '60653',
            "selected": false
        },
        {
            "id": this.randomIdGenerator(),
            "nickname": 'Winter Home',
            "fullName": "Jean McCload",
            "address1": "533 Tavern Rd",
            "city": "San Jose",
            "state": "CA",
            "zip": '11201',
            "selected": false
        }
    ];

    getInitialAddresses(): Observable<Address[]> {
        return of(this.data);
    }

    saveAddressForm(address: Address, deleteAddress = false){
        this._addressToUpdate.next({address: address, deleteAddress: deleteAddress});
    }

    sendAddressToModal(address: Address){
        this._addressToModal.next(address);
    }

}
