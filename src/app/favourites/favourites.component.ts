import { Component, OnInit } from '@angular/core';
import { livre } from 'src/livre';
import { PasswordsService } from '../passwords.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreServiceService } from '../livre-service.service';
import { abonne_connected } from '../abonne_connected';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  titre='';
  livres:livre[] = [];
  connected_user:abonne_connected={
    id_abonné: 0,
    nom: '',
    prenom: '',
    adresse: '',
    numero: 0,
    adresse_mail: '',
    image: ''
  }
  title='';
  message='';
  constructor(private PasswordsService : PasswordsService, private route: ActivatedRoute, private router : Router) {}
  ngOnInit(): void {
    
  
    
    let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
  if(verify_user === 'true'){
    this.route.params.subscribe(params => {
      const encodedid = params['id'];
      const hashedid = decodeURIComponent(encodedid);
      this.connected_user.adresse_mail = this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key);
      this.PasswordsService.open_loader();
      this.PasswordsService.get_abonne_connected(this.connected_user.adresse_mail).subscribe((data)=>{
        if(data){
          this.connected_user = data;
          const userId = this.connected_user.adresse_mail;
  
  
          let favorites: { [userId: string]: livre[] } = JSON.parse(localStorage.getItem('favorites') || '{}');
          this.livres = Object.values(favorites[userId] || {});
          
        }
        this.PasswordsService.close_loader();
      }
      );});
      this.PasswordsService.close_loader();
    
   

  }
  else{
    
    this.router.navigate(['/login']);
    this.PasswordsService.close_loader();
  }
  


  
    
    
  }






  open_livre(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_user.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);


    this.router.navigate(['/livre/'+encoded_id+'/'+encoded_mail]);

  }

  find_livre(){
    if(this.titre!=''){
      this.livres = this.livres.filter(favorite =>
        favorite.titre.toLowerCase().includes(this.titre)
        
      );      
    }
    else {
      
      this.livres= JSON.parse(localStorage.getItem('favorites') || '[]');
    }

  }
  AddToFavorites(livre:livre) {
    const userId = this.connected_user.adresse_mail;
    let favorites: { [userId: string]: livre[] } = JSON.parse(localStorage.getItem('favorites') || '{}');
  
    if (!favorites[userId]) {
      favorites[userId] = []; 
    }
  
    const existingIndex = favorites[userId].findIndex(favorite => favorite.id_livre === livre.id_livre);
    let dialog = document.getElementById("dialog");
    if (existingIndex === -1) {
      favorites[userId].push(livre);
  
      localStorage.setItem('favorites', JSON.stringify(favorites));
  
      if (dialog) {
        this.title = 'Succès✅🫰';
        this.message = 'Livre ajouté aux Favoris avec succès';
        dialog.style.display = "block";
      }
    } else {
      favorites[userId].splice(existingIndex, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
  
      if (dialog) {
        this.title = 'Operation done✅🫰';
        this.message = 'Le livre est supprimé des favoris !';
        dialog.style.display = "block";
      }
    }
    this.ngOnInit();
}
}
