TrelloClone.Views.Card = Backbone.CompositeView.extend({
	template: JST['card'],

	events: {
		'submit form': 'updateCard',
		'click .delete': 'deleteCard',
		"click .glyphicon": 'showModal',
		'hideModal': 'hideModal',
		"drop": "drop",
		"move": "moveCard"

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
			}
		});
	},

	deleteCard: function() {
		this.model.destroy();
	},

	showModal: function(event){
		var modalForm = new TrelloClone.Views.EditDeleteForm({
			sourceCard: this
		});
		$('body').prepend(modalForm.render().$el)
	},

	hideModal: function(event){
		$('.edit-delete-modal').remove();
	},

	render: function(){
		var content = this.template({ card: this.model });
		this.$el.html(content);
		this.$el.addClass('card');

		this.attachSubviews();
		return this;
	},

	moveCard: function(event, futureList){
		event.stopPropagation();

		var newCard = new TrelloClone.Models.Card({
      title: this.model.get('title'),
      list_id: futureList.id,
      ord: futureList.cards().length,
      description: this.model.get('description')
    });

		this.model.destroy();
    this.model = newCard;
	},

	drop: function(event, index){
		event.stopPropagation();
		var that = this;

		if (this.model.id) {
			$card = $(event.currentTarget)
			$list = $card.parent().parent();
			$list.trigger('update-sort', [that.model, index]);	
		} else {
			this.model.save({},{
				success: function(){
					$card = $(event.currentTarget)
					$list = $card.parent().parent();
					$list.trigger('update-sort', [that.model, index]);		
				}
			});	
		}
	}

});