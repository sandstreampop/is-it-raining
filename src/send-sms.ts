import { Buffer } from 'buffer';
import { Env } from '../worker-configuration';

export const sendSMS = async (message: string, env: Env) => {
	const auth = Buffer.from(env['46_ELKS_AUTH']).toString('base64');

	let data = {
		from: 'RainBot',
		to: env.PHONE_NUMBER_RECEIVER,
		message,
	};

	const body = new URLSearchParams(data).toString();

	console.log('Sending sms to ', env.PHONE_NUMBER_RECEIVER);

	await fetch('https://api.46elks.com/a1/sms', {
		method: 'post',
		body,
		headers: { Authorization: 'Basic ' + auth },
	})
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.log(err));
};
