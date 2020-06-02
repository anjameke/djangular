import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';

const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full'},
  { path: 'tickets', component: TicketListComponent},
  { path: 'tickets/:id', component: TicketDetailsComponent},
  { path: 'add', component: AddTicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
