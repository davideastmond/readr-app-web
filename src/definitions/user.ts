export interface ISecureUser {
  configuration: {
    topics: string[];
    bookmarks: IArticleBookmark[];
    sources: {
      option: TCustomSourceFilter;
      list: INewsSource[];
    };
  };
  countryCode: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface INewsSourcePatchRequestData {
  option: TCustomSourceFilter;
  list: INewsSource[];
}
export type TCustomSourceFilter = "none" | "onlyInclude" | "onlyExclude";
export interface INewsSource {
  name: string;
  id: string;
}
export interface IArticleBookmark {
  url: string;
  title: string;
  source: { name: string; id: string };
  urlToImage: string;
  createdAt: string;
}

export interface IUserEmailResponse {
  _id: string;
  email: string;
}
