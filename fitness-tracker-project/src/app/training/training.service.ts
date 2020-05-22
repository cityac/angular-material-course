import { Excercise } from './excercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
  excerciseChanged = new Subject<Excercise>();

  private availableExcercises: Excercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private pastExcercises: Excercise[] = [];

  private runningExcercise: Excercise;

  getAvailableExcercises(): Excercise[] {
    return this.availableExcercises;
  }

  startExcercise(selectedId: string) {
    this.runningExcercise = this.availableExcercises.find(
      (ex) => ex.id === selectedId
    );
    this.excerciseChanged.next({ ...this.runningExcercise });
  }

  cancelExcercise(progress: number) {
    this.pastExcercises.push({
      ...this.runningExcercise,
      duration: this.runningExcercise.duration * (progress / 100),
      calories: this.runningExcercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExcercise = null;
    this.excerciseChanged.next(null);
  }

  completeExcercise() {
    this.pastExcercises.push({
      ...this.runningExcercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExcercise = null;
    this.excerciseChanged.next(null);
  }

  getRunningExcercise() {
    return { ...this.runningExcercise };
  }

  getPastExcercises() {
    return [...this.pastExcercises];
  }
}
