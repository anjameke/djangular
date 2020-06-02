import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  tickets: any;
  currentTicket = null;
  currentIndex = -1;
  title = '';

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.retrieveTickets();
  }

  retrieveTickets() {
    this.ticketService.getAll()
      .subscribe( data => {
        this.tickets = data;
        console.log(data);
      },
      error => {
        console.log(error)
      });
  }

  refreshList() {
    this.retrieveTickets();
    this.currentTicket = null;
    this.currentIndex = -1;
  }

  setActiveTicket(ticket, index) {
    this.currentTicket = ticket;
    this.currentIndex = index;
  }

  removeAllTickets() {
    this.ticketService.deleteAll()
      .subscribe(res => {
        console.log(res);
        this.retrieveTickets();
      },
      error => {
        console.log(error);
      });
  }

  searchTitle() {
    this.ticketService.findByTitle(this.title)
      .subscribe(data => {
        this.tickets = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
}