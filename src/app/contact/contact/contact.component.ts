import { Component, OnInit } from '@angular/core';
import { ContactFormService } from './services/contact-form.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [MessageService]
})
export class ContactComponent implements OnInit {

  constructor(
    public formService: ContactFormService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.formService.initializeForm();
  }

  send(): void{
    this.formService.submit();
  }
}
