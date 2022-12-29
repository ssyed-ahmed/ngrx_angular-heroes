import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeroDetailGeneralComponent } from './hero-detail-general.component';

describe('HeroDetailGeneralComponent', () => {
  let component: HeroDetailGeneralComponent;
  let fixture: ComponentFixture<HeroDetailGeneralComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
