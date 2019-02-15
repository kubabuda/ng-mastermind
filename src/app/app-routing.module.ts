import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MastermindComponent } from './mastermind/mastermind/mastermind.component';

const routes: Routes = [
  { path: '', component: MastermindComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
