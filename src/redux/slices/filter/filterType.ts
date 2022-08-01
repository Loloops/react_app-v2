export type TInitSortObject = {
  name: string;
  sortProperty: string;
};

export interface IFilterInitState {
  searchValue: string;
  categoryValue: number;
  currentPage: string;
  sortObj: TInitSortObject;
}
