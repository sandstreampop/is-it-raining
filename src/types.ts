export type SMHIData = {
	approvedTime: string;
	referenceTime: string;
	geometry: Geometry;
	timeSeries: DataPoint[];
};

export type Geometry = {
	type: string;
	coordinates: number[][];
};

export type DataPoint = {
	validTime: string;
	parameters: Parameter[];
};

export type Parameter = {
	name: 'pcat';
	levelType: string;
	level: number;
	unit: string;
	values: number[];
};
