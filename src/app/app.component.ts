import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('grid') grid: ElementRef;

  users = {};
  langauges = ["Dutch", "English", "French"];
  selectedPage = 0;
  dialogOpen = false;
  formSubmittedOpen = false;
  formInvalidOpen = false;
  fnField: string = "";
  lnField: string = "";

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
      let grid: any = this.grid.nativeElement;
      grid.items.unshift({
        firstName: this.fnField,
        lastName: this.lnField
      });
      this.fnField = '';
      this.lnField = '';
      grid.selectedItems = [];
      grid.clearCache();
      grid.selectItem(grid.items[0])
      this.selectedPage=0; // Go back
    } else {
      this.formInvalidOpen = true;
    }
  }
}
