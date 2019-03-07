import {Injectable} from '@angular/core';
import {ILink} from '../models/link';
import {HttpClient} from '@angular/common/http';
import {HandleError} from './service-helper';

@Injectable()
export class LinkService {
	private linkUrl = 'api/links';

	constructor(private http: HttpClient) {}

	get(): Promise<ILink[]> {
		return this.http.get(this.linkUrl)
			.toPromise()
			.catch(HandleError);
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