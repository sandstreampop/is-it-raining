/**
 * Precipitation Category (pcat)
 * The precipitation category parameter value is an integer with a value range of 0 to 6. The values represent the following:
 *
 * Value	Meaning
 * 0	No precipitation
 * 1	Snow
 * 2	Snow and rain
 * 3	Rain
 * 4	Drizzle
 * 5	Freezing rain
 * 6	Freezing drizzle
 */

export const isRaining = (pcat: number) => {
	switch (pcat) {
		case 0:
			return false;
		case 1:
			return false;
		case 2:
			return true;
		case 3:
			return true;
		case 4:
			return true;
		case 5:
			return true;
		case 6:
			return true;
		default:
			return false;
	}
};
