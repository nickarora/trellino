TrelloClone.Views.CardShow = Backbone.CompositeView.extend({
	
	template: JST['card_show'],
	className: 'card-show',
	
	initialize: function(options){
		$('body').on('click', '.block-page', this.hideCardShow.bind(this));
		this.listenTo(this.model.items(), 'remove', this.removeItemView.bind(this));
		this.card = options.sourceCard

		var editLinkView = new TrelloClone.Views.EditDescriptionLink({
			model: this.model
		});
		this.addSubview('.edit-description', editLinkView);

		this.model.items().each(function(item){
			this.addItemView(item);
		}, this);
	},

	events: {
		"click .edit-description-form .submit": "updateDescription",
		'click .cancel-card-show': 'hideCardShow',
		'click .edit-description-link': 'showEditForm',
		'click .edit-description .cancel': 'hideEditForm'
	},

	addItemView: function(item) {
		var itemView = new TrelloClone.Views.Item({
			model: item
		});
		this.addSubview('.item-list', itemView);
	},

	removeItemView: function(item) {
		var itemToRemove = item.id;
    var itemSubviews = this.subviews()['.item-list'];
    var subviewToRemove = _.filter(itemSubviews, function(view) { return view.model.id == itemToRemove; } )[0];
    itemSubviews.splice(itemSubviews.indexOf(subviewToRemove), 1);
    this.render();
	},

	hideCardShow: function(event){
		this.card.$el.trigger('hideCardShow');
	},

	showEditForm: function(event){
		var selector = '.edit-description';
		var subview = this.subviews()[selector][0];
		this.removeSubview(selector, subview);

		var editForm = new TrelloClone.Views.EditDescriptionForm({
			model: this.model
		});
		this.addSubview('.edit-description', editForm);
	},

	hideEditForm: function(event){
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		
		var selector = '.edit-description';
		var subview = this.subviews()[selector][0];
		this.removeSubview(selector, subview);
		
		var editLinkView = new TrelloClone.Views.EditDescriptionLink({
			model: this.model
		});
		this.addSubview('.edit-description', editLinkView);
	},

	updateDescription: function(event){
		event.preventDefault();
		event.stopPropagation();
		this.card.updateCard(event);
		this.hideEditForm();
	},

	render: function(){
		var content = this.template({
			card: this.model
		});
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}

});