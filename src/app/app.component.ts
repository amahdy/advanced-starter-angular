import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-form-layout/vaadin-form-layout.js';
import '@vaadin/vaadin-form-layout/vaadin-form-item.js';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';
import '@vaadin/vaadin-notification/vaadin-notification.js';
import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: Person[] = [];
  selectedUsers: Person[] = [];
  newUser: Person = new Person();

  langauges = ['Dutch', 'English', 'French'];
  selectedPage = 0;
  dialogOpen = false;
  formSubmittedOpen = false;
  formInvalidOpen = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://demo.vaadin.com/demo-data/1.0/people?count=200')
      .subscribe(
        (users: any) => {
          this.users = users.result;
        },
        error => {
          console.log(error);
        }
      );
  }

  toggleDialog() {
    this.dialogOpen = !this.dialogOpen;
  }

  submitForm(form) {
    if (form.valid) {
      this.formSubmittedOpen = true;

      this.users = [this.newUser, ...this.users];
      this.selectedUsers = [this.newUser];
      this.newUser = new Person();
      this.selectedPage = 0; // Go back
    } else {
      this.formInvalidOpen = true;
    }
  }
}
