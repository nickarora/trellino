TrelloClone.Views.ItemForm = Backbone.CompositeView.extend({
	template: JST['new_item_form'],

	render: function(){
		var content = this.template();
		this.$el.html(content);
		
		return this;
	}
});