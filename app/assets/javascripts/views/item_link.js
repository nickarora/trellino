TrelloClone.Views.ItemLink = Backbone.CompositeView.extend({
	template: JST['new_item_link'],

	render: function(){
		var content = this.template();
		this.$el.html(content);
		
		return this;
	}
});