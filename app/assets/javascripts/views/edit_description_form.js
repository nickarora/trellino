TrelloClone.Views.EditDescriptionForm = Backbone.CompositeView.extend({
	template: JST['edit_description_form'],

	render: function(){
		var content = this.template({
			card: this.model
		});
		this.$el.html(content);
		return this;
	}
});