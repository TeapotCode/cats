import { Component, OnInit,Input,AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Api } from 'src/app/shell/utils/api.interfaces';
import { FavoritesStore } from '../../data-access/api-service/favorites.store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data$!:Observable<Api.FavoriteImage[]>
  @ViewChild(MatPaginator) paginator:any= MatPaginator;

  data:Api.FavoriteImage[]=[]
  

  dataSource=new MatTableDataSource<Api.FavoriteImage>();

  displayedcolumns:string[]=['image','added','voted']

  constructor(private store: Store, private favoriteStore:FavoritesStore) {
   }

  ngOnInit() {
    this.data$.subscribe(cats=>
      {
        this.dataSource.data=cats;
      })
  }

  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator
  }

  dislike(image_id:string){
    this.favoriteStore.ifDislike(image_id)
  }

  remove(image_id:string){
    this.favoriteStore.ifRemoveVote(image_id)
  }

  like(image_id:string){
    this.favoriteStore.ifLike(image_id)
  }


}
