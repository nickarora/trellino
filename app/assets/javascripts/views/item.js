TrelloClone.Views.Item = Backbone.CompositeView.extend({
	template: JST['item'],
	className: 'item',
	render: function(){
		var content = this.template({ item: this.model });
		this.$el.html(content);
		return this;
	}
});