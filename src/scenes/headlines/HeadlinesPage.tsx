import { INewsArticleAPIResponse } from "../../definitions/news-article.types";
import { BaseClient } from "../../services/client/base-client";
import { useState, useEffect } from "react";
import { Spinner } from "../../components/spinner";
import { NewsArticleCard } from "../../components/news-article/card/NewsArticleCard";
import "./style.css";

function HeadlinesPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] =
    useState<INewsArticleAPIResponse | null>(null);

  const fetchHeadlines = async () => {
    setIsLoading(true);
    const client = new BaseClient();
    const data = await client.getData<INewsArticleAPIResponse>(
      "/news/headlines"
    );
    setApiResponse(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHeadlines();
  }, []);
  return (
    <div className="HeadlinesPage__main">
      {isLoading && <Spinner marginTop="10px" />}
      <div className="HeadlinesPage_Articles__Container">
        {apiResponse &&
          apiResponse.articles.map((article, index) => (
            <NewsArticleCard
              article={article}
              key={`idx-${index}-${article.url}`}
            />
          ))}
      </div>
    </div>
  );
}

export default HeadlinesPage;
