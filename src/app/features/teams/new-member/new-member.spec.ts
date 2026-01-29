import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMember } from './new-member';

describe('NewMember', () => {
  let component: NewMember;
  let fixture: ComponentFixture<NewMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMember]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMember);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
