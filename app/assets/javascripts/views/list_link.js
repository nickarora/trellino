TrelloClone.Views.ListLink = Backbone.CompositeView.extend({
	template: JST['new_list_link'],

	render: function(){
		var content = this.template();
		this.$el.html(content);
		
		return this;
	}
});