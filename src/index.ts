/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"` to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Env } from '../worker-configuration';
import { isRaining } from './is-raining';
import { sendSMS } from './send-sms';
import { SMHIData } from './types';

export default {
	// The scheduled handler is invoked at the interval set in our wrangler.toml's
	// [[triggers]] configuration.
	async scheduled(event, env, ctx): Promise<void> {
		const uppsala = {
			lat: 59.8586,
			lon: 17.6389,
		};

		const response = await fetch(
			`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${uppsala.lon}/lat/${uppsala.lat}/data.json`
		);

		const data = (await response.json()) as SMHIData;

		const now = new Date();
		const currentForecast = data.timeSeries.find((timeSeries) => {
			const forecastTime = new Date(timeSeries.validTime);
			return forecastTime.getHours() === now.getHours();
		});

		if (!currentForecast) {
			console.log('No forecast found');
			return;
		}

		console.log({ currentForecast: JSON.stringify(currentForecast) });

		const currentPcat = currentForecast.parameters.find(({ name, values }) => {
			return name === 'pcat';
		});

		if (!currentPcat || currentPcat.values[0] === undefined) {
			console.log('No pcat found');
			return;
		}

		const isCurrentlyRaining = isRaining(currentPcat.values[0]);

		if (isCurrentlyRaining) {
			console.log('It is raining');
			return;
		}

		const nextForecast = data.timeSeries.find((timeSeries) => {
			const forecastTime = new Date(timeSeries.validTime);
			return forecastTime.getHours() === now.getHours() + 1;
		});

		if (!nextForecast) {
			console.log('No next forecast found');
			return;
		}

		console.log({ nextForecast: JSON.stringify(nextForecast) });

		const nextPcat = nextForecast.parameters.find(({ name }) => {
			return name === 'pcat';
		});

		if (!nextPcat || nextPcat.values[0] === undefined) {
			console.log('No next pcat found');
			return;
		}

		const isNextRaining = isRaining(nextPcat.values[0]);

		if (isNextRaining) {
			console.log('It is going to rain');
			await sendSMS('Rain Alert: SMHI forecasts rain in the next hour. Stay dry!', env);
			return;
		}

		console.log('It is not going to rain');
		return;
	},
} satisfies ExportedHandler<Env>;
