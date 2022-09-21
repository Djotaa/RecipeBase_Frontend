import { Component, OnInit } from '@angular/core';
import { links } from 'src/app/constants/links';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  links: any = links.footer;

  constructor() { }

  ngOnInit(): void {
  }

}
