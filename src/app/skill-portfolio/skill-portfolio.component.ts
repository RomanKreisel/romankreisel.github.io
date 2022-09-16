import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Portfolio, Skill } from 'src/generated';
import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as dayjsLocales from 'dayjs/locale/*';
import { SkillServiceService as SkillService } from '../skill-service.service';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('de');

@Component({
  selector: 'app-skill-portfolio',
  templateUrl: './skill-portfolio.component.html',
  styleUrls: ['./skill-portfolio.component.scss'],
})
export class SkillPortfolioComponent implements OnInit {
  portfolioUnfiltered: Portfolio = [];
  includePersonal = true;
  includeInfrequent = true;

  constructor(private httpClient: HttpClient) {}

  async ngOnInit() {
    this.portfolioUnfiltered = await firstValueFrom(
      this.httpClient.get<Portfolio>('/assets/portfolio.json')
    );
  }

  get portfolio() {
    return this.portfolioUnfiltered
      .filter((x) =>
        x.experiences
          .filter((x) => x.business || x.business || this.includePersonal)
          .some((x) => x.frequency !== 'infrequently' || this.includeInfrequent)
      )
      .sort((a, b) => {
        var experienceDifference = Math.round(
          this.totalExperience(b).asYears() - this.totalExperience(a).asYears()
        );
        if (experienceDifference != 0) {
          return experienceDifference;
        }
        let importanceDifference = b.importance - a.importance;
        if (importanceDifference != 0) {
          return importanceDifference;
        }
        return a.title.localeCompare(b.title);
      });
  }

  experienceTypeChanged(value: number) {
    if (value === 0) {
    }
  }

  encodeForElementId(value: string): string {
    return encodeURI(value).toLowerCase();
  }

  totalExperience(skill: Skill) {
    let totalDays = 0;
    for (let experience of skill.experiences) {
      if (
        !this.includePersonal &&
        !experience.business &&
        !experience.training
      ) {
        continue;
      }
      if (!this.includeInfrequent && experience.frequency === 'infrequently') {
        continue;
      }
      let from = dayjs(experience.from);
      let to = dayjs();
      if (experience.to) {
        to = dayjs(experience.to);
      }
      let difference = to.diff(from, 'days');
      totalDays += difference;
    }
    return dayjs.duration({ days: totalDays });
  }

  totalExperienceHumanized(skill: Skill) {
    return this.totalExperience(skill).humanize(false);
  }
}
