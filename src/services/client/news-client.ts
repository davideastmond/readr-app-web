import { INewsArticleAPIResponse } from "../../definitions/news-article.types";
import { BaseClient } from "./base-client";

export class NewsClient extends BaseClient {
  public async fetchHeadlines(): Promise<INewsArticleAPIResponse> {
    return this.getData<INewsArticleAPIResponse>("/news/headlines");
  }

  public async getNewsSources(): Promise<{ [keyof: string]: string }> {
    return this.getData<{ [keyof: string]: string }>("/news/sources");
  }
}
