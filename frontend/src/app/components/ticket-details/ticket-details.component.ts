import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import  {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  currentTicket = null;
  message = '';

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTicket(this.route.snapshot.paramMap.get('id'));
  }

  getTicket(id) {
    this.ticketService.get(id)
      .subscribe(data => {
        this.currentTicket = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  updatedFinished(status) {
    const data = {
      title: this.currentTicket.title,
      description: this.currentTicket.description,
      finished: status
    };

    this.ticketService.update(this.currentTicket.id, data)
      .subscribe(res => {
        this.currentTicket.finished = status;
        console.log(res);
      },
      error => {
        console.log(error);
      });
  }

  updateTicket() {
    this.ticketService.update(this.currentTicket.id, this.currentTicket)
      .subscribe(res => {
        console.log(res);
        this.message = 'The ticket was sucessfully updated!'
      },
      error => {
        console.log(error);
      });
  }

  deleteTicket() {
    this.ticketService.delete(this.currentTicket.id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/tickets']);
      },
      error => {
        console.log(error);
      });
  }
}
