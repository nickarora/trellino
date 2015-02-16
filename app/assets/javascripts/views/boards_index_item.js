TrelloClone.Views.BoardsIndexItem = Backbone.CompositeView.extend({
	template: JST['boards_index_item'],

	render: function(){
		var content = this.template({ board: this.model });
		this.$el.html(content);

		return this;
	}

});