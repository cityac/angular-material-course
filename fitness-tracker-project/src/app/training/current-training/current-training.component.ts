import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTraningComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;
  currentExcercise: Excercise;
  @Output() trainingExit = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.currentExcercise = this.trainingService.getRunningExcercise();
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    const step = (this.currentExcercise.duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.trainingService.completeExcercise();
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTraningComponent, {
      width: '300px',
      data: { progress: this.progress },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExcercise(this.progress);
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
