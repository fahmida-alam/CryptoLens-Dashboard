import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import { BASE_URL_COINGECKO } from "../config.js";

const MARKETS_URL =
  `${BASE_URL_COINGECKO}/coins/markets` +
  "?vs_currency=usd" +
  "&order=market_cap_desc" +
  "&per_page=50" +
  "&page=1" +
  "&sparkline=false" +
  "&price_change_percentage=24h";

class MarketPage extends LitElement {
  static properties = {
    coins: { state: true },
    loading: { state: true },
    errorMessage: { state: true },
    searchText: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      color: var(--body-text, #4b5563);
    }

    .market-panel {
      background-color: var(
        --card-background,
        #ffffff
      );
      border: 1px solid
        var(--border-colour, #e5e7eb);
      border-radius: 14px;
      overflow: hidden;
    }

    .market-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 24px;
      background-color: var(
        --card-background,
        #ffffff
      );
      border-bottom: 1px solid
        var(--border-colour, #e5e7eb);
    }

    .market-title {
      margin: 0 0 6px 0;
      color: var(--main-text, #111827);
      font-size: 1.8rem;
    }

    .market-description {
      margin: 0;
      color: var(--body-text, #6b7280);
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .refresh-button {
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      background-color: var(
        --accent-colour,
        #facc15
      );
      color: #111827;
      font-weight: bold;
      cursor: pointer;
      white-space: nowrap;
    }

    .refresh-button:hover {
      background-color: #eab308;
    }

    .refresh-button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .search-section {
      padding: 16px 24px;
      background-color: var(
        --card-background,
        #ffffff
      );
      border-bottom: 1px solid
        var(--border-colour, #e5e7eb);
    }

    .search-input {
      width: 100%;
      max-width: 420px;
      padding: 10px 12px;
      border: 1px solid
        var(--border-colour, #d1d5db);
      border-radius: 8px;
      background-color: var(
        --page-background,
        #ffffff
      );
      color: var(--main-text, #111827);
      font-size: 0.95rem;
      box-sizing: border-box;
      outline: none;
    }

    .search-input::placeholder {
      color: var(--body-text, #6b7280);
    }

    .search-input:focus {
      border-color: var(
        --accent-colour,
        #facc15
      );
    }

    .table-wrapper {
      width: 100%;
      overflow-x: auto;
      background-color: var(
        --card-background,
        #ffffff
      );
    }

    table {
      width: 100%;
      min-width: 950px;
      border-collapse: collapse;
      background-color: var(
        --card-background,
        #ffffff
      );
    }

    thead {
      background-color: var(
        --page-background,
        #f9fafb
      );
    }

    th {
      padding: 14px 16px;
      color: var(--body-text, #6b7280);
      font-size: 0.78rem;
      text-align: right;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      white-space: nowrap;
    }

    td {
      padding: 15px 16px;
      border-top: 1px solid
        var(--border-colour, #e5e7eb);
      color: var(--main-text, #111827);
      text-align: right;
      white-space: nowrap;
    }

    th:first-child,
    td:first-child {
      width: 50px;
      text-align: center;
    }

    th:nth-child(2),
    td:nth-child(2) {
      text-align: left;
    }

    tbody tr {
      background-color: var(
        --card-background,
        #ffffff
      );
    }

    tbody tr:hover {
      background-color: var(
        --page-background,
        #fefce8
      );
    }

    .coin-details {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .coin-image {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: contain;
    }

    .coin-name {
      font-weight: bold;
      color: var(--main-text, #111827);
    }

    .coin-symbol {
      margin-left: 6px;
      color: var(--body-text, #6b7280);
      font-size: 0.78rem;
      text-transform: uppercase;
    }

    .positive {
      color: #16a34a;
      font-weight: bold;
    }

    .negative {
      color: #dc2626;
      font-weight: bold;
    }

    .message {
      padding: 50px 20px;
      background-color: var(
        --card-background,
        #ffffff
      );
      color: var(--body-text, #6b7280);
      text-align: center;
    }

    .error-message {
      color: #dc2626;
    }

    @media (max-width: 700px) {
      .market-header {
        flex-direction: column;
        align-items: stretch;
        padding: 20px 16px;
      }

      .search-section {
        padding: 14px 16px;
      }

      .refresh-button {
        width: 100%;
      }
    }
  `;

  constructor() {
    super();

    this.coins = [];
    this.loading = true;
    this.errorMessage = "";
    this.searchText = "";
  }

  connectedCallback() {
    super.connectedCallback();

    this.fetchMarkets();
  }

  fetchMarkets(forceRefresh = false) {
    this.loading = true;
    this.errorMessage = "";

    const cached = localStorage.getItem(
      "market_coins",
    );

    const cachedTime = localStorage.getItem(
      "market_coins_time",
    );

    let cachedCoins = [];

    try {
      cachedCoins = cached
        ? JSON.parse(cached)
        : [];
    } catch (error) {
      console.error(
        "Could not read cached market data:",
        error,
      );

      cachedCoins = [];

      localStorage.removeItem(
        "market_coins",
      );

      localStorage.removeItem(
        "market_coins_time",
      );
    }

    const cacheIsFresh =
      Array.isArray(cachedCoins) &&
      cachedCoins.length > 0 &&
      cachedTime &&
      Date.now() - Number(cachedTime) < 300000;

    if (!forceRefresh && cacheIsFresh) {
      this.coins = cachedCoins;
      this.loading = false;
      return;
    }

    fetch(MARKETS_URL)
      .then(function (res) {
        if (!res.ok) {
          throw new Error(
            `Request failed with status ${res.status}`,
          );
        }

        return res.json();
      })
      .then(
        function (json) {
          if (
            !Array.isArray(json) ||
            json.length === 0
          ) {
            throw new Error(
              "The API returned no cryptocurrency data.",
            );
          }

          this.coins = json;

          localStorage.setItem(
            "market_coins",
            JSON.stringify(json),
          );

          localStorage.setItem(
            "market_coins_time",
            Date.now().toString(),
          );

          this.loading = false;
        }.bind(this),
      )
      .catch(
        function (err) {
          console.error(
            "Market data error:",
            err,
          );

          this.coins = [];

          this.errorMessage =
            "Could not load cryptocurrency market data. Please press Refresh.";

          this.loading = false;
        }.bind(this),
      );
  }

  handleSearch(event) {
    this.searchText =
      event.target.value.toLowerCase();
  }

  getFilteredCoins() {
    if (!this.searchText) {
      return this.coins;
    }

    return this.coins.filter(
      function (coin) {
        return (
          coin.name
            .toLowerCase()
            .includes(this.searchText) ||
          coin.symbol
            .toLowerCase()
            .includes(this.searchText)
        );
      }.bind(this),
    );
  }

  formatPrice(value) {
    if (value == null) {
      return "—";
    }

    if (value < 1) {
      return `$${value.toLocaleString("en-US", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 8,
      })}`;
    }

    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  formatCurrency(value) {
    if (value == null) {
      return "—";
    }

    if (value >= 1000000000000) {
      return `$${(
        value / 1000000000000
      ).toFixed(2)}T`;
    }

    if (value >= 1000000000) {
      return `$${(
        value / 1000000000
      ).toFixed(2)}B`;
    }

    if (value >= 1000000) {
      return `$${(
        value / 1000000
      ).toFixed(2)}M`;
    }

    return `$${value.toLocaleString(
      "en-US",
      {
        maximumFractionDigits: 2,
      },
    )}`;
  }

  formatPercentage(value) {
    if (value == null) {
      return "—";
    }

    const sign = value >= 0 ? "+" : "";

    return `${sign}${value.toFixed(2)}%`;
  }

  renderMarketTable() {
    const filteredCoins =
      this.getFilteredCoins();

    if (
      this.coins.length === 0 &&
      !this.searchText
    ) {
      return html`
        <div class="message">
          No market data is available. Please press
          Refresh.
        </div>
      `;
    }

    if (filteredCoins.length === 0) {
      return html`
        <div class="message">
          No cryptocurrency matches your search.
        </div>
      `;
    }

    return html`
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
              <th>24h Volume</th>
            </tr>
          </thead>

          <tbody>
            ${filteredCoins.map(
              (coin, index) => html`
                <tr>
                  <td>${index + 1}</td>

                  <td>
                    <div class="coin-details">
                      <img
                        class="coin-image"
                        src=${coin.image}
                        alt="${coin.name} logo"
                      />

                      <div>
                        <span class="coin-name">
                          ${coin.name}
                        </span>

                        <span class="coin-symbol">
                          ${coin.symbol}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    ${this.formatPrice(
                      coin.current_price,
                    )}
                  </td>

                  <td
                    class=${coin
                      .price_change_percentage_24h >=
                    0
                      ? "positive"
                      : "negative"}
                  >
                    ${this.formatPercentage(
                      coin.price_change_percentage_24h,
                    )}
                  </td>

                  <td>
                    ${this.formatCurrency(
                      coin.market_cap,
                    )}
                  </td>

                  <td>
                    ${this.formatCurrency(
                      coin.total_volume,
                    )}
                  </td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  renderContent() {
    if (this.loading) {
      return html`
        <div class="message">
          Loading cryptocurrency market data...
        </div>
      `;
    }

    if (this.errorMessage) {
      return html`
        <div class="message error-message">
          ${this.errorMessage}
        </div>
      `;
    }

    return this.renderMarketTable();
  }

  render() {
    return html`
      <div class="market-panel">
        <div class="market-header">
          <div>
            <h2 class="market-title">
              Cryptocurrency Market
            </h2>

            <p class="market-description">
              View the top 50 cryptocurrencies
              ordered by market capitalisation.
            </p>
          </div>

          <button
            class="refresh-button"
            ?disabled=${this.loading}
            @click=${() =>
              this.fetchMarkets(true)}
          >
            ${this.loading
              ? "Loading..."
              : "Refresh"}
          </button>
        </div>

        <div class="search-section">
          <input
            class="search-input"
            type="search"
            placeholder="Search by coin name or symbol"
            .value=${this.searchText}
            @input=${this.handleSearch}
          />
        </div>

        ${this.renderContent()}
      </div>
    `;
  }
}

customElements.define(
  "market-page",
  MarketPage,
);