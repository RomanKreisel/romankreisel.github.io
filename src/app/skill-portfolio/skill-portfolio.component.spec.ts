import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPortfolioComponent } from './skill-portfolio.component';

describe('SkillPortfolioComponent', () => {
  let component: SkillPortfolioComponent;
  let fixture: ComponentFixture<SkillPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillPortfolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
