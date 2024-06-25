import { PasswordsService } from './../passwords.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LivreServiceService } from './../livre-service.service';
import { Component, OnInit } from '@angular/core';
import { abonne_connected } from '../abonne_connected';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private LivreServiceService : LivreServiceService, private route:ActivatedRoute, private router:Router,private PasswordsService:PasswordsService){}
  genres:string[]=[];
  connected_user:abonne_connected={
    id_abonné: 0,
    nom: '',
    prenom: '',
    adresse: '',
    numero: 0,
    adresse_mail: '',
    image: ''
  }
  ngOnInit(): void {
    let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
  if(verify_user === 'true'){
    this.route.params.subscribe(params => {
      const encodedid = params['id'];
      const hashedid = decodeURIComponent(encodedid);
      this.connected_user.adresse_mail = this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key);
      this.PasswordsService.get_abonne_connected(this.connected_user.adresse_mail).subscribe((data)=>{
        if(data){
          this.connected_user = data;
          this.LivreServiceService.get_genres().subscribe(
            (data)=>{
              this.genres=data;
            }
          )
        }
      }
      );});
    
   

  }
  else{

    this.router.navigate(['/login']);
  }
  
    
  }

  open_favourites(){
   let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/favourites/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  open_main(){
   let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['interface_user/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  open_prop(){
   let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['proposition/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/login']);
    }
  }

 
  open_genre(genre:string){
    let hashed_id = this.PasswordsService.encryptString(genre.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_user.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);
    this.router.navigate(['/genre/'+encoded_id+'/'+encoded_mail]);

  }
  open_reservations(){
    this.route.params.subscribe(params => {
      const encodedid = params['id'];
    
      this.router.navigate(['/reservations/'+encodedid]);
      
    });
  }

  open_settings(){
   let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['settings/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  

}
