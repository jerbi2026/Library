import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { auteur } from 'src/auteur';
import { find_auteur } from 'src/find_auteur';
import { quote } from 'src/quotes';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  constructor(private http: HttpClient) {}

  get_auteurs():Observable<auteur[]>{
    return this.http.get<auteur[]>("http://localhost:4000/get_auteurs");
  }

  get_auteur_name(find_req:find_auteur):Observable<auteur[]>{
    return this.http.post<auteur[]>("http://localhost:4000/find_auteur_name",find_req);
  }
  get_auteur_nationalite(nationalite:string):Observable<auteur[]>{
    return this.http.post<auteur[]>("http://localhost:4000/find_auteur_nationalite",nationalite);
  }
  get_auteur_id(id:number):Observable<auteur>{
    return this.http.post<auteur>("http://localhost:4000/find_auteur_id",id);
  }

  get_quotes():Observable<quote[]>{
    return this.http.get<quote[]>("http://localhost:4000/get_quotes");

  }

  get_liste_auteurs_nom_prenom():Observable<string[]>{
    return this.http.get<string[]>("http://localhost:4000/get_liste_auteurs_add");
  }


  retourner_id_auteur(name:string):Observable<number>{
    return this.http.post<number>("http://localhost:4000/get_id_auteur_by_name",name);
  }

  get_nb_auteurs():Observable<number>{
    return this.http.get<number>("http://localhost:4000/get_nb_auteurs");
  }


  update_auteur(auteur:auteur):Observable<void>{
    return this.http.post<void>("http://localhost:4000/update_auteur",auteur);
  }

  delete_auteur(auteur:auteur):Observable<void>{
    return this.http.post<void>("http://localhost:4000/delete_auteur",auteur);
  }


  addd_auteur(auteur:auteur):Observable<void>{
    return this.http.post<void>("http://localhost:4000/add_auteur",auteur);
  }




}
