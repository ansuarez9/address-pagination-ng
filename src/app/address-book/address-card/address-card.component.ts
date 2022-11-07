import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Address } from "src/app/interfaces/IAddress";
import { AddressService } from "src/app/services/address.service";

@Component({
    selector: 'address-card',
    templateUrl: 'address-card.component.html',
    styleUrls: ['address-card.component.scss']
})
export class AddressCardComponent {
    private _address: Address;
    set address(a) {
        this._address = a;
        this.selected = a?.selected;
    }

    @Input()
    get address(): Address {
        return this._address;
    }

    selected?: boolean;

    @Output()
    onSelected: EventEmitter<any> = new EventEmitter();

    constructor(private addressService: AddressService) {}

    changeSelected(a) {
        this.onSelected.emit({id: a?.id, selected: !a.selected})
    }

    selectAddressToUpdate() {
        this.addressService.sendAddressToModal(this.address);
    }

}