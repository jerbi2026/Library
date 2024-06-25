import { PasswordsService } from './../passwords.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-bloque',
  templateUrl: './page-bloque.component.html',
  styleUrls: ['./page-bloque.component.css']
})
export class PageBloqueComponent implements OnInit{
  constructor(private PasswordsService : PasswordsService){}
  ngOnInit(): void {
    this.PasswordsService.close_loader();
  }
  

}
