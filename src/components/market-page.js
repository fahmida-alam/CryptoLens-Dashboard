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
  `;

  render() {
    return html`
      <h2>Market Page</h2>

      <p>This page will display the Top 100 cryptocurrencies.</p>
    `;
  }
}

customElements.define("market-page", MarketPage);