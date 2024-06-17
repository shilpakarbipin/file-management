import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedFolderComponent } from './components/shared-folder/shared-folder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedFolderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'file-management';
}
