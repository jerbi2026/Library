import { AuteurService } from './../auteur.service';
import { ReservationService } from './../reservation.service';
import { PasswordsService } from './../passwords.service';
import { livre } from './../../livre';
import { LivreServiceService } from './../livre-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';
declare var google: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent{

  constructor(private livreService: LivreServiceService,private ReservationService:ReservationService,private PasswordsService:PasswordsService,private AuteurService:AuteurService,private route:ActivatedRoute,private router:Router) { }

  nb_abonne=0;
  nb_auteur=0;
  nb_livres=0;
  nb_reservation=0;
  nb_proposition=0;
  nb_genre=0;
  connected_manager:Front_Manager={
    id_manager: 0,
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    image: '',
    numero: ''
  }
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
  auteur_name='';
  title='';
  message='';
  liste_auteurs:string[]=[];

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
            this.livre_per_genre()
            this.livre_per_auteur()
            this.livre_per_reservation()
            this.reservation_per_genre()
            this.proposition_per_user()
            this.get_best_sellers()
            this.get_nb_abonne();
            this.get_nb_auteurs();
            this.get_nb_livres();
            this.get_nb_proposition();
            this.get_nb_reservation();
            this.get_nb_genres();
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

  livre_per_genre(){
    this.livreService.getLivresByGenres().subscribe(data => {
      const formattedData = [['Genre', 'Nombre de Livres']];
      Object.keys(data).forEach(genre => {
        formattedData.push([genre, data[genre].length]);
      });

      this.drawChart(formattedData);
    });

  }

  drawChart(data: any[]): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      const chartData = google.visualization.arrayToDataTable(data);

      const options = {
        title: 'Livres par Genres',
        
      };

      const chart = new google.visualization.PieChart(document.getElementById('livre_per_genre'));
      chart.draw(chartData, options);
    });
  }

  livre_per_auteur(){
    this.livreService.getnbLivresByauteurs().subscribe(data => {
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(() => {
        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Auteur');
        chartData.addColumn('number', 'Nombre de Livres');
        
        Object.keys(data).forEach(auteur => {
          chartData.addRow([auteur, data[auteur]]);
        });

        const options = {
          title: 'Nombre de Livres par Auteurs'
        };

        const chart = new google.visualization.ColumnChart(document.getElementById('livre_per_auteur'));
        chart.draw(chartData, options);
      });
    });
  }

  livre_per_reservation(){
    this.ReservationService.get_nb_reservation_per_livre().subscribe(data => {
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(() => {
        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Livre');
        chartData.addColumn('number', 'Nombre de Réservations');
        
        Object.keys(data).forEach(livre => {
          chartData.addRow([livre, data[livre]]);
        });

        const options = {
          title: 'Nombre de Réservations par Livre',
          colors: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099'] 
          
        
        };

        const chart = new google.visualization.ColumnChart(document.getElementById('livre_per_reservation'));
        chart.draw(chartData, options);
        
      });
    });

  }

  reservation_per_genre(){
    this.ReservationService.get_nb_reservation_per_genre().subscribe(data => {
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(() => {
        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Genre');
        chartData.addColumn('number', 'Nombre de Réservations');
        
        Object.keys(data).forEach(genre => {
          chartData.addRow([genre, data[genre]]);
        });

        const options = {
          title: 'Nombre de Réservations par Genre'
        };

        const chart = new google.visualization.AreaChart(document.getElementById('reservation_per_genre'));
        chart.draw(chartData, options);
      });
    });

  }

  proposition_per_user(){
    this.livreService.getnbpropsitions_per_abonne().subscribe(data => {
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(() => {
        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Abonné');
        chartData.addColumn('number', 'Nombre de Propositions');
        
        Object.keys(data).forEach(nomAbonne => {
          chartData.addRow([nomAbonne, data[nomAbonne]]);
        });

        const options = {
          title: 'Nombre de Propositions de Livres par Abonné'
        };

        const chart = new google.visualization.ColumnChart(document.getElementById('proposition_per_user'));
        chart.draw(chartData, options);
      });
    });

  }
  books: any[] = [];
  get_best_sellers(){
    this.livreService.get_best_sellers().subscribe(
      (data:any)=>{
        this.books = data.results.lists[0].books;
        
      }
    )
  }

  get_nb_abonne(){
    this.PasswordsService.get_nb_abonne().subscribe(
      (data)=>{
        this.nb_abonne=data;
      }
    )

  }

  get_nb_auteurs(){
    this.AuteurService.get_nb_auteurs().subscribe(
      (data)=>{
        this.nb_auteur=data;
      }
    )
  }
  get_nb_genres(){
    this.livreService.get_nb_genres().subscribe(
      (data)=>{
        this.nb_genre=data;
      }
    )
  }
  get_nb_livres(){
    this.livreService.get_nb_livres().subscribe(
      (data)=>{
        this.nb_livres=data;
      }
    )
  }

  
  get_nb_proposition(){
    this.livreService.get_all_prop().subscribe((data)=>{
      this.nb_proposition=data.length;
    })
  }

  get_nb_reservation(){
    this.ReservationService.get_all_reservation().subscribe(
      (data)=>{
      this.nb_reservation=data.length;
    })
  }

  open_reservation(){
    let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/get_reservation/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }

  open_abonne(){
    let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/abonnees/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }

  open_auteurs(){
    let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/admin_auteurs/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }


  open_livres(){
    let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/admin_livres/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }
  open_propositions(){
    let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/get_proposition/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }

  book_title='';
  book_cover='';
  book_description='';
  book_author='';

  close_dialog(){
    let dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display='none';
    }
  }

  open_book(book:any){
    this.book_title=book.title;
    this.book_cover=book.book_image;
    this.book_description=book.description;
    this.book_author=book.author;
    let dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display='block';
    }


  }

  add_book(){
    this.livre_add.titre=this.book_title;
    this.livre_add.description=this.book_description;
    this.livre_add.image=this.book_cover;
    this.close_dialog();
    let add_dialog = document.getElementById('dialog_add_livre');
    if(add_dialog){
      add_dialog.style.display='block';
    }
  }

  close_dialog_add(){
    let dialog = document.getElementById('dialog_add_livre');
    if(dialog){
      dialog.style.display='none';
    }
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

  add_livre(){
    if(this.livre_add.prix!=0 && this.livre_add.nb_copie!=0 && this.auteur_name!='' && this.livre_add.genre!=''){
      this.PasswordsService.open_loader();
      this.AuteurService.retourner_id_auteur(this.auteur_name).subscribe(
        (data)=>{
          this.livre_add.id_auteur = data;
          
          this.livreService.add_livre(this.livre_add).subscribe(
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
  }

  close_dialog_message(){
    let dialog = document.getElementById('dialog_message');
    if(dialog){
      dialog.style.display='none';
    }
    this.ngOnInit();
  }
  

  
  

  

}
