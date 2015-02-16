TrelloClone.Views.CardLink = Backbone.CompositeView.extend({
	template: JST['new_card_link'],

	render: function(){
		var content = this.template();
		this.$el.html(content);
		
		return this;
	}
});