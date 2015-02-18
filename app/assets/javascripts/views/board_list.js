TrelloClone.Views.List = Backbone.CompositeView.extend({
	
	template: JST['list'],

	className: 'list',

	events: {
		"submit form.new-card-form": "createNewCard",
		"click .new-card-link": "showCardForm",
		"click .new-card .cancel": "hideCardForm",
		"blur .new-card textarea": "hideCardForm",
		"drop": "drop",
		"sortreceive": "receiveCard",
		'update-sort': 'updateSort'
	},

	initialize: function(){
		var cardCollection = this.model.cards();
		this.listenTo(this.model, 'sync', this.render.bind(this));
		this.listenTo(cardCollection, 'remove', this.removeCardSubview.bind(this));
		this.listenTo(cardCollection, 'add', this.addCardSubview.bind(this));
		
		cardCollection.each(function(card) {
			this.addCardSubview(card);
		}, this);

		var cardLinkView = new TrelloClone.Views.CardLink();
		this.addSubview('.new-card', cardLinkView);
	},

	createNewCard: function(event){
		event.preventDefault();

		var that = this;
		var cardCollection = this.model.cards();
		var params = $(event.currentTarget).serializeJSON();
		
		params["card"]["list_id"] = this.model.id;
		params["card"]["ord"] = cardCollection.length;
		params["card"]["description"] = "";
		
		var $input = this.$el.find('textarea')
		$input.val('');
		$input.focus();

		var newCard = new TrelloClone.Models.Card(params["card"]);

		newCard.save({}, {
			success: function(){
				cardCollection.add(newCard);
				Backbone.history.navigate("/boards/" + that.model.get('board_id'), { trigger: true });
			}
		});
	},

	showCardForm: function(event){
		event.preventDefault();
		var selector = '.new-card';
		var subview = this.subviews()['.new-card'][0];
		this.removeSubview(selector, subview);
		
		var cardForm = new TrelloClone.Views.CardForm();
		this.addSubview('.new-card', cardForm);
	},

	hideCardForm: function(event){
		event.preventDefault();
		if (event.relatedTarget && event.relatedTarget.type === "submit"){
			return;
		}
		var selector = '.new-card';
		var subview = this.subviews()['.new-card'][0];
		this.removeSubview(selector, subview);
		
		var cardLinkView = new TrelloClone.Views.CardLink();
		this.addSubview('.new-card', cardLinkView);
	},

	addCardSubview: function(card){
		var cardSubview = new TrelloClone.Views.Card({ model: card });
		this.addSubview('.cards', cardSubview);
	},

	removeCardSubview: function(card){
		var cardToRemove = card.id;
    var cardSubviews = this.subviews()['.cards'];
    var subviewToRemove = _.filter(cardSubviews, function(view) { return view.model.id == cardToRemove; } )[0];
    cardSubviews.splice(cardSubviews.indexOf(subviewToRemove), 1);
    this.render();    
	},

	render: function(){
		var content = this.template({ list: this.model });
		this.$el.html(content);
		this.attachSubviews();
		this.makeCardsSortable();
		return this;
	},

	drop: function(event, index){
		event.stopPropagation();
		$('.board').trigger('update-sort', [this.model, index]);
	},

	receiveCard: function(event, ui){
		event.stopPropagation();
		ui.item.trigger('move', this.model);
	},

	makeCardsSortable: function(){
		$('div.cards').sortable({
			connectWith: $('.cards'),
			stop: function(event, ui){
				ui.item.trigger('drop', ui.item.index());
			}
		});
	},

	updateSort: function(event, model, future) {
		event.stopPropagation();
		var that = this;

		var cardCollection = this.model.cards().models;
		var current = cardCollection.indexOf(model);
		var cardViews = this.subviews()['.cards'];

		if (current >= 0){
			var cardSubview = cardViews.splice(current, 1)[0];
			cardViews.splice(future, 0, cardSubview);
		} else {
			this.model.cards().add(model, { silent: true });
			current = cardCollection.indexOf(model);
			var cardSubview = new TrelloClone.Views.Card({ model: model });

			if (cardViews) {
				cardViews.splice(future, 0, cardSubview);
				cardSubview.render();	
			} else {
				this.addSubview('.cards', cardSubview);
			}	
		} 

		var swapCard = cardCollection.splice(current, 1)[0];
		cardCollection.splice(future, 0, swapCard);

		_.each(cardCollection, function(model, index){
			model.set('ord', index);
			model.save({}, {
				success: function(){
					that.render();
				}
			});
		});

	}

});