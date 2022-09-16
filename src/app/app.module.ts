import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SkillPortfolioComponent } from './skill-portfolio/skill-portfolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SkillCardComponent } from './skill-card/skill-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';
import { AppConstants } from './app-constants';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function appInitializerFactory(translate: TranslateService) {
  return async () => {
    translate.setDefaultLang(AppConstants.FALLBACK_LANGUAGE);
    let preconfiguredLanguage = localStorage.getItem(AppConstants.STORAGE_KEY_LANGUAGE);
    if(preconfiguredLanguage && AppConstants.AVAILABLE_LANGUAGES.includes(preconfiguredLanguage)){
      await firstValueFrom(translate.use(preconfiguredLanguage));
    } else {
      let preferredAndSupportedLanguage: string|null = null;
      for(let x of navigator.languages){
        let languageCode = x.substring(0, Math.min(x.length, 2));
        if(AppConstants.AVAILABLE_LANGUAGES.includes(languageCode)){
          preferredAndSupportedLanguage = languageCode;
          break;
        }
      }
      if(!preferredAndSupportedLanguage){
        preferredAndSupportedLanguage = AppConstants.DEFAULT_LANGUAGE;
      }
      await firstValueFrom(translate.use(preferredAndSupportedLanguage));
    }
  };
}

@NgModule({
  declarations: [AppComponent, SkillPortfolioComponent, SkillCardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatCardModule,
    FlexLayoutModule,
    MatTooltipModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: "en"
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
