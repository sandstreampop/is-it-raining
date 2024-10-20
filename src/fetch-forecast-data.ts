import { SMHIData } from './types';

export async function fetchForecastData(lat: string, lon: string): Promise<SMHIData> {
	console.log(`Fetching forecast data for lat: ${lat}, lon: ${lon}`);
	const response = await fetch(
		`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`
	);

	const result = (await response.json()) as SMHIData;

	return result;
}
