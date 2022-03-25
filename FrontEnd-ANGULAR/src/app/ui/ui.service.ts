import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  Router,
  ResolveStart,
  ResolveEnd,
  NavigationCancel
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingState = new Subject<boolean>()
  constructor(private router: Router) {
    this.initializeRouterEvents();
  }
  public activateLoading() {
    this.loadingState.next(true);
  }
  public deactivateLoading() {
    this.loadingState.next(false);
  }
  private initializeRouterEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof ResolveStart) {
        this.loadingState.next(true);
      } else if (
        event instanceof ResolveEnd ||
        event instanceof NavigationCancel
      ) {
        this.loadingState.next(false);
      }
    });
  }
}
