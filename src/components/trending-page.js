import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import { BASE_URL_COINGECKO } from "../config.js";

const TRENDING_URL =
  `${BASE_URL_COINGECKO}/search/trending`;

class TrendingPage extends LitElement {
  static properties = {
    trendingCoins: { state: true },
    loading: { state: true },
    errorMessage: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      color: var(--body-text, #4b5563);
    }

    .trending-panel {
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

    .trending-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 24px;
      border-bottom: 1px solid
        var(--border-colour, #e5e7eb);
    }

    .trending-title {
      margin: 0 0 6px 0;
      color: var(--main-text, #111827);
      font-size: 1.8rem;
    }

    .trending-description {
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

    .coin-grid {
      display: grid;
      grid-template-columns:
        repeat(auto-fit, minmax(250px, 1fr));
      gap: 18px;
      padding: 24px;
    }

    .coin-card {
      padding: 20px;
      background-color: var(
        --page-background,
        #f9fafb
      );
      border: 1px solid
        var(--border-colour, #e5e7eb);
      border-radius: 12px;
      transition:
        transform 0.2s,
        border-color 0.2s;
    }

    .coin-card:hover {
      transform: translateY(-3px);
      border-color: var(
        --accent-colour,
        #facc15
      );
    }

    .coin-top {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .coin-image {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      object-fit: contain;
    }

    .coin-name {
      margin: 0;
      color: var(--main-text, #111827);
      font-size: 1rem;
    }

    .coin-symbol {
      margin-top: 4px;
      color: var(--body-text, #6b7280);
      font-size: 0.8rem;
      text-transform: uppercase;
    }

    .coin-info {
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px solid
        var(--border-colour, #e5e7eb);
    }

    .rank {
      margin: 0;
      color: var(--body-text, #6b7280);
      font-size: 0.9rem;
    }

    .rank strong {
      color: var(--main-text, #111827);
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
      .trending-header {
        flex-direction: column;
        align-items: stretch;
        padding: 20px 16px;
      }

      .coin-grid {
        grid-template-columns: 1fr;
        padding: 16px;
      }

      .refresh-button {
        width: 100%;
      }
    }
  `;

  constructor() {
    super();

    this.trendingCoins = [];
    this.loading = true;
    this.errorMessage = "";
  }

  connectedCallback() {
    super.connectedCallback();

    this.fetchTrendingCoins();
  }

  fetchTrendingCoins(forceRefresh = false) {
    this.loading = true;
    this.errorMessage = "";

    const cached = localStorage.getItem(
      "trending_coins",
    );

    const cachedTime = localStorage.getItem(
      "trending_coins_time",
    );

    let cachedCoins = [];

    try {
      cachedCoins = cached
        ? JSON.parse(cached)
        : [];
    } catch (error) {
      cachedCoins = [];

      localStorage.removeItem(
        "trending_coins",
      );

      localStorage.removeItem(
        "trending_coins_time",
      );
    }

    const cacheIsFresh =
      Array.isArray(cachedCoins) &&
      cachedCoins.length > 0 &&
      cachedTime &&
      Date.now() - Number(cachedTime) < 300000;

    if (!forceRefresh && cacheIsFresh) {
      this.trendingCoins = cachedCoins;
      this.loading = false;
      return;
    }

    fetch(TRENDING_URL)
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
          const coins = json.coins
            .slice(0, 10)
            .map(function (coin) {
              return coin.item;
            });

          if (coins.length === 0) {
            throw new Error(
              "No trending coins were returned.",
            );
          }

          this.trendingCoins = coins;

          localStorage.setItem(
            "trending_coins",
            JSON.stringify(coins),
          );

          localStorage.setItem(
            "trending_coins_time",
            Date.now().toString(),
          );

          this.loading = false;
        }.bind(this),
      )
      .catch(
        function (error) {
          console.error(
            "Trending data error:",
            error,
          );

          this.trendingCoins = [];

          this.errorMessage =
            "Could not load trending cryptocurrency data.";

          this.loading = false;
        }.bind(this),
      );
  }

  renderCoins() {
    return html`
      <div class="coin-grid">
        ${this.trendingCoins.map(
          (coin) => html`
            <div class="coin-card">
              <div class="coin-top">
                <img
                  class="coin-image"
                  src=${coin.small}
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

              <div class="coin-info">
                <p class="rank">
                  Market Cap Rank:
                  <strong>
                    ${coin.market_cap_rank
                      ? `#${coin.market_cap_rank}`
                      : "N/A"}
                  </strong>
                </p>
              </div>
            </div>
          `,
        )}
      </div>
    `;
  }

  renderContent() {
    if (this.loading) {
      return html`
        <div class="message">
          Loading trending cryptocurrencies...
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

    return this.renderCoins();
  }

  render() {
    return html`
      <div class="trending-panel">
        <div class="trending-header">
          <div>
            <h2 class="trending-title">
              Trending Cryptocurrencies
            </h2>

            <p class="trending-description">
              Discover cryptocurrencies currently
              trending on CoinGecko.
            </p>
          </div>

          <button
            class="refresh-button"
            ?disabled=${this.loading}
            @click=${() =>
              this.fetchTrendingCoins(true)}
          >
            ${this.loading
              ? "Loading..."
              : "Refresh"}
          </button>
        </div>

        ${this.renderContent()}
      </div>
    `;
  }
}

customElements.define(
  "trending-page",
  TrendingPage,
);