import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTraningComponent } from './stop-training.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;
  @Output() trainingExit = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 200);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTraningComponent, {
      width: '300px',
      data: { progress: this.progress },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
