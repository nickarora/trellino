TrelloClone.Views.Card = Backbone.CompositeView.extend({
	template: JST['card'],

	events: {
		'submit form': 'updateCard',
		'click .delete': 'deleteCard',
		"click .glyphicon": 'showModal',
		"click .block-page": 'hideModal',
		"drop": 'drop'
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render.bind(this));
	},

	updateCard: function(){
		event.preventDefault();
		
		var that = this;

		var params = $(event.target).serializeJSON();
		var updatedCard = this.model.set(params["edit"]);

		updatedCard.save({}, {
			success: function(){
				var selector = '.glyphicon';
				var subview = that.subviews()['.glyphicon'][0];
				that.removeSubview(selector, subview);
				that.$('.glyphicon').removeClass('disabled');
			}
		});
	},

	deleteCard: function() {
		this.model.destroy();
	},

	showModal: function(event){

		if ( this.$('.edit-delete-form').length > 0 ) {
			return;
		}

		var modalForm = new TrelloClone.Views.EditDeleteForm();
		this.addSubview('.glyphicon', modalForm);
		this.render();
	},

	hideModal: function(event){
		event.stopPropagation();
		if (event.relatedTarget && event.relatedTarget.type === "submit"){
			return;
		}

		var selector = '.glyphicon';
		var subview = this.subviews()['.glyphicon'][0];
		this.removeSubview(selector, subview);

		this.$('.glyphicon').removeClass('disabled');
	},

	render: function(){
		var content = this.template({ card: this.model });
		this.$el.html(content);
		this.$el.addClass('card');

		this.attachSubviews();
		return this;
	},

	drop: function(event, index, newlist){
		// newList.trigger('update-sort', [this.model, index]);
	}
});