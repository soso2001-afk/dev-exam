import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.compenent';
import { RequestLeaveComponent } from './leave/request-leave.component';
import { LeaveSummaryComponent } from './leave/leave-summary.componenet';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'request-leave', component: RequestLeaveComponent, canActivate: [AuthGuard] },
  { path: 'leave-summary', component: LeaveSummaryComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}