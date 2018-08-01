import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ================== //
// ===== Modules ==== //
// ================== //
import { AppRoutingModule } from './app-routing.module';


import { FeaturesModule } from './features/features.module';
import { LayoutModule } from './layout/layout.module';

// ================== //
// ===== Component ==== //
// ================== //
import { AppComponent } from './app.component';
import { BaseComponent } from './helper/base.component';
import { LoginComponent } from './components/login/login.component';

// ================== //
// ===== Services ==== //
// ================== //
import { AuthService } from './services/auth.service';

import { RewinderProductionComponent } from './components/rewinder-production/rewinder-production.component';
import { WinderService } from './services/winder.service';

// Material start
import {MatInputModule, } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
// Material ends

import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LoginComponent,
    RewinderProductionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FeaturesModule,
    HttpClientModule,
    LayoutModule,
    HttpModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgxBarcodeModule
  ],
  providers: [AuthService, WinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
