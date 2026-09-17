import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class ToggleTheme extends LitElement {
  static properties = {
    darkMode: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
    }

    .theme-options {
      display: flex;
      gap: 12px;
      margin-top: 16px;
    }

    button {
      min-width: 110px;
      padding: 12px 20px;
      border: 1px solid
        var(--border-colour, #e5e7eb);
      border-radius: 8px;
      background-color: var(
        --page-background,
        #ffffff
      );
      color: var(--main-text, #111827);
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      border-color: var(
        --accent-colour,
        #facc15
      );
    }

    button.active {
      border-color: var(
        --accent-colour,
        #facc15
      );
      background-color: var(
        --accent-colour,
        #facc15
      );
      color: #111827;
    }

    @media (max-width: 500px) {
      .theme-options {
        flex-direction: column;
      }

      button {
        width: 100%;
      }
    }
  `;

  constructor() {
    super();

    const savedTheme =
      localStorage.getItem("cryptolens_theme");

    this.darkMode = savedTheme === "dark";
  }

  setTheme(darkMode) {
    this.darkMode = darkMode;

    localStorage.setItem(
      "cryptolens_theme",
      darkMode ? "dark" : "light",
    );

    this.dispatchEvent(
      new CustomEvent("theme-change", {
        detail: {
          darkMode: this.darkMode,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="theme-options">
        <button
          class=${!this.darkMode ? "active" : ""}
          @click=${() => this.setTheme(false)}
        >
          Light
        </button>

        <button
          class=${this.darkMode ? "active" : ""}
          @click=${() => this.setTheme(true)}
        >
          Dark
        </button>
      </div>
    `;
  }
}

customElements.define(
  "toggle-theme",
  ToggleTheme,
);