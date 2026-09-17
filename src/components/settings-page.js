import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import "./toggle-theme.js";

class SettingsPage extends LitElement {
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
      margin: 0;
      line-height: 1.6;
    }

    .setting-section {
      margin-top: 30px;
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
      margin: 0;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    @media (max-width: 700px) {
      .settings-panel {
        padding: 25px 20px;
      }

      .setting-section {
        padding: 20px;
      }
    }
  `;

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
            Choose the appearance you prefer while
            using CryptoLens.
          </p>

          <toggle-theme></toggle-theme>
        </div>
      </section>
    `;
  }
}

customElements.define(
  "settings-page",
  SettingsPage,
);