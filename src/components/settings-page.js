import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import "./toggle-theme.js";

class SettingsPage extends LitElement {
  static properties = {
    currency: { state: true },
    marketLimit: { state: true },
    newsLimit: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      color: var(--body-text, #4b5563);
    }

    .settings-panel {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px;
      background-color: var(
        --card-background,
        #ffffff
      );
      border: 1px solid
        var(--border-colour, #e5e7eb);
      border-radius: 14px;
      box-sizing: border-box;
    }

    .settings-title {
      margin: 0 0 8px 0;
      color: var(--main-text, #111827);
      font-size: 1.8rem;
    }

    .settings-description {
      margin: 0 0 30px 0;
      line-height: 1.6;
    }

    .setting-section {
      margin-bottom: 20px;
      padding: 24px;
      background-color: var(
        --page-background,
        #f9fafb
      );
      border: 1px solid
        var(--border-colour, #e5e7eb);
      border-radius: 10px;
    }

    .setting-section h3 {
      margin: 0 0 6px 0;
      color: var(--main-text, #111827);
      font-size: 1.1rem;
    }

    .setting-section p {
      margin: 0 0 16px 0;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    select {
      min-width: 180px;
      padding: 10px 12px;
      border: 1px solid
        var(--border-colour, #d1d5db);
      border-radius: 8px;
      background-color: var(
        --card-background,
        #ffffff
      );
      color: var(--main-text, #111827);
      font-size: 0.95rem;
      cursor: pointer;
      outline: none;
    }

    select:focus {
      border-color: var(
        --accent-colour,
        #facc15
      );
    }

    .reset-section {
      margin-top: 30px;
      padding-top: 25px;
      border-top: 1px solid
        var(--border-colour, #e5e7eb);
    }

    .reset-title {
      margin: 0 0 6px 0;
      color: var(--main-text, #111827);
      font-size: 1.1rem;
    }

    .reset-description {
      margin: 0 0 16px 0;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    .reset-button {
      padding: 10px 16px;
      border: 1px solid
        var(--border-colour, #e5e7eb);
      border-radius: 8px;
      background-color: var(
        --card-background,
        #ffffff
      );
      color: var(--main-text, #111827);
      font-weight: bold;
      cursor: pointer;
    }

    .reset-button:hover {
      border-color: var(
        --accent-colour,
        #facc15
      );
    }

    @media (max-width: 700px) {
      .settings-panel {
        padding: 25px 20px;
      }

      .setting-section {
        padding: 20px;
      }

      select {
        width: 100%;
      }
    }
  `;

  constructor() {
    super();

    this.currency =
      localStorage.getItem(
        "cryptolens_currency",
      ) || "usd";

    this.marketLimit =
      localStorage.getItem(
        "cryptolens_market_limit",
      ) || "50";

    this.newsLimit =
      localStorage.getItem(
        "cryptolens_news_limit",
      ) || "12";
  }

  handleCurrencyChange(event) {
    this.currency = event.target.value;

    localStorage.setItem(
      "cryptolens_currency",
      this.currency,
    );
  }

  handleMarketLimitChange(event) {
    this.marketLimit = event.target.value;

    localStorage.setItem(
      "cryptolens_market_limit",
      this.marketLimit,
    );
  }

  handleNewsLimitChange(event) {
    this.newsLimit = event.target.value;

    localStorage.setItem(
      "cryptolens_news_limit",
      this.newsLimit,
    );
  }

  resetPreferences() {
    this.currency = "usd";
    this.marketLimit = "50";
    this.newsLimit = "12";

    localStorage.setItem(
      "cryptolens_currency",
      "usd",
    );

    localStorage.setItem(
      "cryptolens_market_limit",
      "50",
    );

    localStorage.setItem(
      "cryptolens_news_limit",
      "12",
    );

    localStorage.setItem(
      "cryptolens_theme",
      "light",
    );

    this.dispatchEvent(
      new CustomEvent("theme-change", {
        detail: {
          darkMode: false,
        },
        bubbles: true,
        composed: true,
      }),
    );

    window.location.reload();
  }

  render() {
    return html`
      <section class="settings-panel">
        <h2 class="settings-title">
          Settings
        </h2>

        <p class="settings-description">
          Customize your CryptoLens experience.
        </p>

        <div class="setting-section">
          <h3>Appearance</h3>

          <p>
            Choose how CryptoLens looks.
          </p>

          <toggle-theme></toggle-theme>
        </div>

        <div class="setting-section">
          <h3>Currency</h3>

          <p>
            Choose the currency used to display
            cryptocurrency market information.
          </p>

          <select
            .value=${this.currency}
            @change=${this.handleCurrencyChange}
          >
            <option value="usd">
              USD — US Dollar
            </option>

            <option value="aud">
              AUD — Australian Dollar
            </option>

            <option value="eur">
              EUR — Euro
            </option>

            <option value="gbp">
              GBP — British Pound
            </option>
          </select>
        </div>

        <div class="setting-section">
          <h3>Market Display</h3>

          <p>
            Choose how many cryptocurrencies appear
            on the Market page.
          </p>

          <select
            .value=${this.marketLimit}
            @change=${this.handleMarketLimitChange}
          >
            <option value="10">
              Top 10
            </option>

            <option value="25">
              Top 25
            </option>

            <option value="50">
              Top 50
            </option>
          </select>
        </div>

        <div class="setting-section">
          <h3>News Display</h3>

          <p>
            Choose how many news articles appear
            on the News page.
          </p>

          <select
            .value=${this.newsLimit}
            @change=${this.handleNewsLimitChange}
          >
            <option value="6">
              6 articles
            </option>

            <option value="9">
              9 articles
            </option>

            <option value="12">
              12 articles
            </option>
          </select>
        </div>

        <div class="reset-section">
          <h3 class="reset-title">
            Reset Preferences
          </h3>

          <p class="reset-description">
            Restore all CryptoLens settings to their
            default values.
          </p>

          <button
            class="reset-button"
            @click=${this.resetPreferences}
          >
            Reset to Defaults
          </button>
        </div>
      </section>
    `;
  }
}

customElements.define(
  "settings-page",
  SettingsPage,
);