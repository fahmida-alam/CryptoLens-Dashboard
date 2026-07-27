import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class CryptoLensDashboard extends LitElement {
  static properties = {
    header: { type: String },
    activePage: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: 100%;
      font-family: Arial, sans-serif;
      color: #374151;
      background-color: #f9fafb;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 40px;
      background-color: #111827;
      color: white;
      border-bottom: 3px solid #facc15;
    }

    .logo {
      margin: 0;
      font-size: 32px;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    nav button {
      padding: 10px 14px;
      font-size: 15px;
      color: white;
      background-color: transparent;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    nav button:hover {
      color: #111827;
      background-color: #facc15;
    }

    nav button.active {
      color: #111827;
      background-color: #facc15;
    }

    main {
      flex: 1;
      padding: 60px 40px;
    }

    .page-content {
      max-width: 1000px;
      margin: 0 auto;
      text-align: center;
    }

    .page-content h2 {
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 42px;
      color: #111827;
    }

    .page-content p {
      font-size: 18px;
      line-height: 1.7;
      color: #4b5563;
    }

    footer {
      padding: 18px;
      text-align: center;
      background-color: #111827;
      color: white;
      border-top: 3px solid #facc15;
      font-size: 14px;
    }

    @media (max-width: 850px) {
      header {
        flex-direction: column;
        gap: 18px;
        padding: 20px;
      }

      nav {
        flex-wrap: wrap;
        justify-content: center;
      }

      main {
        padding: 40px 20px;
      }

      .page-content h2 {
        font-size: 32px;
      }
    }
  `;

  constructor() {
    super();

    this.header = "CryptoLens";
    this.activePage = "home";
  }

  changePage(pageName) {
    this.activePage = pageName;
  }

  renderPage() {
    if (this.activePage === "market") {
      return html`
        <section class="page-content">
          <h2>Cryptocurrency Market</h2>
          <p>
            View cryptocurrency prices, market capitalisation, trading volume,
            and price movements.
          </p>
        </section>
      `;
    }

    if (this.activePage === "compare") {
      return html`
        <section class="page-content">
          <h2>Compare Coins</h2>
          <p>
            Compare the prices and market performance of different
            cryptocurrencies.
          </p>
        </section>
      `;
    }

    if (this.activePage === "trending") {
      return html`
        <section class="page-content">
          <h2>Trending Coins</h2>
          <p>
            Discover which cryptocurrencies are currently receiving the most
            attention.
          </p>
        </section>
      `;
    }

    if (this.activePage === "news") {
      return html`
        <section class="page-content">
          <h2>Crypto News</h2>
          <p>
            Read recent news and updates from the cryptocurrency industry.
          </p>
        </section>
      `;
    }

    if (this.activePage === "about") {
      return html`
        <section class="page-content">
          <h2>About CryptoLens</h2>
          <p>
            CryptoLens is a cryptocurrency information website designed to
            make market data easier to understand.
          </p>
        </section>
      `;
    }

    return html`
      <section class="page-content">
        <h2>Understand the cryptocurrency market</h2>

        <p>
          Explore cryptocurrency prices, compare coins, discover trending
          assets, and read the latest crypto news in one place.
        </p>
      </section>
    `;
  }

  render() {
    return html`
      <header>
        <h1 class="logo">${this.header}</h1>

        <nav>
          <button
            class=${this.activePage === "home" ? "active" : ""}
            @click=${() => this.changePage("home")}
          >
            Home
          </button>

          <button
            class=${this.activePage === "market" ? "active" : ""}
            @click=${() => this.changePage("market")}
          >
            Market
          </button>

          <button
            class=${this.activePage === "compare" ? "active" : ""}
            @click=${() => this.changePage("compare")}
          >
            Compare
          </button>

          <button
            class=${this.activePage === "trending" ? "active" : ""}
            @click=${() => this.changePage("trending")}
          >
            Trending
          </button>

          <button
            class=${this.activePage === "news" ? "active" : ""}
            @click=${() => this.changePage("news")}
          >
            News
          </button>

          <button
            class=${this.activePage === "about" ? "active" : ""}
            @click=${() => this.changePage("about")}
          >
            About
          </button>
        </nav>
      </header>

      <main>
        ${this.renderPage()}
      </main>

      <footer>
        Fahmida Alam Web Development Project &copy; 2026
      </footer>
    `;
  }
}

customElements.define("crypto-lens-dashboard", CryptoLensDashboard);