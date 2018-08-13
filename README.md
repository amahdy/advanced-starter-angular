# Vaadin components with Angular

> NOTE: This project will continue on the [Vaadin with Angular Starter App](https://vaadin.com/start/v10-angular). Please download the starter before reading this tutorial.

### Instructions

We will use some extra vaadin components, we can install them using:

```bash
  yarn add @polymer/iron-pages
  yarn add @vaadin/vaadin-core
```

Now we need to include all new dependencies, in `src/app/app.component.ts` add those extra imports:

```ts
  import '@polymer/iron-pages';
  import '@vaadin/vaadin-core';
```

We will also make a slight change in the main app style, in `index.html` as well, update the custom style to be:

```html
  <custom-style>
    <style include="lumo-color lumo-typography">
      html {
        background-color: hsla(214, 57%, 24%, 0.1);
      }
    </style>
  </custom-style>
```

And a component specific style with few `lumo` theme variables, in `src/app/app.component.css` add:

```css
  .card {
    width: 70%;
    margin: var(--lumo-space-m);
    padding: var(--lumo-space-m);
    border-radius: var(--lumo-border-radius);
    background-color: var(--lumo-base-color);
    box-shadow: var(--lumo-box-shadow-s);
  }
```

Let's also create some data types to be used by the application:

Create `src/app/address.ts` as following:

```ts
  export class Address {
    constructor(
      public street: string = '',
      public city: string = '',
      public state: string = '',
      public zip: string = '',
      public country: string = '',
      public phone: string = ''
    ) {}
  }
```

And create `src/app/person.ts` as:

```ts
  import { Address } from './address';

  export class Person {
    constructor(
      public firstName: string = '',
      public lastName: string = '',
      public adress: Address = new Address(),
      public email: string = ''
    ) {}
  }
```

Now inside `src/app/app.component.html` we will construct the html responsible about rendering the app. Delete the file content then add:
A tabbed component to display two tabs:

```html
  <vaadin-tabs
    id="tabs"
    [selected]="selectedPage"
    (selected-changed)="selectedPage=$event.detail.value">
    <vaadin-tab>All Contacts</vaadin-tab>
    <vaadin-tab>Add New</vaadin-tab>
  </vaadin-tabs>
```

A component to render multiple pages for tabs:

```html
  <iron-pages [selected]="selectedPage">

  <div class="card">
  …
  </div>
  <div class="card">
  …
  </div>

  </iron-pages>
```

Here we note that the `selected` page is associated with the same variable as `vaadin-tabs`, so changing `selectedPage` value is enough to change the page.
We have two `div` holding cards, those are going to be the two pages of our component as following:

A grid to hold the data:

```html
  <vaadin-grid #grid [items]="users" [selectedItems]="selectedUsers">

    <vaadin-grid-column width="60px" flex-grow="0">
      <template class="header">#</template>
      <template ngNonBindable>{{index}}</template>
    </vaadin-grid-column>

    <vaadin-grid-column>
      <template class="header" ngNonBindable>
        <vaadin-grid-filter aria-label="First Name" path="firstName" value="{{_filterFirstName}}">
          <vaadin-text-field slot="filter" placeholder="First Name" value="{{_filterFirstName}}" focus-target></vaadin-text-field>
        </vaadin-grid-filter>
      </template>
      <template ngNonBindable>{{item.firstName}}</template>
    </vaadin-grid-column>

    <vaadin-grid-column>
      <template class="header" ngNonBindable>
        <vaadin-grid-filter aria-label="Last Name" path="lastName" value="[[_filterLastName]]">
          <vaadin-text-field slot="filter" placeholder="Last Name" value="{{_filterLastName}}" focus-target></vaadin-text-field>
        </vaadin-grid-filter>
      </template>
      <template ngNonBindable>{{item.lastName}}</template>
    </vaadin-grid-column>

    <vaadin-grid-column width="8em">
      <template class="header">Address</template>
      <template>
        <div style="white-space: normal" ngNonBindable>{{item.address.street}}, {{item.address.city}}</div>
      </template>
    </vaadin-grid-column>

  </vaadin-grid>
```

In some places we used `ngNonBindable` to ignore the template of inner components.

A responsive form for data entry with validation:

```html
  <form #form="ngForm">
    <vaadin-form-layout>

      <vaadin-form-item>
        <label slot="label">First Name</label>
        <vaadin-text-field [(ngModel)]="fnField" name="fnField" ngDefaultControl required error-message="Please enter first name" class="full-width"></vaadin-text-field>
      </vaadin-form-item>

      <vaadin-form-item>
        <label slot="label">Last Name</label>
        <vaadin-text-field [(ngModel)]="lnField" name="lnField" ngDefaultControl required error-message="Please enter last name" class="full-width"></vaadin-text-field>
      </vaadin-form-item>

      <vaadin-form-item>
        <label slot="label">Birth date</label>
        <vaadin-date-picker class="full-width"></vaadin-date-picker>
      </vaadin-form-item>

      <vaadin-form-item>
        <label slot="label">Language</label>
        <vaadin-combo-box class="full-width" [items]="langauges"></vaadin-combo-box>
      </vaadin-form-item>

      <vaadin-form-item colspan="2">
        <label slot="label">Notes</label>
        <vaadin-text-area class="full-width"></vaadin-text-area>
      </vaadin-form-item>

      <vaadin-form-item colspan="2">
        <vaadin-checkbox>I have read the <a href (click)="toggleDialog()">terms and conditions</a></vaadin-checkbox>
      </vaadin-form-item>

      <vaadin-form-item colspan="2">
        <vaadin-button (click)="submitForm(form)">Submit</vaadin-button>
      </vaadin-form-item>

    </vaadin-form-layout>
  </form>
```

We can see some data validation, and interaction with external elements. We use `ngDefaultControl` to be able to use `ngModel` with a custom element.

We also place a notification components to notify the user about the status of the data entry:

```html
  <vaadin-notification [opened]="formSubmittedOpen" duration="4000">
    <template>
      A new contact has been added successfully.
    </template>
  </vaadin-notification>

  <vaadin-notification [opened]="formInvalidOpen" duration="4000">
    <template>
      Some fields are missing or invalid.
    </template>
  </vaadin-notification>
```

And a dialog component to pop up when clicked on the `terms and conditions` link:

```html
  <vaadin-dialog id="dialog" no-close-on-esc no-close-on-outside-click [opened]="dialogOpen">
    <template>
      <vaadin-vertical-layout theme="spacing">
        <div>
          <h1>The content of dialog</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus magna et orci lacinia maximus. Fusce ut tincidunt ex. Morbi sed vehicula metus. Phasellus vel leo a elit viverra congue. Donec finibus iaculis eros vel vestibulum. Cras vehicula neque enim, eget faucibus ligula tempus vel. Integer felis nisi, sollicitudin at lectus at, bibendum vulputate risus. In ut massa et massa scelerisque viverra.</p>
        </div>
        <vaadin-button (click)="toggleDialog()">OK</vaadin-button>
      </vaadin-vertical-layout>
    </template>
  </vaadin-dialog>
```

Final part, in `src/app/app.component.ts` we will update the application logic:

Make the component imlement `OnInit` by first import it:

```ts
  import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
```

Then update the definiton:

```ts
  export class AppComponent implements OnInit {
```

Import the newly created `Person`:

```ts
  import { Person } from './person';
```

First define few variables:

```ts
  @ViewChild('grid') grid: ElementRef;

  users: Person[] = [];
  selectedUsers: Person[] = [];
  newUser: Person = new Person();
  langauges = ["Dutch", "English", "French"];
  selectedPage = 0;
  dialogOpen = false;
  formSubmittedOpen = false;
  formInvalidOpen = false;
```

This section will populate the grid with data once the remote response is received:

```ts
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
```

We will need one more import as well for http:

```ts
  import { HttpClient } from '@angular/common/http';
```

And we need to import `HttpClientModule` in `src/app/app.module.ts` as following:

```ts
  import { HttpClientModule } from '@angular/common/http';
```

And update imports:

```ts
  imports: [
    PolymerModule.forRoot(),
    BrowserModule,
    HttpClientModule
  ],
```

This function toggles the dialog when the link is clicked:

```ts
  toggleDialog() {
    this.dialogOpen = !this.dialogOpen;
  }
```

And this function will process the form submission. First make sure that it’s valid, if so then inserts the new item in the grid, select it, and switch back to the grid view with a success notification. Otherwise error notification is shown and validation errors are hilighted:

```ts
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
```

But to be able to use forms, we need again few imports:

```ts
  import { Component, ViewChild, ElementRef } from '@angular/core';
```

And also some other imports in `src/app/app.module.ts` as follwoing:

```ts
  import { FormsModule }   from '@angular/forms';
```

And

```ts
  imports: [
    PolymerModule.forRoot(),
    BrowserModule,
    HttpClientModule
    HttpClientModule,
    FormsModule
  ],
```
