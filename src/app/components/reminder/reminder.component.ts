import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reminder} from "./reminder.model";

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  public reminderForm: FormGroup;
  // tslint:disable-next-line:variable-name
  constructor(private readonly _fb: FormBuilder) { }

  ngOnInit() {
    this.reminderForm = this._fb.group({
        code: [''],
        city: ['', Validators.required],
        isAllDay: [false, Validators.required],
        dateStart: ['', Validators.required],
        dateEnd: ['', Validators.required],
        description: ['', [Validators.required, Validators.max(30)]],
        color: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const reminder = new Reminder({ ...this.reminderForm.value})
    console.log(reminder);
  }

}
