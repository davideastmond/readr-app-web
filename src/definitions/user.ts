export interface ISecureUser {
  configuration: { topics: string[]; bookmarks: IArticleBookmark[] };
  countryCode: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface IArticleBookmark {
  url: string;
  title: string;
  source: { name: string; id: string };
  urlToImage: string;
  createdAt: string;
}
