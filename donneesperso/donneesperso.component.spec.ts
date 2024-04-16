import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneespersoComponent } from './donneesperso.component';

describe('DonneespersoComponent', () => {
  let component: DonneespersoComponent;
  let fixture: ComponentFixture<DonneespersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonneespersoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonneespersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
