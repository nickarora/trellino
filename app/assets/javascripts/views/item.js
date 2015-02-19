TrelloClone.Views.Item = Backbone.CompositeView.extend({
	template: JST['item'],
	className: 'item',

	events: {
		'click .square': 'toggleDone',
		'click .delete-item': 'deleteItem'
	},

	initialize: function(){
		this.listenTo(this.model, 'change sync', this.render);
	},

	toggleDone: function(event){
		var that = this;

		if (this.model.get('done')){
			this.model.set('done', false);	
		} else {
			this.model.set('done', true);	
		}

		this.model.save({});
	},

	deleteItem: function(event){
		this.model.destroy();
	},

	render: function(){
		var content = this.template({ item: this.model });
		this.$el.html(content);
		return this;
	}
});