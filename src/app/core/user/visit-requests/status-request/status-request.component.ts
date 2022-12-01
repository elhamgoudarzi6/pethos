import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-request',
  templateUrl: './status-request.component.html',
  styleUrls: ['./status-request.component.scss']
})
export class StatusRequestComponent implements OnInit {
  allStatus: any[] = [];
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.allStatus = this.config.data.status;
  }

}
