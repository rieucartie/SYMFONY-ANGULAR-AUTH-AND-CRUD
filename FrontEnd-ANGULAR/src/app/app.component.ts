import { Component, OnInit } from "@angular/core";
import { UiService } from "./ui/ui.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  // Permet de savoir si on doit afficher ou non une barre de chargement
  isLoading = false;

  constructor(private ui: UiService) {}
  ngOnInit() {
    this.ui.loadingState.subscribe(state => {
      this.isLoading = state;
    });
  }
}
