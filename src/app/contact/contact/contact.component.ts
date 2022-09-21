import { Component, OnInit } from '@angular/core';
import { ContactFormService } from './services/contact-form.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    public formService: ContactFormService
  ) { }

  ngOnInit(): void {
    this.formService.initializeForm();
  }

  send(): void{
    this.formService.submit();
  }
}
