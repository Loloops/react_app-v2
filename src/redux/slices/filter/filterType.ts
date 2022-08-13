export interface IFilter {
  categoryValue: string
  currentPage: string
  sortProperty: string
}

export interface ISetFilterAction extends IFilter{
  sortObj: TInitSortObject
}

export type TInitSortObject = {
  name: string;
  sortProperty: string;
};

export interface IFilterInitState {
  searchValue: string;
  categoryValue: string;
  currentPage: string;
  sortObj: TInitSortObject;
}

export interface ISetFilter {
  categoryValue: string;
  currentPage: string;
  sortObj: TInitSortObject;
}
