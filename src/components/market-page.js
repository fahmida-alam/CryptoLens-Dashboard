import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class MarketPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .market-page {
      padding: 30px;
      background-color: var(--card-background, #ffffff);
      border: 1px solid var(--border-colour, #e5e7eb);
      border-radius: 14px;
    }

    h2 {
      margin-top: 0;
      margin-bottom: 10px;
      color: var(--main-text, #111827);
      font-size: 2rem;
    }

    p {
      margin: 0;
      color: var(--body-text, #4b5563);
      line-height: 1.6;
    }
  `;

  render() {
    return html`
      <section class="market-page">
        <h2>Crypto Market</h2>

        <p>
          This page will display the latest cryptocurrency prices,
          market ranks, market capitalisation and 24-hour changes.
        </p>
      </section>
    `;
  }
}

customElements.define("market-page", MarketPage);