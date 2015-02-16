TrelloClone.Views.EditDeleteForm = Backbone.CompositeView.extend({
	template: JST['edit_delete_form'],

	events: {
		
	},
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		
		return this;
	}
});