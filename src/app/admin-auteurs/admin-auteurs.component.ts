import { ActivatedRoute, Router } from '@angular/router';
import { PasswordsService } from './../passwords.service';
import { AuteurService } from './../auteur.service';
import { auteur } from './../../auteur';
import { Component, OnInit } from '@angular/core';
import { find_auteur } from 'src/find_auteur';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';

@Component({
  selector: 'app-admin-auteurs',
  templateUrl: './admin-auteurs.component.html',
  styleUrls: ['./admin-auteurs.component.css']
})
export class AdminAuteursComponent implements OnInit{
  nb_auteurs=0;
  p=1;
  name_auteur='';
  auteurs:auteur[]=[];

  connected_manager:Front_Manager={
    id_manager: 0,
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    image: '',
    numero: ''
  }
  constructor(private AuteurService:AuteurService,private PasswordsService:PasswordsService,private router:Router,private route:ActivatedRoute){}
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
            this.get_auteurs();
            this.get_nb_auteurs()
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

  get_auteurs(){
    this.AuteurService.get_auteurs().subscribe(
      (data)=>{
        this.auteurs=data;
      }
    )
  }

  get_nb_auteurs(){
    this.AuteurService.get_nb_auteurs().subscribe(
      (data)=>{
        this.nb_auteurs=data;
      }
    )
  }
  find_auteur_name(){
    if(this.name_auteur != ''){
      
      var nameParts = this.name_auteur.split(" ");
      var find_req: find_auteur = {
        nom: nameParts[0],
        prenom: nameParts.slice(1).join(" ")
    };
      this.AuteurService.get_auteur_name(find_req).subscribe(
        (data:auteur[])=>{
        this.auteurs = data;
      });
    }
    else{
      this.get_auteurs();
    }
   
  }

  open_auteur(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_manager.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);


    this.router.navigate(['/admin_auteur/'+encoded_id+'/'+encoded_mail]);

  }

  add_auteur(){
    let hashed_mail = this.PasswordsService.encryptString(this.connected_manager.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);
    this.router.navigate(['/ajouter_auteur/'+encoded_mail]);

  }





}
