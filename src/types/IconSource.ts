import Icon from './Icon';

export default interface IconSource {
	icons: Icon[];
}

export interface ExtendibleIconSource extends IconSource {
	[key: string]: any;
}
