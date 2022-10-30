import { INewsSource } from "../../definitions/user";

export const NEWS_SOURCE_HELPERS = {
  filterFromSourceList: (
    items: INewsSource[],
    sourceList: INewsSource[]
  ): INewsSource[] => {
    return sourceList.filter((sourceItem) => {
      return !items.some((s) => s.id === sourceItem.id);
    });
  },
  // Add an array of items to target list
  addToTargetList: (
    items: INewsSource[],
    targetedList: INewsSource[]
  ): INewsSource[] => {
    const sanitizedList = targetedList.filter((sourceItem) => {
      return !items.some((s) => s.id === sourceItem.id);
    });

    items.forEach((i) => {
      sanitizedList.push(i);
    });
    return sortItems(sanitizedList);
  },
};

const sortItems = (items: INewsSource[]): INewsSource[] => {
  return items.sort((a, b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });
};
