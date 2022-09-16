import { Skill } from 'src/generated';
import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as dayjsLocales from 'dayjs/locale/*';

export class SkillHelper {
  constructor(public skill: Skill) {}

  get skillNameForElementId(): string {
    return encodeURI(this.skill.title).toLowerCase();
  }

  totalExperience(includePersonal = false, includeInfrequent = false) {
    let totalDays = 0;
    for (let experience of this.skill.experiences) {
      if (!includePersonal && !experience.business && !experience.training) {
        continue;
      }
      if (!includeInfrequent && experience.frequency === 'infrequently') {
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

  totalExperienceHumanized(includePersonal = false, includeInfrequent = false) {
    return this.totalExperience(includePersonal, includeInfrequent).humanize(
      false
    );
  }
}
