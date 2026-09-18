export async function onRequestGet(context) {
  try {
    const apiKey =
      context.env.NEWSDATA_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error:
            "NewsData API key is not configured.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type":
              "application/json",
          },
        },
      );
    }

    const newsUrl =
      "https://newsdata.io/api/1/crypto" +
      `?apikey=${apiKey}`;

    const response = await fetch(newsUrl);

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error:
            "Could not retrieve cryptocurrency news.",
        }),
        {
          status: response.status,
          headers: {
            "Content-Type":
              "application/json",
          },
        },
      );
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          "Content-Type":
            "application/json",
        },
      },
    );
  } catch (error) {
    console.error(
      "News API error:",
      error,
    );

    return new Response(
      JSON.stringify({
        error:
          "Could not load cryptocurrency news.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type":
            "application/json",
        },
      },
    );
  }
}