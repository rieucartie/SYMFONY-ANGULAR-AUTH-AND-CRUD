import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error404',
  template: `
    <div class="alert alert-warning">
      <h2>Problème, la page recherchée n'existe pas !</h2>
      <p>
        echec de la page
      </p>
    </div>
    <h2>
      L'adresse <strong>{{ currentUrl }}</strong> n'existe pas'
    </h2>

    <div *ngIf="proposition">
      Aviez vous pensé à
      <a routerLink="{{ proposition }}">{{ proposition }}</a> ?
    </div>
  `,
  styles: []
})
export class Error404Component implements OnInit {
  currentUrl = window.location.pathname;
  proposition: string;

  constructor() {}

  ngOnInit() {
    if (
      this.currentUrl.includes('cus') ||
      this.currentUrl.includes('omer') ||
      this.currentUrl.includes('ustom')
    ) {
      this.proposition = '/';
    }
  }
}
