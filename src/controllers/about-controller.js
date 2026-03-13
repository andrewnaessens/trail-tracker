export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About TrailTracker",
      };
      return h.view("about-view", viewData);
    },
  },
};
