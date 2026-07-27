import { LitElement, html } from "lit";

class CryptoLensDashboard extends LitElement {
  render() {
    return html`
      <h1>CryptoLens Dashboard</h1>
    `;
  }
}

customElements.define(
  "crypto-lens-dashboard",
  CryptoLensDashboard
);