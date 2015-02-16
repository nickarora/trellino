TrelloClone.Views.CardForm = Backbone.CompositeView.extend({
	template: JST['new_card_form'],

	render: function(){
		var content = this.template();
		this.$el.html(content);
		
		return this;
	}
});