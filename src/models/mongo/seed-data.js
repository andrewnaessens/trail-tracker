export const seedData = {
  users: {
    _model: "User",
    admin: {
    firstName: "admin",
    lastName: "account",
    email: "admin@simpson.com",
    password: "secret"
    },
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  categories: {
    _model: "Category",
    easy: {
      title: "Easy",
      userid: "->users.bart"
    },
    medium: {
      title: "Medium",
      userid: "->users.bart"
    }, 
    difficult: {
      title: "Difficult",
      userid: "->users.bart"
    }
  },
  trails: {
    _model : "Trail",
    trail_1 : {
      title: "Coumshingaun Lough",
      description: "Difficult loop trail of Coumshingaun lough.",
      location: "Co. Waterford",
      lattitude: 52.2503,
      longitude: 7.5247,
      distance: 7.5,
      categoryid: "->categories.difficult"
    },
    trail_2 : {
      title: "Errigal",
      description: "Difficult mountain trail to the summit of Errigal",
      location: "Co. Donegal",
      lattitude: 55.0343,
      longitude: 8.1130,
      distance: 5.3,
      categoryid: "->categories.difficult"
    },
    trail_3 : {
      title: "Slieve Bloom Way",
      description: "Difficult four day hike through the Slieve Bloom Mountains.",
      location: "Co. Laois",
      lattitude: 53.0744,
      longitude: 7.6134,
      distance: 71.4,
      categoryid: "->categories.difficult"
    },
    trail_4 : {
      title: "Nore Valley Walk",
      description: "Easy trail from Kilkenny to Bennettsbridge.",
      location: "Co. Kilkenny",
      lattitude: 52.6549,
      longitude: 7.2464,
      distance: 8.2,
      categoryid: "->categories.easy"
    },
    trail_5 : {
      title: "Spinc and Wicklow Way Glendalough",
      description: "Medium looped trail.",
      location: "Co. Wicklow",
      lattitude: 53.007289,
      longitude: -6.343896,
      distance: 10.7,
      categoryid: "->categories.medium"
    },
  }
};
