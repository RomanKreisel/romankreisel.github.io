import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private translateService: TranslateService, private localStorageService: LocalStorageService){
  }

  get language(){
    return this.translateService.currentLang;
  }

  async switchLanguage(id: string){
    await this.translateService.use(id);
    this.localStorageService.language = id;
  }

}
