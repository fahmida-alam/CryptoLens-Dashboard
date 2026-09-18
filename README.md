# CryptoLens

CryptoLens is a responsive cryptocurrency dashboard for exploring market data, comparing digital assets, discovering trending cryptocurrencies, and following recent crypto news from one place.

The application uses live cryptocurrency data from CoinGecko and crypto news from NewsData.io.

## Live Website

CryptoLens is deployed using Cloudflare Pages.

**Live site:** https://cryptolens-dashboard.pages.dev/

![CryptoLens Home](./img/home-screenshot.png)

## Features

### Cryptocurrency Market

Browse current cryptocurrency market information including:

- Current price
- Market capitalization
- 24-hour trading volume
- 24-hour price change
- Cryptocurrency ranking
- Search by cryptocurrency name or symbol

Users can choose to display the Top 10, Top 25, or Top 50 cryptocurrencies.

![CryptoLens Market](./img/market-screenshot.png)

### Cryptocurrency Comparison

Compare two cryptocurrencies side by side using current market information.

The comparison includes:

- Market rank
- Current price
- 24-hour price change
- Market capitalization
- 24-hour trading volume

![CryptoLens Compare](./img/compare-screenshot.png)

### Trending Cryptocurrencies

Discover cryptocurrencies that are currently attracting attention using CoinGecko's trending cryptocurrency data.

![CryptoLens Trending](./img/trending-screenshot.png)

### Cryptocurrency News

Follow recent cryptocurrency stories from sources around the world.

News cards display article titles, descriptions, publication information, and links to the original articles.

Users can choose to display 6, 9, or 12 news articles.

The NewsData.io API request is handled through a Cloudflare Pages Function so the API key is not exposed in the client-side JavaScript.

![CryptoLens News](./img/news-screenshot.png)

### User Preferences

CryptoLens includes a dedicated Settings page where users can customize their experience.

Available preferences include:

- Light and dark themes
- USD, AUD, EUR, and GBP currencies
- Top 10, Top 25, or Top 50 market display
- 6, 9, or 12 news articles
- Reset preferences option

Preferences are stored locally in the browser using `localStorage`.

![CryptoLens Settings](./img/settings-screenshot.png)

## Technologies

- HTML
- CSS
- JavaScript
- Lit
- Web Components
- CoinGecko API
- NewsData.io API
- Cloudflare Pages
- Cloudflare Pages Functions
- Browser Local Storage

## APIs

### CoinGecko

CryptoLens uses the CoinGecko API to retrieve cryptocurrency market information and trending cryptocurrency data.

https://www.coingecko.com/en/api

### NewsData.io

CryptoLens uses the NewsData.io Crypto News API to retrieve recent cryptocurrency news.

The NewsData API key is stored as a Cloudflare environment secret and is accessed only by the server-side Pages Function.

https://newsdata.io/

## Project Structure

```text
CryptoLens-Dashboard/
├── functions/
│   └── api/
│       └── news.js
│
├── img/
│   ├── CryptoLens_Icon.png
│   ├── home-screenshot.png
│   ├── market-screenshot.png
│   ├── compare-screenshot.png
│   ├── trending-screenshot.png
│   ├── news-screenshot.png
│   └── settings-screenshot.png
│
├── src/
│   ├── components/
│   │   ├── about-page.js
│   │   ├── compare-page.js
│   │   ├── market-page.js
│   │   ├── news-page.js
│   │   ├── settings-page.js
│   │   ├── toggle-theme.js
│   │   └── trending-page.js
│   │
│   ├── config.js
│   └── cryptoLens-dashboard.js
│
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Running CryptoLens Locally

Clone the repository:

```bash
git clone https://github.com/fahmida-alam/CryptoLens-Dashboard.git
```

Move into the project directory:

```bash
cd CryptoLens-Dashboard
```

Install the project dependencies:

```bash
npm install
```

Because CryptoLens uses JavaScript modules and a Cloudflare Pages Function for cryptocurrency news, the application should be run through an appropriate local development server.

## NewsData API Key

CryptoLens does not store the NewsData API key in client-side JavaScript.

For the deployed application, the API key is stored securely as a Cloudflare Pages secret named:

```text
NEWSDATA_API_KEY
```

The Cloudflare Pages Function located at:

```text
functions/api/news.js
```

reads the secret on the server and sends the cryptocurrency news data back to the application through:

```text
/api/news
```

This prevents the NewsData API key from being included directly in the browser-side source code.

## Deployment

CryptoLens is deployed using Cloudflare Pages.

To authenticate Wrangler with Cloudflare:

```bash
npx wrangler login
```

To add the NewsData API key securely to the Cloudflare Pages project:

```bash
npx wrangler pages secret put NEWSDATA_API_KEY --project-name=cryptolens-dashboard
```

When prompted, enter the NewsData API key as the secret value.

To deploy the application:

```bash
npx wrangler pages deploy . --project-name=cryptolens-dashboard
```

After making changes, the application can be redeployed using the same deployment command.

**Live application:** https://cryptolens-dashboard.pages.dev/

## Developer

Designed and developed by **Fahmida Alam**.

- GitHub: https://github.com/fahmida-alam
- LinkedIn: https://www.linkedin.com/in/fahmida-alam-409089264

## Disclaimer

Cryptocurrency information displayed on CryptoLens is provided for informational purposes only and should not be considered financial advice.