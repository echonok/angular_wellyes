import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormsModule } from '@angular/forms';
import { CommonService } from './common.service';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  constructor(private newService: CommonService, ) { }
  Repdata;
  valbutton = 'Save';
  id: number;
  name: string;
  address: string;
  appTest = 'тестовый вывод';
  errorMessage: string;

  ngOnInit() {
    this.newService.test();
    this.newService.getUser().subscribe(data => console.log('data', data));
    //this.newService.getUser().subscribe(data => this.Repdata = data);
    console.log('this.Repdata', this.Repdata);
    console.log('servisce started');
  }

  onSave = (user, isValid: boolean) => {
    user.node = this.valbutton;
    this.newService.saveUser(user).subscribe(data => {
      alert(data);
      this.ngOnInit();
    }
    , error => this.errorMessage = error)
  }

  edit = function(kk) {
    this.id = kk._id;
    this.name = kk.name;
    this.address = kk.address;
    this.valbutton = 'Update';
  }

  delete = function(id) {
    this.newService.deleteUser(id).subscribe(data => { alert(data.data) ; this.ngOnInit(); }, error => this.errorMessage = error)
  }
}