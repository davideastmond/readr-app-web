export interface ISecureUser {
  configuration: {
    topics: string[];
    bookmarks: IArticleBookmark[];
    pageSize: IPageSizeData;
    sources: INewsSourcesUserData;
  };
  countryCode: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface INewsSourcesUserData {
  option: TCustomSourceFilter;
  list: INewsSource[];
}
export interface IPageSizeData {
  headlines: number;
  feed: number;
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
