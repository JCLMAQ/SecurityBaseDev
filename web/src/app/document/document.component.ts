import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../primeng/breadcrump/breadcrumb.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  constructor( private breadcrumbService: BreadcrumbService,) {

    this.breadcrumbService.setItems([
      { label: 'Document', routerLink: ['/document'] }
  ]);
   }

  ngOnInit() {
  }

}
