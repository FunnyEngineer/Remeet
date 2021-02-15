

export type timeLineitemType =  {
    datetime : string;
    topic : string;
    content : string;
  }

export type EventHandler = {
    handler: (event: timeLineitemType) =>  void
  };

export type ReportType = {
  author : string;
  report : string;
  type : string;
};