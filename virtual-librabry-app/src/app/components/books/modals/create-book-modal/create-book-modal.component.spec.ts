import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookModalComponent } from './create-book-modal.component';

describe('CreateBookModalComponent', () => {
  let component: CreateBookModalComponent;
  let fixture: ComponentFixture<CreateBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBookModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
