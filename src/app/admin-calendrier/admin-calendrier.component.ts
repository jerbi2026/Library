import { LivreServiceService } from './../livre-service.service';
import { PasswordsService } from './../passwords.service';
import { livre } from './../../livre';
import { ReservationService } from './../reservation.service';
import { Component, OnInit } from '@angular/core';
import { reservation } from 'src/reservation';
import {  FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';

import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { Calendar } from '@fullcalendar/core';
import { User } from 'src/User';
import { abonne_connected } from '../abonne_connected';

@Component({
  selector: 'app-admin-calendrier',
  templateUrl: './admin-calendrier.component.html',
  styleUrls: ['./admin-calendrier.component.css']
})
export class AdminCalendrierComponent {
  reservations: reservation[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,bootstrap5Plugin, interactionPlugin],
    themeSystem: 'bootstrap5',
  };
  livre:livre={
    id_livre: 0,
    titre: '',
    id_auteur: 0,
    genre: '',
    nb_copie: 0,
    image: '',
    description: '',
    prix: 0
  }

  abonne:abonne_connected={
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    numero: 0,
    image: '',
    id_abonné: 0
  }
  reservation:reservation={
    id_res: 0,
    id_livre: 0,
    id_abonné: 0,
    date_res: new Date(),
    date_retour: new Date(),
    code: '',
    statut: false
  }

 
  
  constructor(private ReservationService: ReservationService,private PasswordsService:PasswordsService,private LivreServiceService:LivreServiceService) {}
  
  ngOnInit(): void {
    const today = new Date();
    this.PasswordsService.open_loader();
    this.ReservationService.get_all_reservation().subscribe((data) => {
      this.reservations = data;

      this.calendarOptions = {
        plugins: [dayGridPlugin,bootstrap5Plugin, interactionPlugin],
        themeSystem: 'bootstrap5',
        
        selectable: true,
        editable: true,
        
        eventDisplay: 'block',
        height: 650,
        initialView: 'dayGridMonth',
        events: this.reservations.map((reservation) => ({
          title: 'Reservation '+reservation.id_res,
          start: reservation.date_res,
          end: reservation.date_retour,
          color: reservation.statut ? '#28a745' : '#dc3545'
        })),
        eventClick: (info) => {
          const event = info.event;
          const code = parseInt(event.title.split(' ')[1]);
          this.get_reservation_by_id(code);
          this.get_abonne_by_id(this.reservation.id_abonné);
          this.get_livre_by_id(this.reservation.id_livre);
          this.open_dialog_res();

         

      
         
        }
      
     
      };
      this.PasswordsService.close_loader();
    });
  }

  close_dialog_res(){
    let dialog = document.getElementById('dialog_res');
    if(dialog){
      dialog.style.display = 'none';
    }
  }
  open_dialog_res(){
    let dialog = document.getElementById('dialog_res');
    if(dialog){
      dialog.style.display = 'block';
    }
  }

  get_reservation_by_id(code:number){
    this.ReservationService.get_reservation_by_id(code).subscribe(
      (data)=>{
        this.reservation=data;
      }
    )

  }


  get_abonne_by_id(id_abonné:number){
    this.PasswordsService.get_abonne_by_id(id_abonné).subscribe(
      (data)=>{
        this.abonne=data;
      }
    )

  }

  get_livre_by_id(id : number){
    this.LivreServiceService.get_livre_id(id).subscribe(
      (data)=>{
        this.livre=data;
      }
    )
  }

 
}