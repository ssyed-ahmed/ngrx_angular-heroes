import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommunicationService } from './communication.service';
import { loadHeroes } from './store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tour of heroes';

  public selectedTab = 'dashboard';

  constructor(
    private communicationService: CommunicationService,
    private store: Store,
  ) {}

  public ngOnInit(): void {
      this.store.dispatch(loadHeroes());
  }

  setSelectedTab(tab: string): void {
    this.selectedTab = tab;
  }

  restoreHeroes(): void {
    this.communicationService.sendMessage('restore heroes');
  }
}
