import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddressBookComponent } from './address-book/address-book.component';
import { AddressCardComponent } from './address-book/address-card/address-card.component';
import { AddressModalComponent } from './address-modal/address-modal.component';

import { AppComponent } from './app.component';
import { AddressService } from './services/address.service';

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    AddressCardComponent,
    AddressModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [AddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
