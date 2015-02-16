window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	new TrelloClone.Routers.TrelloRouter({ root: $('#main') });
  	Backbone.history.start();
  }
};