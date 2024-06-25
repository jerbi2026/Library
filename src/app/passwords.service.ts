import { find_auteur } from 'src/find_auteur';
import { LoginRequest } from './LoginRequest';
import { abonne } from './abonne';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { User } from 'src/User';
import { abonne_connected } from './abonne_connected';
import { Front_Manager } from 'src/Manager';
import { Abonne_default } from 'src/Abonne_default';

@Injectable({
  providedIn: 'root'
})
export class PasswordsService {

  constructor(private http: HttpClient) {} 
  readonly API_URL = "http://localhost:4000";
  secret_key='C25aG89sH63JdZpW';
  encryptString(message: string, secretKey: string): string {
    const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString();
    return encryptedMessage;
  }
  decryptString(encryptedMessage: string, secretKey: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  }

  setEncryptedItemWithExpiration(key: string, value: string, secretKey: string): void {
    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 1);
    
    const encryptedValue = this.encryptString(value, secretKey); 
    const item = {
      value: encryptedValue,
      expirationTime: expirationTime.getTime()
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  getDecryptedItem(key: string, secretKey: string): string | null {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      const parsedItem = JSON.parse(storedItem);
      const now = new Date().getTime();

      if (parsedItem.expirationTime > now) {
        const decryptedValue = this.decryptString(parsedItem.value, secretKey);
        const hashed_code = this.decryptString(decryptedValue, secretKey);
        return hashed_code;
      } else {
        localStorage.removeItem(key);
      }
    }

    return null; 
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  find_mail(email:string):Observable<number>{
    const url = `${this.API_URL}/find_mail`;
    return this.http.post<number>(url,  email );
  }
  
  changePassword(email: string, password: string): Observable<number> {
    const url = `${this.API_URL}/change_password/${email}`;
    return this.http.post<number>(url, { email, password });
  }

  add_user(new_abonne : abonne):Observable<number>{
    const url = `${this.API_URL}/add_user`;
    return this.http.post<number>(url, new_abonne);
  }


  login(lr:LoginRequest): Observable<User> {
    const url = `${this.API_URL}/login`;
    return this.http.post<User>(url,lr);
  }
  
  get_abonne_connected(mail:string):Observable<User>{
    const url = `${this.API_URL}/get_abonne_connected`;
    return this.http.post<User>(url,mail);

  }

  get_abonne_connected_default(mail:string):Observable<Abonne_default>{
    const url = `${this.API_URL}/get_abonne_connected`;
    return this.http.post<Abonne_default>(url,mail);

  }

  get_abonne_by_id(id:number):Observable<abonne_connected>{
    const url = `${this.API_URL}/get_abonne_by_id`;
    return this.http.post<abonne_connected>(url,id);
  }


  update_abonne(abonne_connected:abonne_connected):Observable<number>{
    const url = `${this.API_URL}/update_abonne`;
    return this.http.post<number>(url,abonne_connected);
  }

  private apiUrl = 'https://api.imgbb.com/1/upload'; 
  private apiKey = 'f55546bb61033efa3e7912aa9a88d443';


  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', this.apiKey);
    return this.http.post(this.apiUrl, formData);
  }


  login_manager(lr:LoginRequest): Observable<Front_Manager> {
    const url = `${this.API_URL}/login_manager`;
    return this.http.post<Front_Manager>(url,lr);
  }

  get_nb_abonne():Observable<number>{
    const url = `${this.API_URL}/get_nb_abonne`;
    return this.http.get<number>(url);
  }

  get_abonne_by_name(find_auteur:find_auteur):Observable<User[]>{
    const url = `${this.API_URL}/get_abonne_by_name`;
    return this.http.post<User[]>(url,find_auteur);
  }

  get_all():Observable<User[]>{
    const url = `${this.API_URL}/get_abonne_all`;
    return this.http.get<User[]>(url);


  }

  delete_abonne(id:number):Observable<void>{
    const url = `${this.API_URL}/delete_abonne_by_id`;
    return this.http.post<void>(url,id);
  }


  get_front_manager(mail:string):Observable<Front_Manager>{
    const url = `${this.API_URL}/get_front_manager`;
    return this.http.post<Front_Manager>(url,mail);

  }

  update_manager(manager:Front_Manager):Observable<number>{
    const url = `${this.API_URL}/update_manager`;
    return this.http.post<number>(url,manager);
  }


  open_loader(){
    let loader = document.getElementById('loader');
    let body = document.getElementById('body_content');
    if(loader && body){
      loader.style.display = 'block';
      body.style.display = 'none';
    }
  }

  close_loader(){
    let loader = document.getElementById('loader');
    let body = document.getElementById('body_content');
    if(loader && body){
      loader.style.display = 'none';
      body.style.display = 'block';
    }
  }




  
  


}
