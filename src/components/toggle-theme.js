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
    button {
      padding: 9px 14px;
      border: 1px solid var(--accent-colour, #facc15);
      border-radius: 8px;
      background: transparent;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      background-color: var(--accent-colour, #facc15);
      color: #111827;
    }
  `;

  constructor() {
    super();

    const savedTheme = localStorage.getItem("cryptolens_theme");

    this.darkMode = savedTheme === "dark";
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;

    localStorage.setItem(
      "cryptolens_theme",
      this.darkMode ? "dark" : "light",
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
      <button @click=${this.toggleTheme}>
        ${this.darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    `;
  }
}

customElements.define("toggle-theme", ToggleTheme);