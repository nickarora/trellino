TrelloClone.Views.List = Backbone.CompositeView.extend({
	
	template: JST['list'],

	events: {
		"submit form.new-card-form": "createNewCard",
		"click .new-card-link": "showCardForm",
		"click .new-card .cancel": "hideCardForm",
		"blur .new-card textarea": "hideCardForm",
		"drop": 'drop',
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
		this.$el.addClass('list');
		this.attachSubviews();
		
		return this;
	},

	drop: function(event, index){
		$('.board').trigger('update-sort', [this.model, index]);
	},

	updateSort: function(event, model, future){
		debugger
	}

});