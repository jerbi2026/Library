import { AuteurService } from './../auteur.service';
import { proposition } from 'src/proposition';
import { PasswordsService } from './../passwords.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LivreServiceService } from './../livre-service.service';
import { Component, OnInit } from '@angular/core';
import { livre } from 'src/livre';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';

@Component({
  selector: 'app-admin-view-proposition',
  templateUrl: './admin-view-proposition.component.html',
  styleUrls: ['./admin-view-proposition.component.css']
})
export class AdminViewPropositionComponent implements OnInit{

  constructor(private LivreServiceService:LivreServiceService,private router:Router,private route:ActivatedRoute,private PasswordsService:PasswordsService,private AuteurService:AuteurService){}
  proposition:proposition={
    id_prop: 0,
    titre: '',
    genre: '',
    auteur: '',
    id_abonné: 0
  }
  liste_auteurs:string[]=[];

  livre:any;
  livre_add:livre={
    id_livre: 0,
    titre: '',
    id_auteur: 0,
    genre: '',
    nb_copie: 0,
    image: '',
    description: '',
    prix: 0
  }

  connected_manager:Front_Manager={
    id_manager: 0,
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    image: '',
    numero: ''
  }
  
  livres:any[]=[];
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
            this.route.params.subscribe(params => {
              const encodedid = params['id_prop'];
              const hashedid = decodeURIComponent(encodedid);
              this.LivreServiceService.get_prop_by_id(parseInt(this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key))).subscribe(
                (data)=>{
                  this.proposition = data;
                  this.rechercherLivre(this.proposition.titre);
        
                },
                (error)=>{
                  console.log(error);
                }
              );
              });
              this.get_liste_auteur();
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

  rechercherLivre(titre: string) {
    this.LivreServiceService.rechercherLivre(titre).subscribe((data: any) => {
      this.livres = data.items;
    });
  }

  get_liste_auteur(){
    this.AuteurService.get_liste_auteurs_nom_prenom().subscribe(
      (data)=>{
        this.liste_auteurs=data;
      },
      (error)=>{
        console.log(error);
      }
    )

  }

  open_livre(item:any){
    this.livre = item;
    this.livre_add.titre = item.volumeInfo.title;
    this.livre_add.genre = item.volumeInfo.categories[0];
    this.livre_add.description = item.volumeInfo.description;
    this.livre_add.image = item.volumeInfo.imageLinks.thumbnail;
    
    let dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display='block';
    }

  }

  close_dialog(){
    let dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display='none';
    }
  }

  close_dialog_add(){
    let dialog = document.getElementById('dialog_add_livre');
    if(dialog){
      dialog.style.display='none';
    }
  }

  add_to_catalogue(){
    this.livre_add.titre = this.proposition.titre;
    this.livre_add.genre = this.proposition.genre;
    this.livre_add.description = this.livre.volumeInfo?.description;
    this.livre_add.image = this.livre.volumeInfo?.imageLinks.thumbnail;
    let dialog_add_livre = document.getElementById('dialog_add_livre');
    this.close_dialog();
    if(dialog_add_livre){
      dialog_add_livre.style.display='block';
    }

  }

  auteur_name='';
  title='';
  message='';

  add_livre(){
    if(this.livre_add.prix!=0 && this.livre_add.nb_copie!=0 && this.auteur_name!=''){
      this.PasswordsService.open_loader();
      this.AuteurService.retourner_id_auteur(this.auteur_name).subscribe(
        (data)=>{
          this.livre_add.id_auteur = data;
          this.LivreServiceService.add_livre(this.livre_add).subscribe(
            (data)=>{
              this.title='Succès✅🫰';
              this.message='Le livre a été ajouté avec succès';
              let dialog = document.getElementById('dialog_message');
              if(dialog){
                dialog.style.display='block';
              }
              this.livre_add={
                id_livre: 0,
                titre: '',
                id_auteur: 0,
                genre: '',
                nb_copie: 0,
                image: '',
                description: '',
                prix: 0
              }
              this.close_dialog_add();
              this.PasswordsService.close_loader();
            },
            (error)=>{
              this.title='Erreur🔴⛔🧱';
              this.message='Une erreur est survenue lors de l\'ajout du livre';
              let dialog = document.getElementById('dialog_message');
              if(dialog){
                dialog.style.display='block';
              }
              this.close_dialog_add();
              this.livre_add={
                id_livre: 0,
                titre: '',
                id_auteur: 0,
                genre: '',
                nb_copie: 0,
                image: '',
                description: '',
                prix: 0
              }
              this.PasswordsService.close_loader();
            }
          );
        }

      )
    }
    this.PasswordsService.close_loader();
  }

  close_dialog_message(){
    let dialog = document.getElementById('dialog_message');
    if(dialog){
      dialog.style.display='none';
    }
  }







}
