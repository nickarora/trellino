TrelloClone.Views.BoardsNew = Backbone.CompositeView.extend({
	template: JST['new_board_form'],
	tagName: 'form',

	render: function(){
		var content = this.template();
		this.$el.html(content);
		
		return this;
	}
});