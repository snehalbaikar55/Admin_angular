import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'horizon';

  constructor(
    private Token: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.Token.loggedIn())
    {
      this.router.navigate(['/login']);
    }
  }
}
