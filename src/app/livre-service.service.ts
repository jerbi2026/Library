import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { livre } from 'src/livre';
import { proposition } from 'src/proposition';
import { quote } from 'src/quotes';

@Injectable({
  providedIn: 'root'
})
export class LivreServiceService {

  constructor(private http: HttpClient) {} 

  get_livres():Observable<livre[]>{
    return this.http.get<livre[]>("http://localhost:4000/get_livres");
  }
  get_livres_titre(titre:string):Observable<livre[]>{
    return this.http.post<livre[]>("http://localhost:4000/find_livre_1",titre);
  }

  get_genres():Observable<string[]>{
    return this.http.get<string[]>("http://localhost:4000/get_genres");
  }

  get_livre_id(id:number):Observable<livre>{
    return this.http.post<livre>("http://localhost:4000/find_livre_id",id);
  }

  get_quote_id(id:number):Observable<quote>{
    return this.http.post<quote>("http://localhost:4000/find_quote_id",id);
  }

  get_quotes_livre_id(id:number):Observable<quote[]>{
    return this.http.post<quote[]>("http://localhost:4000/find_quote_livre_id",id);
  }

  get_livre_id_auteur(id:number):Observable<livre[]>{
    return this.http.post<livre[]>("http://localhost:4000/find_livre_id_auteur",id);
  }

  get_quotes_auteur_id(id:number):Observable<quote[]>{
    return this.http.post<quote[]>("http://localhost:4000/find_quote_auteur_id",id);
  }

  get_livre_by_genre(genre:string):Observable<livre[]>{
    return this.http.post<livre[]>("http://localhost:4000/find_livre_by_genre",genre);
  }





  add_proposition(prop:proposition):Observable<void>{
    return this.http.post<void>("http://localhost:4000/add_proposition",prop);

  }


  get_nb_genres():Observable<number>{
    return this.http.get<number>("http://localhost:4000/get_nb_genres");

  }

  
  get_nb_livres():Observable<number>{
    return this.http.get<number>("http://localhost:4000/get_nb_livres");

  }

  update_livre(livre:livre):Observable<void>{
    return this.http.post<void>("http://localhost:4000/update_livre",livre);
  }

  delete(livre:livre):Observable<void>{
    return this.http.post<void>("http://localhost:4000/delete_livre",livre);
  }

  add_livre(livre:livre):Observable<void>{
    return this.http.post<void>("http://localhost:4000/add_livre",livre);
  }

  private baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  rechercherLivre(titre: string): Observable<any> {
    const url = `${this.baseUrl}?q=${encodeURIComponent(titre)}`;
    return this.http.get(url);
  }


  
  get_all_prop():Observable<proposition[]>{
    return this.http.get<proposition[]>("http://localhost:4000/get_proposition");
  }

   
  get_prop_by_titre(titre:string):Observable<proposition[]>{
    return this.http.post<proposition[]>("http://localhost:4000/find_prop_by_titre",titre);
  }

  get_prop_by_id(id:number):Observable<proposition>{
    return this.http.post<proposition>("http://localhost:4000/find_prop_by_id",id);
  }

  delete_prop_by_id(id:number):Observable<proposition>{
    return this.http.post<proposition>("http://localhost:4000/delete_prop_by_id",id);
  }

  getLivresByGenres(): Observable<any> {
    return this.http.get<any>('http://localhost:4000/livres/genres');
  }

  getnbLivresByauteurs(): Observable<any> {
    return this.http.get<any>('http://localhost:4000/livres/nb_auteurs');
  }


  getnbpropsitions_per_abonne(): Observable<any> {
    return this.http.get<any>('http://localhost:4000/nb_propostions/abonne');
  }

  getNombreLivresParGenre(): Observable<any> {
    return this.http.get('http://localhost:4000/nombre-par-genre');
  }

  get_best_sellers(){
    return this.http.get('https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=1GosiDs8NY2GUqzf1r34lUT09ihQI3aX');
  }


  get_all_quotes():Observable<quote[]>{
    return this.http.get<quote[]>("http://localhost:4000/get_quotes");
  }

  get_titres_livres():Observable<string[]>{
    return this.http.get<string[]>("http://localhost:4000/get_livres_titres");
  }

  add_quote(quote:quote):Observable<void>{
    return this.http.post<void>("http://localhost:4000/add_quote",quote);
  }

  delete_quote(quote:quote):Observable<void>{
    return this.http.post<void>("http://localhost:4000/delete_quote",quote);
  }

  



  




  







}


