import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class NewsPage extends LitElement {
  static properties = {
    articles: { state: true },
    loading: { state: true },
    errorMessage: { state: true },
    newsLimit: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      color: var(--body-text, #4b5563);
    }

    .news-panel {
      max-width: 1200px;
      margin: 0 auto;
      background-color: var(
        --card-background,
        #ffffff
      );
      border: 1px solid
        var(--border-colour, #e5e7eb);
      border-radius: 14px;
      overflow: hidden;
    }

    .news-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 24px;
      border-bottom: 1px solid
        var(--border-colour, #e5e7eb);
    }

    .news-title {
      margin: 0 0 6px 0;
      color: var(--main-text, #111827);
      font-size: 1.8rem;
    }

    .news-description {
      margin: 0;
      color: var(--body-text, #6b7280);
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .refresh-button {
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      background-color: var(
        --accent-colour,
        #facc15
      );
      color: #111827;
      font-weight: bold;
      cursor: pointer;
      white-space: nowrap;
    }

    .refresh-button:hover {
      background-color: #eab308;
    }

    .refresh-button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .news-grid {
      display: grid;
      grid-template-columns:
        repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      padding: 24px;
    }

    .news-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-color: var(
        --page-background,
        #f9fafb
      );
      border: 1px solid
        var(--border-colour, #e5e7eb);
      border-radius: 12px;
    }

    .news-image {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }

    .news-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 18px;
    }

    .article-title {
      margin: 0 0 10px 0;
      color: var(--main-text, #111827);
      font-size: 1.05rem;
      line-height: 1.4;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }

    .article-description {
      margin: 0 0 16px 0;
      color: var(--body-text, #6b7280);
      font-size: 0.9rem;
      line-height: 1.5;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }

    .article-source {
      margin-top: auto;
      margin-bottom: 12px;
      color: var(--body-text, #6b7280);
      font-size: 0.8rem;
    }

    .read-button {
      display: inline-block;
      padding: 9px 12px;
      border-radius: 7px;
      background-color: var(
        --accent-colour,
        #facc15
      );
      color: #111827;
      font-size: 0.85rem;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
    }

    .read-button:hover {
      background-color: #eab308;
    }

    .message {
      padding: 60px 20px;
      color: var(--body-text, #6b7280);
      text-align: center;
    }

    .error-message {
      color: #dc2626;
    }

    @media (max-width: 700px) {
      .news-header {
        flex-direction: column;
        align-items: stretch;
        padding: 20px 16px;
      }

      .news-grid {
        grid-template-columns: 1fr;
        padding: 16px;
      }

      .refresh-button {
        width: 100%;
      }
    }
  `;

  constructor() {
    super();

    this.articles = [];
    this.loading = true;
    this.errorMessage = "";

    this.newsLimit = Number(
      localStorage.getItem(
        "cryptolens_news_limit",
      ) || "12",
    );
  }

  connectedCallback() {
    super.connectedCallback();

    this.fetchNews();
  }

  fetchNews() {
    this.loading = true;
    this.errorMessage = "";

    fetch("/api/news")
      .then(function (res) {
        if (!res.ok) {
          throw new Error(
            `Request failed with status ${res.status}`,
          );
        }

        return res.json();
      })
      .then(
        function (json) {
          if (
            !json.results ||
            !Array.isArray(json.results)
          ) {
            throw new Error(
              "No news data was returned.",
            );
          }

          this.articles =
            json.results.slice(
              0,
              this.newsLimit,
            );

          this.loading = false;
        }.bind(this),
      )
      .catch(
        function (error) {
          console.error(
            "News data error:",
            error,
          );

          this.articles = [];

          this.errorMessage =
            "Could not load cryptocurrency news.";

          this.loading = false;
        }.bind(this),
      );
  }

  renderArticle(article) {
    return html`
      <article class="news-card">
        ${article.image_url
          ? html`
              <img
                class="news-image"
                src=${article.image_url}
                alt="News article"
              />
            `
          : ""}

        <div class="news-content">
          <h3 class="article-title">
            ${article.title}
          </h3>

          ${article.description
            ? html`
                <p class="article-description">
                  ${article.description}
                </p>
              `
            : ""}

          <div class="article-source">
            ${article.source_name ||
            article.source_id ||
            "Unknown source"}
          </div>

          <a
            class="read-button"
            href=${article.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Article
          </a>
        </div>
      </article>
    `;
  }

  renderContent() {
    if (this.loading) {
      return html`
        <div class="message">
          Loading cryptocurrency news...
        </div>
      `;
    }

    if (this.errorMessage) {
      return html`
        <div class="message error-message">
          ${this.errorMessage}
        </div>
      `;
    }

    if (this.articles.length === 0) {
      return html`
        <div class="message">
          No cryptocurrency news available.
        </div>
      `;
    }

    return html`
      <div class="news-grid">
        ${this.articles.map(
          (article) =>
            this.renderArticle(article),
        )}
      </div>
    `;
  }

  render() {
    return html`
      <div class="news-panel">
        <div class="news-header">
          <div>
            <h2 class="news-title">
              Crypto News
            </h2>

            <p class="news-description">
              Follow recent cryptocurrency news
              from sources around the world.
            </p>
          </div>

          <button
            class="refresh-button"
            ?disabled=${this.loading}
            @click=${this.fetchNews}
          >
            ${this.loading
              ? "Loading..."
              : "Refresh"}
          </button>
        </div>

        ${this.renderContent()}
      </div>
    `;
  }
}

customElements.define(
  "news-page",
  NewsPage,
);