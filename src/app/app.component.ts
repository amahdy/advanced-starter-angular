import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users = {};
  langauges = ["Dutch", "English", "French"];
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

  selectedPageChange(page) {
    this.selectedPage ^= 1;
  }

  toggleDialog() {
    this.dialogOpen = !this.dialogOpen;
  }

  submitForm(event) {
    let form: any = document.getElementById("form");
    if (form.validate()) {
      this.formSubmittedOpen = true;
      let grid: any = document.getElementById("grid"),
          fn: any = document.getElementById('fnField'),
          ln: any = document.getElementById('lnField');
      grid.items.unshift({
        firstName:fn.value,
        lastName:ln.value
      });
      fn.value = '';
      ln.value = '';
      grid.selectedItems = [];
      grid.clearCache();
      grid.selectItem(grid.items[0])
      this.selectedPage=0; // Go back
    } else {
      this.formInvalidOpen = true;
    }
  }
}
