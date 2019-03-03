import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainProjectComponent } from './create-main-project.component';

describe('CreateMainProjectComponent', () => {
  let component: CreateMainProjectComponent;
  let fixture: ComponentFixture<CreateMainProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMainProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMainProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
