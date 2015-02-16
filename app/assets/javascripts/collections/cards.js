TrelloClone.Collections.Cards = Backbone.Collection.extend({
	comparator: 'ord',
	
	model: TrelloClone.Models.Card,

	url: 'api/cards',

	initialize: function(options){
		this.list = options.list;
	}
	
});