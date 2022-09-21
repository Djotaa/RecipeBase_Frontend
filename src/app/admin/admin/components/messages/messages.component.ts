import { Component, OnInit } from '@angular/core';
import { ContactApiService } from 'src/app/contact/contact/services/contact-api.service';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  hasMessages: boolean = false;
  messages: any;
  isReady: boolean = false;

  constructor(private contactService: ContactApiService) { }

  ngOnInit(): void {
    SpinnerFunctions.showSpinner();

    this.contactService.getAll().subscribe({
      next: data =>{
        this.messages = data;
        this.hasMessages = !!this.messages.length;
        this.isReady = true;
        console.log(data)
        SpinnerFunctions.hideSpinner();
      },
      error: err => {
        console.log(err);
        SpinnerFunctions.hideSpinner();
      }
    })
  }

}
