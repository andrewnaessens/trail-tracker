export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
};

export type Category = {
  title: string;
  userid: User["_id"] | string;
  img: string;
  _id: string;
  // user: User | string;
  trails: Trail | any;
  // trails: Trail["_id"] | string;
};

export interface Trail {
  title: string;
  description: string;
  location: string;
  lattitude: number;
  longitude: number;
  distance: number;
  _id: any;
  // category: Category | any;
  // user: User | string;
  categoryid: Category["_id"] | string;
  // userid: User["_id"] | string;
  img?: string[];
}

export type Db = {
  userStore: any;
  categoryStore: any;
  trailStore: any;
};
