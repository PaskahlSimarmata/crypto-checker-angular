import { Component,AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrencyService } from '../services/currency.service';


@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  trending:any;
  currency : string="IDR"
  banner:any;
  displayedColumns=["name","market_cap", "current_price","market_cap_change_24h"]
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:ApiService, public router:Router, private currencyService: CurrencyService) { 

  }

  ngOnInit(): void {
    this.getBannerData()
    this.getAllData()
    this.currencyService.getCurrency()  
    .subscribe({
      next:(val)=>{
        this.currency=val
        this.getAllData()
        this.getBannerData()
      }
    })
  }

  getBannerData(){
    this.api.getCurrencyTrending()
    .subscribe({
      next:(res)=>{
        this.trending=res
        this.banner=this.trending['coins'];
      }
    })
  }
  getAllData(){
    this.api.getCurrency(this.currency)
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  gotoDetails(row:any){
    this.router.navigate(["coin-detail",row.id])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
