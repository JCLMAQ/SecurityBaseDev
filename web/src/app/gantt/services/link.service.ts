import {Injectable} from '@angular/core';
import {ILink} from '../models/link';
import { WakandaService } from '../../shared/wakanda.service';
import {HttpClient} from '@angular/common/http';
import {HandleError} from './service-helper';

@Injectable()
export class LinkService {
	private linkUrl = 'api/links';

	constructor(
		private wakanda: WakandaService,
		private http: HttpClient
		) {}

	async getLinkClass() {
		const ds = await this.wakanda.catalog;
		return ds.GanttLink;
		}

	async getLinkAll() : Promise<ILink[]>{
		const Link = await this.getLinkClass();
		const res = await Link.query();
		return res.entities;
	}

	async get() {
		//const Link = await this.getLinkClass();
		const result = await this.getLinkAll();
		return result;
		// return this.http.get(this.linkUrl)
		// 	.toPromise()
		// 	.catch(HandleError);
	}

	insert(link: ILink): Promise<ILink> {
		return this.http.post(this.linkUrl, link)
			.toPromise()
			.catch(HandleError);
	}

	update(link: ILink): Promise<void> {
		return this.http.put(`${this.linkUrl}/${link.id}`, link)
			.toPromise()
			.catch(HandleError);
	}

	remove(id: number): Promise<void> {
		return this.http.delete(`${this.linkUrl}/${id}`)
			.toPromise()
			.catch(HandleError);
	}
}