TrelloClone.Collections.Items = Backbone.Collection.extend({
	
	model: TrelloClone.Models.Item,

	url: 'api/items'
	
});