import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
    submitted: boolean;
    
    @ViewChild('closeBtn') closeBtn: ElementRef;

    constructor(private fb: FormBuilder, private addressService: AddressService) {
        this.addressForm = this.fb.group({
            id: [null],
            nickname: ['', [Validators.required]],
            fullName: ['', [Validators.required]],
            address1: ['', [Validators.required]],
            address2: [''],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            zip: ['', [Validators.required]],
            selected: [false]
        });
    }

    ngOnInit(): void {
        this.submitted = false;
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
        this.submitted = true;
        if(this.hasErrors() ){
            return;
        }

        this.closeBtn.nativeElement.click();
        this.addressService.saveAddressForm(this.addressForm.value);
    }

    hasErrors(): boolean {
        return !!(
            this.addressForm.get('nickname')?.errors || this.addressForm.get('fullName')?.errors || this.addressForm.get('address1')?.errors ||
            this.addressForm.get('city')?.errors || this.addressForm.get('state')?.errors || this.addressForm.get('zip')?.errors
        );
    }

    deleteAddress() {
        this.addressService.saveAddressForm(this.addressForm.value, true);
    }
}