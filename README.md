# Is It Raining?

A Cloudflare Worker that checks if it's raining at the specified latitude and longitude, and sends an SMS alert if rain is forecasted in the next hour.

## Features

- Fetches weather data from SMHI (Swedish Meteorological and Hydrological Institute)
- Runs hourly to check for upcoming rain
- Sends SMS alerts when rain is expected using 46elks API

## Technologies Used

- Cloudflare Workers
- TypeScript
- [SMHI – API for Meteorological Forecasts](https://opendata.smhi.se/apidocs/metfcst/index.html)
- [46elks – API for SMS messaging](https://46elks.se/)

## Setup

1. Clone the repository:   ```
   git clone https://github.com/yourusername/is-it-raining.git
   cd is-it-raining   ```

2. Install dependencies:   ```
   npm install   ```

3. Set up your Cloudflare account and obtain the necessary credentials.

4. Set up a 46elks account for SMS functionality.

5. Configure your environment variables (see Configuration section).

6. Deploy the worker to Cloudflare:   ```
   npm run deploy   ```

## Configuration

The following environment variables need to be set:
- `LAT`: Latitude
- `LON`: Longitude

The following secrets need to be set:
- `46_ELKS_AUTH`: Your 46elks API credentials
- `PHONE_NUMBER_RECEIVER`: The phone number to receive SMS alerts

To change the cron schedule that the worker runs on, edit the section under `[triggers]` in `wrangler.toml`.

## Development

To run the worker locally:

1. `npm run dev`
2. Trigger the worker by running `curl http://localhost:8787/__scheduled`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
