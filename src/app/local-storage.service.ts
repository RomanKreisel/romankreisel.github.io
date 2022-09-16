import { Injectable } from '@angular/core';
import { AppConstants } from './app-constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set language(id: string | null){
    if(id){
      localStorage.setItem(AppConstants.STORAGE_KEY_LANGUAGE, id);
    } else {
      localStorage.removeItem(AppConstants.STORAGE_KEY_LANGUAGE);
    }
  }

  get language(){
    return localStorage.getItem(AppConstants.STORAGE_KEY_LANGUAGE);
  }
}
