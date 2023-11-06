import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaginationValue } from './pagination/pagination.component';

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public pagination = { page: 1, pageSize: 10 };

  public readonly paginationControl = new FormControl(this.pagination);

  private readonly items = Array.from(Array(100).keys(), (item) => item + 1);

  public visibleItems: PaginatedResponse<number> = {
    items: this.items.slice(0, 10),
    total: this.items.length,
  };

  ngOnInit(): void {
    this.paginationControl.valueChanges.subscribe(this.onPageChange.bind(this));
  }

  public onPageChange(pagination: PaginationValue): void {
    const startIndex = (pagination.page - 1) * pagination.pageSize;

    const items = this.items.slice(
      startIndex,
      startIndex + pagination.pageSize
    );

    this.visibleItems = { items, total: this.items.length };
  }
}
