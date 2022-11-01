import { Component, OnInit } from '@angular/core';
import { ContactApiService } from 'src/app/contact/contact/services/contact-api.service';
import { SpinnerFunctions } from 'src/app/shared/classes/spinner-functions';
import { MessageService, ConfirmationService } from 'primeng/api'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class MessagesComponent implements OnInit {

  hasMessages: boolean = false;
  messages: any;
  isReady: boolean = false;

  constructor(
    private contactService: ContactApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): any {
    SpinnerFunctions.showSpinner();

    this.contactService.getAll().subscribe({
      next: data => {
        this.messages = data;
        this.hasMessages = !!this.messages.length;
        this.isReady = true;
        SpinnerFunctions.hideSpinner();
      },
      error: err => {
        console.log(err);
        SpinnerFunctions.hideSpinner();
      }
    })
  }

  deleteMessage(id: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete message?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        SpinnerFunctions.showSpinner();
        this.contactService.delete(id).subscribe({
          next: () => {
            SpinnerFunctions.hideSpinner();
            this.loadMessages();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Message deleted.'
            })
          },
          error: err => {
            SpinnerFunctions.hideSpinner();
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'There has been a problem with deleting the message.'
            })
            console.log(err)
          }
        });
      }
    });
  }

}
