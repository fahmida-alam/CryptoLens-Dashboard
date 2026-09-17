import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class AboutPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: var(--body-text, #4b5563);
    }

    .about-panel {
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

    .about-title {
      margin: 0 0 18px 0;
      color: var(--main-text, #111827);
      font-size: 1.8rem;
    }

    .about-text {
      max-width: 800px;
      margin: 0 0 18px 0;
      line-height: 1.7;
    }

    .developer-section {
      margin-top: 35px;
      padding-top: 25px;
      border-top: 1px solid
        var(--border-colour, #e5e7eb);
    }

    .developer-section h3 {
      margin: 0 0 10px 0;
      color: var(--main-text, #111827);
      font-size: 1.2rem;
    }

    .developer-text {
      max-width: 750px;
      margin: 0;
      line-height: 1.6;
    }

    .developer-name {
      color: var(--main-text, #111827);
      font-weight: bold;
    }

    .profile-links {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .profile-link {
      display: inline-block;
      padding: 10px 18px;
      border: 1px solid
        var(--border-colour, #e5e7eb);
      border-radius: 8px;
      background-color: var(
        --page-background,
        #f9fafb
      );
      color: var(--main-text, #111827);
      font-size: 0.9rem;
      font-weight: bold;
      text-decoration: none;
    }

    .profile-link:hover {
      border-color: var(
        --accent-colour,
        #facc15
      );
    }

    .disclaimer {
      margin-top: 35px;
      padding: 18px 20px;
      background-color: var(
        --page-background,
        #f9fafb
      );
      border-left: 4px solid
        var(--accent-colour, #facc15);
      border-radius: 6px;
      line-height: 1.6;
      font-size: 0.9rem;
    }

    @media (max-width: 700px) {
      .about-panel {
        padding: 25px 20px;
      }

      .profile-links {
        flex-direction: column;
      }

      .profile-link {
        text-align: center;
      }
    }
  `;

  render() {
    return html`
      <section class="about-panel">
        <h2 class="about-title">
          About CryptoLens
        </h2>

        <p class="about-text">
          CryptoLens is a cryptocurrency market
          dashboard designed to make digital asset
          information easier to explore and understand.
        </p>

        <p class="about-text">
          It brings together live market data,
          cryptocurrency comparisons, trending assets
          and recent crypto news in one simple
          interface.
        </p>

        <p class="about-text">
          CryptoLens was created as an independent
          project focused on providing a clean and
          accessible way to explore cryptocurrency
          market information.
        </p>

        <div class="developer-section">
          <h3>Developer</h3>

          <p class="developer-text">
            Designed and developed by
            <span class="developer-name">
              Fahmida Alam
            </span>
          </p>

          <div class="profile-links">
            <a
              class="profile-link"
              href="https://github.com/fahmida-alam"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              class="profile-link"
              href="https://www.linkedin.com/in/fahmida-alam-409089264"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div class="disclaimer">
          Cryptocurrency information displayed on
          CryptoLens is provided for informational
          purposes only and should not be considered
          financial advice.
        </div>
      </section>
    `;
  }
}

customElements.define(
  "about-page",
  AboutPage,
);