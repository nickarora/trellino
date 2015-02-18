TrelloClone.Views.EditDeleteForm = Backbone.CompositeView.extend({
	template: JST['edit_delete_form'],

	className: 'edit-delete-modal',

	initialize: function(options){
		$('body').on('click', '.block-page', this.hideModal.bind(this));
		this.card = options.sourceCard
	},

	events: {
		
	},

	hideModal: function(event){
		this.card.$el.trigger('hideModal');
	},
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this;
	}
});