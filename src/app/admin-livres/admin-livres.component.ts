import { PasswordsService } from './../passwords.service';
import { livre } from './../../livre';
import { LivreServiceService } from './../livre-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { abonne_connected } from '../abonne_connected';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';
@Component({
  selector: 'app-admin-livres',
  templateUrl: './admin-livres.component.html',
  styleUrls: ['./admin-livres.component.css']
})
export class AdminLivresComponent implements OnInit{
  p=1;
  nb_livres=0;
  nb_genres=0;
  titre='';
  livres:livre[]=[];
  connected_manager:Front_Manager={
    id_manager: 0,
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    image: '',
    numero: ''
  }
  constructor(private LivreServiceService : LivreServiceService,private PasswordsService:PasswordsService,private router:Router ,private route : ActivatedRoute){}
  ngOnInit(): void {
   let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
   
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
        const hashedid = decodeURIComponent(encodedid);
        this.connected_manager.adresse_mail = this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key);
        this.PasswordsService.open_loader();
        this.PasswordsService.get_front_manager(this.connected_manager.adresse_mail).subscribe((data)=>{
          if(data){
            this.connected_manager = data;
            this.get_nb_genres();
            this.get_nb_livres();
            this.get_livres();
            this.PasswordsService.close_loader();
          }
        }
        );});
        this.PasswordsService.close_loader();
      
     
  
    }
    else{
  
      this.router.navigate(['/page-bloquee']);
      this.PasswordsService.close_loader();
    }


   
  }
  
  get_nb_genres(){
    this.LivreServiceService.get_nb_genres().subscribe(
      (data)=>{
        this.nb_genres=data;
      }
    )
  }
  get_nb_livres(){
    this.LivreServiceService.get_nb_livres().subscribe(
      (data)=>{
        this.nb_livres=data;
      }
    )
  }

  get_livres(){
    this.LivreServiceService.get_livres().subscribe(
      (data)=>{
        this.livres=data;
      }
    )
  }
  find_livre(){
    if(this.titre != ''){
      this.LivreServiceService.get_livres_titre(this.titre).subscribe(
        (data:livre[])=>{
        this.livres = data;
      });
    }
    else{
      this.get_livres();
    }
   
    
  

  }
  open_livre(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_manager.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);


    this.router.navigate(['/book_details/'+encoded_id+'/'+encoded_mail]);

  }

  ajouter_livre(){
    let hashed_mail = this.PasswordsService.encryptString(this.connected_manager.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);
    this.router.navigate(['/ajouter_livre/'+encoded_mail]);

    
  }

}
