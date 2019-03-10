export interface ITask {
	id: number;
	_key?: string;
	start_date: string;
	text: string;
	progress: number;
	duration: number;
	parent: number;
}