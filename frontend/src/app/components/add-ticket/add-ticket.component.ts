import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  ticket = {
    title: '',
    description: '',
    finished: false,
  };
  submitted: boolean = false;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
  }

  saveTicket() {
    const data = {
      title: this.ticket.title,
      description: this.ticket.description
    };

    this.ticketService.create(data)
      .subscribe(res => {
        console.log(res);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
  }

  newTicket() {
    this.submitted = false;
    this.ticket = {
      title: '',
      description: '',
      finished: false
    };
  }
}