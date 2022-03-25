import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UiService } from 'src/app/ui/ui.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="alert alert-warning">
      <h2>Se connecter</h2>
      <p>
        Authentifiez vous à l'aide de notre formulaire et accedez à vos articles préférées.
      </p>
    </div>

    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <input
          type="email"
          formControlName="email"
          class="form-control"
          [class.is-invalid]="
            form.get('email').invalid && form.get('email').touched
          "
          placeholder="Adresse email"
        />
        <div class="invalid-feedback" *ngIf="form.get('email').invalid">
          <span *ngIf="form.get('email').hasError('required')">
            Votre adresse email est obligatoire
          </span>
          <span *ngIf="form.get('email').hasError('email')">
            Le format de l'adresse fournie n'est pas valide
          </span>
        </div>
      </div>
      <div class="form-group">
        <input
          type="password"
          formControlName="password"
          class="form-control"
          [class.is-invalid]="
            form.get('password').invalid && form.get('password').touched
          "
          placeholder="Mot de passe"
        />
        <div class="invalid-feedback" *ngIf="form.get('password').invalid">
          Le mot de passe est obligatoire
        </div>
      </div>

      <div class="alert alert-danger" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <button type="submit" class="btn btn-danger">Connexion !</button>
      <a routerLink="/register" class="btn btn-link">
        Ou créez un nouveau compte
      </a>
    </form>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit() {}

  handleSubmit() {
    if (this.form.invalid) { return; }

    // Active l'écran de chargement
    this.ui.activateLoading();

    this.auth.authenticate(this.form.value).subscribe(
      resultat => {
        // Désactive l'écran de chargement
        this.ui.deactivateLoading();
        this.errorMessage = '';
        this.router.navigateByUrl('/articles');
      },
      error => {
        // Désactive l'écran de chargement
        this.ui.deactivateLoading();

        if (error.status === 401) {
          this.errorMessage =
            'Nous n\'avons pas trouvé de compte utilisateur qui corresponde avec cet email et ce mot de passe';

          return;
        }

        this.errorMessage =
          'Un problème est survenu, veuillez ré-essayer plus tard';
      }
    );
  }
}
