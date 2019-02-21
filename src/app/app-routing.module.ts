import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MastermindComponent } from './mastermind/components/mastermind/mastermind.component';
import { MastermindDeluxeComponent } from './mastermind/components/mastermind-deluxe/mastermind-deluxe.component';

const routes: Routes = [
  { path: '', component: MastermindDeluxeComponent, pathMatch: 'full' },
  { path: 'classic', component: MastermindComponent, pathMatch: 'full' },
  { path: 'deluxe', component: MastermindDeluxeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
