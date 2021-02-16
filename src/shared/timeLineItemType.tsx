
export type timeLineitemType =  {
    datetime : string;
    topic : string;
    content : string;
  }

export type EventHandler = {
    handler: (event: timeLineitemType) =>  void
    showHandler: (show: boolean) => void
  };

export type ReportType = {
  author : string;
  report : string;
  type : string;
};

export const ItemTypes = {
  CARD: 'card'
};