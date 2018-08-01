// ================== //
// ===== Modules ==== //
// ================== //
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRouting } from './features.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRouting
  ],
  declarations: [DashboardComponent, ProfileComponent]
})

export class FeaturesModule { }
