import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTasks } from './new-tasks';

describe('NewTasks', () => {
  let component: NewTasks;
  let fixture: ComponentFixture<NewTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTasks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
