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

class ComparePage extends LitElement {
  static properties = {
    coins: { state: true },
    firstCoinId: { state: true },
    secondCoinId: { state: true },
    loading: { state: true },
    errorMessage: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      color: var(--body-text, #4b5563);
    }

    .compare-panel {
      max-width: 1200px;
      margin: 0 auto;
      background-color: var(
        --card-background,
        #ffffff
      );
      border: 1px solid
        var(--border-colour, #e5e7eb);
      border-radius: 14px;
      overflow: hidden;
    }

    .compare-header {
      padding: 24px;
      border-bottom: 1px solid
        var(--border-colour, #e5e7eb);
    }

    .compare-title {
      margin: 0 0 6px 0;
      color: var(--main-text, #111827);
      font-size: 1.8rem;
    }

    .compare-description {
      margin: 0;
      color: var(--body-text, #6b7280);
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .selection-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 24px;
      border-bottom: 1px solid
        var(--border-colour, #e5e7eb);
    }

    .select-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    label {
      color: var(--main-text, #111827);
      font-size: 0.9rem;
      font-weight: bold;
    }

    select {
      width: 100%;
      padding: 11px 12px;
      border: 1px solid
        var(--border-colour, #d1d5db);
      border-radius: 8px;
      background-color: var(
        --page-background,
        #ffffff
      );
      color: var(--main-text, #111827);
      font-size: 0.95rem;
      outline: none;
      cursor: pointer;
    }

    select:focus {
      border-color: var(
        --accent-colour,
        #facc15
      );
    }

    .comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 24px;
    }

    .coin-card {
      padding: 24px;
      background-color: var(
        --page-background,
        #f9fafb
      );
      border: 1px solid
        var(--border-colour, #e5e7eb);
      border-radius: 12px;
    }

    .coin-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 18px;
      border-bottom: 1px solid
        var(--border-colour, #e5e7eb);
    }

    .coin-image {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: contain;
    }

    .coin-name {
      margin: 0;
      color: var(--main-text, #111827);
      font-size: 1.2rem;
    }

    .coin-symbol {
      margin-top: 4px;
      color: var(--body-text, #6b7280);
      font-size: 0.8rem;
      text-transform: uppercase;
    }

    .coin-data {
      margin-top: 18px;
    }

    .data-row {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      padding: 11px 0;
      border-bottom: 1px solid
        var(--border-colour, #e5e7eb);
    }

    .data-row:last-child {
      border-bottom: none;
    }

    .data-label {
      color: var(--body-text, #6b7280);
    }

    .data-value {
      color: var(--main-text, #111827);
      font-weight: bold;
      text-align: right;
    }

    .positive {
      color: #16a34a;
    }

    .negative {
      color: #dc2626;
    }

    .message {
      padding: 60px 20px;
      color: var(--body-text, #6b7280);
      text-align: center;
    }

    .error-message {
      color: #dc2626;
    }

    @media (max-width: 700px) {
      .selection-section,
      .comparison {
        grid-template-columns: 1fr;
      }

      .compare-header,
      .selection-section,
      .comparison {
        padding: 20px 16px;
      }
    }
  `;

  constructor() {
    super();

    this.coins = [];
    this.firstCoinId = "";
    this.secondCoinId = "";
    this.loading = true;
    this.errorMessage = "";
  }

  connectedCallback() {
    super.connectedCallback();

    this.fetchCoins();
  }

  fetchCoins() {
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
      cachedCoins = [];
    }

    const cacheIsFresh =
      Array.isArray(cachedCoins) &&
      cachedCoins.length > 0 &&
      cachedTime &&
      Date.now() - Number(cachedTime) < 300000;

    if (cacheIsFresh) {
      this.coins = cachedCoins;

      this.setDefaultCoins();

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
              "No cryptocurrency data was returned.",
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

          this.setDefaultCoins();

          this.loading = false;
        }.bind(this),
      )
      .catch(
        function (error) {
          console.error(
            "Compare data error:",
            error,
          );

          this.errorMessage =
            "Could not load cryptocurrency data.";

          this.loading = false;
        }.bind(this),
      );
  }

  setDefaultCoins() {
    if (this.coins.length >= 2) {
      this.firstCoinId = this.coins[0].id;
      this.secondCoinId = this.coins[1].id;
    }
  }

  handleFirstCoin(event) {
    this.firstCoinId = event.target.value;
  }

  handleSecondCoin(event) {
    this.secondCoinId = event.target.value;
  }

  getCoin(coinId) {
    return this.coins.find(function (coin) {
      return coin.id === coinId;
    });
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

    return `$${value.toLocaleString("en-US")}`;
  }

  formatPercentage(value) {
    if (value == null) {
      return "—";
    }

    const sign = value >= 0 ? "+" : "";

    return `${sign}${value.toFixed(2)}%`;
  }

  renderCoinCard(coin) {
    if (!coin) {
      return html``;
    }

    const changeClass =
      coin.price_change_percentage_24h >= 0
        ? "data-value positive"
        : "data-value negative";

    return html`
      <div class="coin-card">
        <div class="coin-header">
          <img
            class="coin-image"
            src=${coin.image}
            alt="${coin.name} logo"
          />

          <div>
            <h3 class="coin-name">
              ${coin.name}
            </h3>

            <div class="coin-symbol">
              ${coin.symbol}
            </div>
          </div>
        </div>

        <div class="coin-data">
          <div class="data-row">
            <span class="data-label">
              Market Rank
            </span>

            <span class="data-value">
              #${coin.market_cap_rank}
            </span>
          </div>

          <div class="data-row">
            <span class="data-label">
              Current Price
            </span>

            <span class="data-value">
              ${this.formatPrice(
                coin.current_price,
              )}
            </span>
          </div>

          <div class="data-row">
            <span class="data-label">
              24h Change
            </span>

            <span class=${changeClass}>
              ${this.formatPercentage(
                coin.price_change_percentage_24h,
              )}
            </span>
          </div>

          <div class="data-row">
            <span class="data-label">
              Market Cap
            </span>

            <span class="data-value">
              ${this.formatCurrency(
                coin.market_cap,
              )}
            </span>
          </div>

          <div class="data-row">
            <span class="data-label">
              24h Volume
            </span>

            <span class="data-value">
              ${this.formatCurrency(
                coin.total_volume,
              )}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  renderComparison() {
    const firstCoin =
      this.getCoin(this.firstCoinId);

    const secondCoin =
      this.getCoin(this.secondCoinId);

    return html`
      <div class="comparison">
        ${this.renderCoinCard(firstCoin)}
        ${this.renderCoinCard(secondCoin)}
      </div>
    `;
  }

  renderContent() {
    if (this.loading) {
      return html`
        <div class="message">
          Loading cryptocurrencies...
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

    return html`
      <div class="selection-section">
        <div class="select-group">
          <label for="first-coin">
            First Cryptocurrency
          </label>

          <select
            id="first-coin"
            .value=${this.firstCoinId}
            @change=${this.handleFirstCoin}
          >
            ${this.coins.map(
              (coin) => html`
                <option value=${coin.id}>
                  ${coin.name}
                  (${coin.symbol.toUpperCase()})
                </option>
              `,
            )}
          </select>
        </div>

        <div class="select-group">
          <label for="second-coin">
            Second Cryptocurrency
          </label>

          <select
            id="second-coin"
            .value=${this.secondCoinId}
            @change=${this.handleSecondCoin}
          >
            ${this.coins.map(
              (coin) => html`
                <option value=${coin.id}>
                  ${coin.name}
                  (${coin.symbol.toUpperCase()})
                </option>
              `,
            )}
          </select>
        </div>
      </div>

      ${this.renderComparison()}
    `;
  }

  render() {
    return html`
      <div class="compare-panel">
        <div class="compare-header">
          <h2 class="compare-title">
            Compare Cryptocurrencies
          </h2>

          <p class="compare-description">
            Select two cryptocurrencies to compare
            their current market information.
          </p>
        </div>

        ${this.renderContent()}
      </div>
    `;
  }
}

customElements.define(
  "compare-page",
  ComparePage,
);