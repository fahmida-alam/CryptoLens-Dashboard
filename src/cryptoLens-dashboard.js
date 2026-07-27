import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

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
      justify-content: space-between;
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

    .theme-button {
      padding: 9px 14px;
      border: 1px solid var(--accent-colour);
      border-radius: 8px;
      background: transparent;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .theme-button:hover {
      background-color: var(--accent-colour);
      color: #111827;
    }

    nav {
      display: flex;
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
    }

    .nav-button:hover {
      color: var(--main-text);
    }

    .nav-button.active {
      color: var(--main-text);
      border-bottom-color: var(--accent-colour);
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
      padding: 40px;
      background-color: var(--card-background);
      border: 1px solid var(--border-colour);
      border-radius: 14px;
      box-sizing: border-box;
    }

    .page h2 {
      margin-top: 0;
      color: var(--main-text);
      font-size: 2rem;
    }

    .page p {
      max-width: 700px;
      line-height: 1.6;
    }

    .home-buttons {
      display: flex;
      gap: 12px;
      margin-top: 24px;
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

    .primary-button {
      border-color: var(--accent-colour);
      background-color: var(--accent-colour);
      color: #111827;
    }

    footer {
      padding: 18px;
      background-color: var(--header-background);
      color: white;
      text-align: center;
      border-top: 3px solid var(--accent-colour);
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

      main {
        padding: 20px 14px;
      }

      .page {
        padding: 25px 20px;
      }
    }
  `;

  constructor() {
    super();

    this.darkMode = false;
    this.activePage = "home";
  }

  connectedCallback() {
    super.connectedCallback();

    const savedTheme = localStorage.getItem("cryptolens_theme");

    this.darkMode = savedTheme === "dark";

    this.applyTheme();
  }

  updated(changedProperties) {
    if (changedProperties.has("darkMode")) {
      localStorage.setItem(
        "cryptolens_theme",
        this.darkMode ? "dark" : "light",
      );

      this.applyTheme();
    }
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }

  applyTheme() {
    this.classList.toggle("dark-mode", this.darkMode);

    document.body.style.margin = "0";

    document.body.style.backgroundColor = this.darkMode
      ? "#0f172a"
      : "#ffffff";
  }

  changePage(pageName) {
    this.activePage = pageName;
  }

  renderNavigationButton(pageName, buttonText) {
    const buttonClass =
      this.activePage === pageName
        ? "nav-button active"
        : "nav-button";

    return html`
      <button
        class=${buttonClass}
        @click=${() => this.changePage(pageName)}
      >
        ${buttonText}
      </button>
    `;
  }

  renderHomePage() {
    return html`
      <section class="page">
        <h2>Understand cryptocurrency more easily</h2>

        <p>
          Explore cryptocurrency prices, compare digital assets, discover
          trending coins and follow important crypto news in one place.
        </p>

        <div class="home-buttons">
          <button
            class="action-button primary-button"
            @click=${() => this.changePage("market")}
          >
            Explore Market
          </button>

          <button
            class="action-button"
            @click=${() => this.changePage("compare")}
          >
            Compare Coins
          </button>
        </div>
      </section>
    `;
  }

  renderPlaceholderPage(title, description) {
    return html`
      <section class="page">
        <h2>${title}</h2>
        <p>${description}</p>
      </section>
    `;
  }

  renderPage() {
    if (this.activePage === "market") {
      return this.renderPlaceholderPage(
        "Crypto Market",
        "The cryptocurrency market page will be added in the next commit.",
      );
    }

    if (this.activePage === "compare") {
      return this.renderPlaceholderPage(
        "Compare Coins",
        "The coin comparison feature will be added later.",
      );
    }

    if (this.activePage === "trending") {
      return this.renderPlaceholderPage(
        "Trending Coins",
        "Trending cryptocurrency data will appear here.",
      );
    }

    if (this.activePage === "news") {
      return this.renderPlaceholderPage(
        "Crypto News",
        "Recent cryptocurrency news will appear here.",
      );
    }

    if (this.activePage === "about") {
      return this.renderPlaceholderPage(
        "About CryptoLens",
        "CryptoLens helps users understand cryptocurrency market information.",
      );
    }

    return this.renderHomePage();
  }

  render() {
    return html`
      <header>
        <div class="brand">
          <img
            class="logo"
            src="../img/CryptoLens Icon.png"
            alt="CryptoLens logo"
          />

          <h1>CryptoLens</h1>
        </div>

        <button
          class="theme-button"
          @click=${this.toggleTheme}
        >
          ${this.darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <nav>
        ${this.renderNavigationButton("home", "Home")}
        ${this.renderNavigationButton("market", "Market")}
        ${this.renderNavigationButton("compare", "Compare")}
        ${this.renderNavigationButton("trending", "Trending")}
        ${this.renderNavigationButton("news", "News")}
        ${this.renderNavigationButton("about", "About")}
      </nav>

      <main>
        ${this.renderPage()}
      </main>

      <footer>
        CryptoLens Web Development Project &copy; 2026
      </footer>
    `;
  }
}

customElements.define(
  "crypto-lens-dashboard",
  CryptoLensDashboard,
);