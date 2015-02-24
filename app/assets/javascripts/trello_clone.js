window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	new TrelloClone.Routers.TrelloRouter({ root: $('#main') });
  	Backbone.history.start();
  	
  	if (TrelloClone.CURRENT_USER.email == 'guest@guest.com') {
  		Backbone.history.navigate("boards/1", {trigger: true});
  	}
  }
};