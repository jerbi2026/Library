import { reservation } from './../reservation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation_front } from 'src/Reservation_front';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private HttpClient : HttpClient) { }
  

  add_reservation(reservation : reservation){
    return this.HttpClient.post("http://localhost:4000/add_reservation",reservation);

  }

  get_reservations_abonne(id:number):Observable<Reservation_front[]>{
    return this.HttpClient.post<Reservation_front[]>("http://localhost:4000/get_reservation_id_abonne",id);
  }

  get_nb_reservations_abonne(id:number):Observable<number>{
    return this.HttpClient.post<number>("http://localhost:4000/get_nb_reservation_abonne",id);
  }

  delete_reservation_by_code(code:string):Observable<number>{
    return this.HttpClient.post<number>("http://localhost:4000/delete_reservation_code",code);
  }

  get_reservations_abonne_valide(id:number):Observable<Reservation_front[]>{
    return this.HttpClient.post<Reservation_front[]>("http://localhost:4000/get_reservation_id_abonne",id);
  }

  get_nb_reservations_abonne_valide(id:number):Observable<number>{
    return this.HttpClient.post<number>("http://localhost:4000/get_nb_reservation_abonne_valide",id);
  }

  get_nb_reservations_abonne_non_valide(id:number):Observable<number>{
    return this.HttpClient.post<number>("http://localhost:4000/get_nb_reservation_abonne_non_valide",id);
  }

  get_all_reservation():Observable<reservation[]>{
    return this.HttpClient.get<reservation[]>("http://localhost:4000/get_all_reservation");
  }

  get_reservation_date_limite():Observable<reservation[]>{
    return this.HttpClient.get<reservation[]>("http://localhost:4000/get_reservation_date_limite");
  }

  
  valider_reservation(id_res:number):Observable<void>{
    return this.HttpClient.post<void>("http://localhost:4000/valider_reservation",id_res);
  }

  get_reservation_by_code(code:string):Observable<reservation[]>{
    return this.HttpClient.post<reservation[]>("http://localhost:4000/get_reservation_by_code",code);
  }

  get_nb_reservation_per_livre(): Observable<any> {
    return this.HttpClient.get<any>('http://localhost:4000/nb_reservations/livre');
  }

  get_nb_reservation_per_genre(): Observable<any> {
    return this.HttpClient.get<any>('http://localhost:4000/nb_reservations/genre');
  }

  get_reservation_by_id(id:number):Observable<reservation>{
    return this.HttpClient.post<reservation>("http://localhost:4000/get_reservation_by_id",id);
  }



  
}
