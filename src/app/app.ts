import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Register} from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { Header } from './shared/header/header';

@Component({
selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('wolf-tasks-client');
}
