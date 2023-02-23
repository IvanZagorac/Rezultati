import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLeagueComponent } from './single-league.component';

describe('SingleLeagueComponent', () => {
  let component: SingleLeagueComponent;
  let fixture: ComponentFixture<SingleLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleLeagueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
