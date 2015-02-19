TrelloClone.Views.EditDescriptionLink = Backbone.CompositeView.extend({
	template: JST['edit_description_link'],

	render: function(){
		var content = this.template({
			card: this.model
		});
		this.$el.html(content);
		
		return this;
	}
});