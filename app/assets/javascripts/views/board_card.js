TrelloClone.Views.Card = Backbone.CompositeView.extend({
	template: JST['card'],
	className: 'card',

	events: {
		"click .glyphicon": 'showModal',
		'hideModal': 'hideModal',
		"hideCardShow": "hideCardShow",
		"drop": "drop",
		"move": "moveCard",
		"click": "showCard"

	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render.bind(this));
	},

	updateCard: function(event){
		event.preventDefault();
		this.hideModal();
		var params = $(event.target.parentElement.parentElement).serializeJSON();
		var updatedCard = this.model.set(params["edit"]);

		updatedCard.save({});
	},

	showCard: function(event){
		var cardView = new TrelloClone.Views.CardShow({
			sourceCard: this,
			model: this.model
		});
		$('body').css('overflow', 'hidden');
		$('body').prepend(cardView.render().$el)
	},

	deleteCard: function() {
		this.hideModal();
		this.model.destroy();
	},

	showModal: function(event){
		event.stopPropagation();
		var modalForm = new TrelloClone.Views.EditDeleteForm({
			sourceCard: this,
			model: this.model
		});
		$('body').prepend(modalForm.render().$el)
	},

	hideModal: function(event){
		$('.edit-delete-modal').remove();
	},

	hideCardShow: function(event){
		$('body').css('overflow', 'auto');
		$('.card-show').remove();
	},

	render: function(){
		var content = this.template({ card: this.model });
		this.$el.html(content);
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