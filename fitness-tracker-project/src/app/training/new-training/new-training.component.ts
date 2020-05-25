import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";

import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { UIService } from "../../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../app.reducer";
import * as fromTraining from "../training.reducer";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableTrainings);
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
