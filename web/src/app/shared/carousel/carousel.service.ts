import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { WakandaService } from '../wakanda.service';
import { ICaroussel } from '../interfaces';

@Injectable()
export class CarouselService {
  constructor(
    private wakanda: WakandaService,
    private dialog: MatDialog
  ) {

  }

  async getClass() {
    const ds = await this.wakanda.catalog;
    return ds.Picture;
  }


  async getAll(opts: {
      pageSize: number;
      start: number;
      filter?: string;
      params?: (string)[];
      orderBy?: string
    } = {
      pageSize: 10,
      start: 0
    }): Promise<{
      list: ICaroussel[];
      count: number;
    }> {
      const Picture = await this.getClass();
      const res = await Picture.query(opts);

      return {
        list: res.entities,
        count: res._count
      };
  }
}
