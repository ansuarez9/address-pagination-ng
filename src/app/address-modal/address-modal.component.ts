import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AddressService } from "../services/address.service";

@Component({
    selector: 'address-modal',
    templateUrl: 'address-modal.component.html',
    styleUrls: ['address-modal.component.scss']
})
export class AddressModalComponent implements OnInit, OnDestroy {
    destroySubscriptions$ = new Subject();
    addressForm: FormGroup;
    updateMode: boolean;

    constructor(private fb: FormBuilder, private addressService: AddressService) {
        
    }

    ngOnInit(): void {
        this.addressForm = this.fb.group({
            id: [null],
            nickname: ['', [Validators.required]],
            fullName: ['', [Validators.required]],
            address1: ['', [Validators.required]],
            address2: [''],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            zip: ['', [Validators.required]],
            selected: [false, [Validators.required]]
        });

        this.addressService.addressToModal$
            .pipe(
                takeUntil(this.destroySubscriptions$)
            )
            .subscribe(address => {
                this.updateMode = !!address.id;
                this.addressForm.patchValue(address);
            });
    }

    ngOnDestroy(): void {
        this.destroySubscriptions$.next();
        this.destroySubscriptions$.complete();
    }

    saveForm() {
        console.log(this.addressForm.value);
        this.addressService.saveAddressForm(this.addressForm.value);
    }
}