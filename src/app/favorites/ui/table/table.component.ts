import { Component, OnInit,Input,AfterViewInit, ViewChild,OnChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Api } from 'src/app/shell/utils/api.interfaces';
import { FavoritesStore } from '../../data-access/api-service/favorites.store';
import { toVote } from '../../utils/toVote';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data$!:Observable<Api.FavoriteImage[]>
  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  @Output() ToDislike=new EventEmitter<toVote>();
  @Output() ToLike=new EventEmitter<toVote>();

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

  ngOnChanges(){
  }

  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator
  }

  dislike(image_id:string,voteId:number,vote:number){
    this.ToDislike.emit({image_id,voteId,vote})
  }

  like(image_id:string,voteId:number,vote:number){
    this.ToLike.emit({image_id,voteId,vote})
  }


}
