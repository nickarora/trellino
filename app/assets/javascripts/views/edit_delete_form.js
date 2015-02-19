TrelloClone.Views.EditDeleteForm = Backbone.CompositeView.extend({
	template: JST['edit_delete_form'],

	className: 'edit-delete-modal',

	initialize: function(options){
		$('body').on('click', '.block-page', this.hideModal.bind(this));
		this.card = options.sourceCard
	},

	events: {
		'click .submit': 'submitHandler',
		'click .delete': 'deleteHandler'
	},

	hideModal: function(event){
		this.card.$el.trigger('hideModal');
	},

	submitHandler: function(event){
		event.preventDefault();
		this.card.updateCard(event);
	},

	deleteHandler: function(event){
		event.preventDefault();
		this.card.deleteCard();
	},
	
	render: function(){
		var content = this.template({
			card: this.model
		});
		this.$el.html(content);
		return this;
	}
});