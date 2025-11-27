import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';
import { Lesson } from './types';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, LessonFormComponent],
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent {
  storageKey = 'scheduleapp.lessons';
  lessons: Lesson[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  showForm = false;
  editing: Lesson | null = null;

  toggleForm() {
    this.editing = null;
    this.showForm = !this.showForm;
  }

  addOrUpdate(lesson: Lesson) {
    if (lesson.id) {
      const idx = this.lessons.findIndex(l => l.id === lesson.id);
      if (idx >= 0) this.lessons[idx] = lesson;
    } else {
      lesson.id = Date.now().toString();
      this.lessons.push(lesson);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.lessons));
    this.showForm = false;
  }

  edit(lesson: Lesson) {
    this.editing = { ...lesson };
    this.showForm = true;
  }

  remove(id?: string) {
    if (!id) return;
    if (!confirm('Удалить занятие?')) return;
    this.lessons = this.lessons.filter(l => l.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(this.lessons));
  }
}
