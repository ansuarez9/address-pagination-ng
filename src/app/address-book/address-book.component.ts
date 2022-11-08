import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Address } from "../interfaces/IAddress";
import { AddressService } from "../services/address.service";

@Component({
    selector: 'address-book',
    templateUrl: './address-book.component.html',
    styleUrls: ['address-book.component.scss']
})
export class AddressBookComponent implements OnInit, OnDestroy {
    private _displaySize: number;
    set displaySize(size: number) {
        this._displaySize = size;
        this.viewRange = [0, size];
        this.viewAddresses = [...this.addresses].slice(this.viewRange[0], this.viewRange[1]);
    }

    @Input() 
    get displaySize(): number {
        return this._displaySize;
    }

    addresses: Address[] = [];
    viewRange: number[] = [];
    viewAddresses: Address[] = [];
    addressSelected: boolean;
    destroySubscriptions$ = new Subject();

    constructor(private addressService: AddressService){}

    ngOnInit(): void {
        this.addressSelected = true;
        this.addressService.getInitialAddresses()
            .subscribe(addresses => this.addresses = addresses);

        this.viewAddresses = this.addresses.slice(this.viewRange[0], this.viewRange[1]);

        this.addressService.addressToUpdate$
            .pipe(
                takeUntil(this.destroySubscriptions$)
            )
            .subscribe(({address, deleteAddress}) => {
                if(deleteAddress){
                    this.addresses = this.addresses.filter(a => a.id !== address.id);
                } else if(address.selected){
                    this.resetSelectedProp();
                }
                if(address.id){
                    this.addresses = this.addresses.map(a => {
                        if(a.id === address.id){
                            return address;
                        }

                        return a;
                    });
                } else {
                    address.id = this.addressService.randomIdGenerator();
                    this.addresses = [address, ...this.addresses];
                }

                this.addressSelected = this.addresses.findIndex(address => address.selected === true) >= 0;
                this.viewAddresses = this.addresses.slice(this.viewRange[0], this.viewRange[1]);
            });
    }

    ngOnDestroy(): void {
        this.destroySubscriptions$.next();
        this.destroySubscriptions$.complete();
    }

    onSelected(a){
        this.resetSelectedProp(a);
        this.viewAddresses = this.addresses.slice(this.viewRange[0], this.viewRange[1]);
        this.addressSelected = true;
    }

    resetSelectedProp(a?) {
        this.addresses = this.addresses.map(address => ({...address, selected: (address.id === a?.id ? a.selected : false)}));
    }
}