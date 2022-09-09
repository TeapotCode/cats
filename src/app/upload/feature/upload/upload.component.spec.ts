import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {UploadState} from "../../data/access/state/upload.reducer";

import {UploadComponent} from './upload.component';
import {Image} from '../../utilities/ImagesInterface';

let store: MockStore

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  const image: Image = {};
  const event: any = {};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch delete action', () => {
    const storeSpy = jest.spyOn(store,'dispatch');
    component.onDelete(image);
    expect(storeSpy).toHaveBeenCalled()
  })

  it('should upload files method dispatch action', () => {
    const storeSpy = jest.spyOn(store,'dispatch');
    component.uploadFiles([]);
    expect(storeSpy).toHaveBeenCalled();
  })
});
