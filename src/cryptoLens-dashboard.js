import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import "./components/market-page.js";
import "./components/trending-page.js";
import "./components/compare-page.js";
import "./components/news-page.js";
import "./components/about-page.js";
import "./components/settings-page.js";

class CryptoLensDashboard extends LitElement {
  static properties = {
    darkMode: { type: Boolean },
    activePage: { type: String },
  };

  static styles = css`
    :host {
      --page-background: #ffffff;
      --header-background: #111827;
      --card-background: #ffffff;
      --main-text: #111827;
      --body-text: #4b5563;
      --border-colour: #e5e7eb;
      --accent-colour: #facc15;

      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--page-background);
      color: var(--body-text);
      font-family: Arial, Helvetica, sans-serif;
    }

    :host(.dark-mode) {
      --page-background: #0f172a;
      --header-background: #020617;
      --card-background: #1e293b;
      --main-text: #f8fafc;
      --body-text: #cbd5e1;
      --border-colour: #334155;
    }

    header {
      display: flex;
      align-items: center;
      padding: 18px 30px;
      background-color: var(--header-background);
      color: white;
      border-bottom: 3px solid var(--accent-colour);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo {
      width: 45px;
      height: 45px;
      object-fit: contain;
    }

    h1 {
      margin: 0;
      font-size: 1.8rem;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 0 30px;
      background-color: var(--card-background);
      border-bottom: 1px solid var(--border-colour);
      overflow-x: auto;
    }

    .nav-button {
      padding: 16px 18px;
      border: none;
      border-bottom: 3px solid transparent;
      background: transparent;
      color: var(--body-text);
      font-size: 0.95rem;
      font-weight: bold;
      cursor: pointer;
      white-space: nowrap;
    }

    .nav-button:hover {
      color: var(--main-text);
    }

    .nav-button.active {
      color: var(--main-text);
      border-bottom-color: var(--accent-colour);
    }

    .settings-button {
      margin-left: auto;
    }

    main {
      flex: 1;
      padding: 35px 30px;
      background-color: var(--page-background);
    }

    .page {
      max-width: 1200px;
      min-height: 400px;
      margin: 0 auto;
      box-sizing: border-box;
    }

    /*
     * HOME HERO
     */

    .home-hero {
      display: grid;
      grid-template-columns: 1.3fr 0.7fr;
      gap: 40px;
      align-items: center;
      padding: 55px 50px;
      background-color: var(--card-background);
      border: 1px solid var(--border-colour);
      border-radius: 16px;
    }

    .hero-label {
      display: inline-block;
      margin-bottom: 16px;
      color: var(--body-text);
      font-size: 0.85rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .hero-title {
      max-width: 650px;
      margin: 0;
      color: var(--main-text);
      font-size: 2.7rem;
      line-height: 1.15;
    }

    .hero-description {
      max-width: 650px;
      margin: 20px 0 0 0;
      color: var(--body-text);
      font-size: 1.05rem;
      line-height: 1.7;
    }

    .home-buttons {
      display: flex;
      gap: 12px;
      margin-top: 28px;
    }

    .action-button {
      padding: 12px 20px;
      border: 1px solid var(--border-colour);
      border-radius: 8px;
      background-color: var(--card-background);
      color: var(--main-text);
      font-weight: bold;
      cursor: pointer;
    }

    .action-button:hover {
      border-color: var(--accent-colour);
    }

    .primary-button {
      border-color: var(--accent-colour);
      background-color: var(--accent-colour);
      color: #111827;
    }

    .primary-button:hover {
      background-color: #eab308;
    }

    /*
     * HERO VISUAL
     */

    .hero-visual {
      padding: 28px;
      background-color: var(--page-background);
      border: 1px solid var(--border-colour);
      border-radius: 14px;
    }

    .visual-heading {
      margin: 0 0 20px 0;
      color: var(--main-text);
      font-size: 1rem;
    }

    .visual-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      padding: 14px 0;
      border-bottom: 1px solid var(--border-colour);
    }

    .visual-row:last-child {
      border-bottom: none;
    }

    .visual-label {
      color: var(--body-text);
      font-size: 0.9rem;
    }

    .visual-value {
      color: var(--main-text);
      font-size: 0.9rem;
      font-weight: bold;
      text-align: right;
    }

    .visual-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 7px;
      background-color: var(--accent-colour);
      border-radius: 50%;
    }

    /*
     * HOME FEATURES
     */

    .home-features {
      margin-top: 35px;
    }

    .features-heading {
      margin: 0 0 8px 0;
      color: var(--main-text);
      font-size: 1.6rem;
    }

    .features-description {
      margin: 0 0 22px 0;
      color: var(--body-text);
      line-height: 1.6;
    }

    .feature-grid {
      display: grid;
      grid-template-columns:
        repeat(4, minmax(0, 1fr));
      gap: 18px;
    }

    .feature-card {
      min-height: 160px;
      padding: 22px;
      background-color: var(--card-background);
      border: 1px solid var(--border-colour);
      border-radius: 12px;
      text-align: left;
      cursor: pointer;
      box-sizing: border-box;
    }

    .feature-card:hover {
      border-color: var(--accent-colour);
      transform: translateY(-2px);
    }

    .feature-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      margin-bottom: 18px;
      background-color: var(--accent-colour);
      border-radius: 9px;
      color: #111827;
      font-size: 1rem;
      font-weight: bold;
    }

    .feature-title {
      margin: 0 0 8px 0;
      color: var(--main-text);
      font-size: 1.05rem;
    }

    .feature-text {
      margin: 0;
      color: var(--body-text);
      font-size: 0.9rem;
      line-height: 1.5;
    }

    footer {
      padding: 18px;
      background-color: var(--header-background);
      color: white;
      text-align: center;
      border-top: 3px solid var(--accent-colour);
    }

    @media (max-width: 900px) {
      .home-hero {
        grid-template-columns: 1fr;
      }

      .hero-visual {
        max-width: 500px;
      }

      .feature-grid {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 650px) {
      header {
        padding: 14px 16px;
      }

      nav {
        padding: 0 8px;
      }

      .nav-button {
        padding: 14px 12px;
      }

      .settings-button {
        margin-left: 0;
      }

      main {
        padding: 20px 14px;
      }

      .home-hero {
        padding: 30px 22px;
        gap: 30px;
      }

      .hero-title {
        font-size: 2rem;
      }

      .home-buttons {
        flex-direction: column;
      }

      .action-button {
        width: 100%;
      }

      .hero-visual {
        padding: 20px;
      }

      .feature-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  constructor() {
    super();

    const savedTheme =
      localStorage.getItem("cryptolens_theme");

    this.darkMode = savedTheme === "dark";
    this.activePage = "home";
  }

  connectedCallback() {
    super.connectedCallback();

    this.applyTheme();
  }

  updated(changedProperties) {
    if (changedProperties.has("darkMode")) {
      this.applyTheme();
    }
  }

  handleThemeChange(event) {
    this.darkMode = event.detail.darkMode;
  }

  applyTheme() {
    this.classList.toggle(
      "dark-mode",
      this.darkMode,
    );

    document.body.style.margin = "0";

    document.body.style.backgroundColor =
      this.darkMode
        ? "#0f172a"
        : "#ffffff";
  }

  changePage(pageName) {
    this.activePage = pageName;
  }

  renderNavigationButton(
    pageName,
    buttonText,
    extraClass = "",
  ) {
    let buttonClass = "nav-button";

    if (this.activePage === pageName) {
      buttonClass += " active";
    }

    if (extraClass) {
      buttonClass += ` ${extraClass}`;
    }

    return html`
      <button
        class=${buttonClass}
        @click=${() =>
          this.changePage(pageName)}
      >
        ${buttonText}
      </button>
    `;
  }

  renderHomePage() {
    return html`
      <section class="page">
        <div class="home-hero">
          <div class="hero-content">
            <span class="hero-label">
              Cryptocurrency Market Dashboard
            </span>

            <h2 class="hero-title">
              Understand cryptocurrency
              more easily.
            </h2>

            <p class="hero-description">
              Explore live market data, compare
              cryptocurrencies, discover trending
              assets and follow recent crypto news
              from one simple dashboard.
            </p>

            <div class="home-buttons">
              <button
                class="action-button primary-button"
                @click=${() =>
                  this.changePage("market")}
              >
                Explore Market
              </button>

              <button
                class="action-button"
                @click=${() =>
                  this.changePage("compare")}
              >
                Compare Coins
              </button>
            </div>
          </div>

          <div class="hero-visual">
            <h3 class="visual-heading">
              Your crypto market overview
            </h3>

            <div class="visual-row">
              <span class="visual-label">
                <span class="visual-dot"></span>
                Market
              </span>

              <span class="visual-value">
                Live prices
              </span>
            </div>

            <div class="visual-row">
              <span class="visual-label">
                <span class="visual-dot"></span>
                Compare
              </span>

              <span class="visual-value">
                Side by side
              </span>
            </div>

            <div class="visual-row">
              <span class="visual-label">
                <span class="visual-dot"></span>
                Trending
              </span>

              <span class="visual-value">
                Popular assets
              </span>
            </div>

            <div class="visual-row">
              <span class="visual-label">
                <span class="visual-dot"></span>
                News
              </span>

              <span class="visual-value">
                Recent stories
              </span>
            </div>
          </div>
        </div>

        <div class="home-features">
          <h2 class="features-heading">
            Explore CryptoLens
          </h2>

          <p class="features-description">
            Use the tools below to explore the
            cryptocurrency market.
          </p>

          <div class="feature-grid">
            <div
              class="feature-card"
              @click=${() =>
                this.changePage("market")}
            >
              <div class="feature-icon">
                $
              </div>

              <h3 class="feature-title">
                Market
              </h3>

              <p class="feature-text">
                View cryptocurrency prices,
                market caps, trading volume
                and 24-hour changes.
              </p>
            </div>

            <div
              class="feature-card"
              @click=${() =>
                this.changePage("compare")}
            >
              <div class="feature-icon">
                ↔
              </div>

              <h3 class="feature-title">
                Compare
              </h3>

              <p class="feature-text">
                Compare two cryptocurrencies
                side by side using current
                market information.
              </p>
            </div>

            <div
              class="feature-card"
              @click=${() =>
                this.changePage("trending")}
            >
              <div class="feature-icon">
                ↑
              </div>

              <h3 class="feature-title">
                Trending
              </h3>

              <p class="feature-text">
                Discover cryptocurrencies
                currently attracting attention
                in the market.
              </p>
            </div>

            <div
              class="feature-card"
              @click=${() =>
                this.changePage("news")}
            >
              <div class="feature-icon">
                N
              </div>

              <h3 class="feature-title">
                News
              </h3>

              <p class="feature-text">
                Follow recent cryptocurrency
                stories from sources around
                the world.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderPage() {
    if (this.activePage === "market") {
      return html`
        <market-page></market-page>
      `;
    }

    if (this.activePage === "compare") {
      return html`
        <compare-page></compare-page>
      `;
    }

    if (this.activePage === "trending") {
      return html`
        <trending-page></trending-page>
      `;
    }

    if (this.activePage === "news") {
      return html`
        <news-page></news-page>
      `;
    }

    if (this.activePage === "about") {
      return html`
        <about-page></about-page>
      `;
    }

    if (this.activePage === "settings") {
      return html`
        <settings-page
          @theme-change=${this.handleThemeChange}
        ></settings-page>
      `;
    }

    return this.renderHomePage();
  }

  render() {
    return html`
      <header>
        <div class="brand">
          <img
            class="logo"
            src="./img/CryptoLens_Icon.png"
            alt="CryptoLens logo"
          />

          <h1>CryptoLens</h1>
        </div>
      </header>

      <nav>
        ${this.renderNavigationButton(
          "home",
          "Home",
        )}

        ${this.renderNavigationButton(
          "market",
          "Market",
        )}

        ${this.renderNavigationButton(
          "compare",
          "Compare",
        )}

        ${this.renderNavigationButton(
          "trending",
          "Trending",
        )}

        ${this.renderNavigationButton(
          "news",
          "News",
        )}

        ${this.renderNavigationButton(
          "about",
          "About",
        )}

        ${this.renderNavigationButton(
          "settings",
          "Settings",
          "settings-button",
        )}
      </nav>

      <main>
        ${this.renderPage()}
      </main>

      <footer>
        CryptoLens &copy; 2026
      </footer>
    `;
  }
}

customElements.define(
  "crypto-lens-dashboard",
  CryptoLensDashboard,
);