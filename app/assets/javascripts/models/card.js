TrelloClone.Models.Card = Backbone.Model.extend({
	
	urlRoot: 'api/cards',

	items: function() {
		this._items = this._items || new TrelloClone.Collections.Items();
		return this._items;
	},

	parse: function(payload) {

		if (payload.items) {
			this.items().set(payload.items, { parse: true } );
			delete payload.items;
		}
		
		return payload;
	}


});