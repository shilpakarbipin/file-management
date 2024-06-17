import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonService } from '../../services/common..service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  commonService = inject(CommonService);
  @Input() currentPath: string = 'dashboard-folder';

  ngOnInit(): void {
    this.commonService.currentPath.emit(this.currentPath);
  }
}
