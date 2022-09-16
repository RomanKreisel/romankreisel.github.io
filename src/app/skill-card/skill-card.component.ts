import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/generated';
import { SkillHelper } from '../skill-helper';

@Component({
  selector: 'skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss'],
})
export class SkillCardComponent implements OnInit {
  @Input('skillHelper') skillHelper!: SkillHelper;
  @Input('includePersonal') includePersonal: boolean = true;
  @Input('includeInfrequent') includeInfrequent: boolean= true;

  constructor() {}

  ngOnInit(): void {}

  get skill() {
    return this.skillHelper.skill;
  }
}
