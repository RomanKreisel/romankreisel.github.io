import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Portfolio, Skill } from 'src/generated';
import { SkillHelper } from '../skill-helper';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'skill-portfolio',
  templateUrl: './skill-portfolio.component.html',
  styleUrls: ['./skill-portfolio.component.scss'],
})
export class SkillPortfolioComponent implements OnInit {
  portfolioUnfiltered: Portfolio = [];
  includePersonal = true;
  includeInfrequent = true;

  constructor(
    private httpClient: HttpClient,
    private translationService: TranslateService
    ) {}

  async ngOnInit() {
    this.portfolioUnfiltered = await firstValueFrom(
      this.httpClient.get<Portfolio>('/assets/portfolio.json')
    );
  }

  get portfolio() {
    return this.portfolioUnfiltered
      .filter((x) =>
        x.experiences
          .filter((x) => x.business || x.training || this.includePersonal)
          .some((x) => x.frequency !== 'infrequently' || this.includeInfrequent)
      )
      .sort((a, b) => {
        var experienceDifference = Math.round(
          this.getSkillHelper(b)
            .totalExperience(this.includePersonal, this.includeInfrequent)
            .asYears() -
            this.getSkillHelper(a)
              .totalExperience(this.includePersonal, this.includeInfrequent)
              .asYears()
        );
        if (experienceDifference != 0) {
          return experienceDifference;
        }
        let importanceDifference = b.importance - a.importance;
        if (importanceDifference != 0) {
          return importanceDifference;
        }
        return a.titleEnglish.localeCompare(b.titleEnglish);
      });
  }

  getSkillHelper(skill: Skill) {
    return new SkillHelper(skill, this.translationService.currentLang);
  }
}
