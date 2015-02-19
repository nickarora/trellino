TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	template: JST['board_show'],

	className: 'board',

	events: {
		"submit form.new-list-form": "createNewList",
		"click .new-list-link": "showListForm",
		"click .new-list .cancel": "hideListForm",
		"blur .new-list input": "hideListForm",
		'update-sort': 'updateSort'
	},

	initialize: function(){
		var listCollection = this.model.lists();

		this.listenTo(this.model, 'sync', this.render.bind(this));
		this.listenTo(listCollection, 'add', this.addListSubView.bind(this));

		listCollection.each(function(list){
			this.addListSubView(list);
		}, this);

		var listLinkView = new TrelloClone.Views.ListLink();
		this.addSubview('.new-list', listLinkView);
	},

	createNewList: function(event){
		event.preventDefault();
		var that = this;
		var listCollection = this.model.lists();

		var params = $(event.currentTarget).serializeJSON();
		params["list"]["board_id"] = this.model.id;
		params["list"]["ord"] = listCollection.length;

		var newList = new TrelloClone.Models.List(params["list"]);

		newList.save({}, {
			success: function(){
				listCollection.add(newList);
				Backbone.history.navigate("/boards/" + that.model.id, { trigger: true });
			}
		});
	},

	showListForm: function(event){
		event.preventDefault();
		var selector = '.new-list';
		var subview = this.subviews()['.new-list'][0];
		this.removeSubview(selector, subview);
		
		var listForm = new TrelloClone.Views.ListForm();
		this.addSubview('.new-list', listForm);
	},

	hideListForm: function(event){
		event.preventDefault();
		if (event.relatedTarget && event.relatedTarget.type === "submit"){
			return;
		}
		var selector = '.new-list';
		var subview = this.subviews()['.new-list'][0];
		this.removeSubview(selector, subview);
		
		var listLinkView = new TrelloClone.Views.ListLink();
		this.addSubview('.new-list', listLinkView);
	},

	addListSubView: function(list){
		var listSubview = new TrelloClone.Views.List({ model: list });
		this.addSubview('.lists', listSubview);
	},

	render: function(){
		var content = this.template({ board: this.model });
		this.updateBgColor();
		this.$el.html(content);
		this.attachSubviews();
		this.makeListsSortable();
		this.makeCardsSortable();
		return this;
	},

	updateBgColor: function(){
		$('body').css('background-image', 'none');
		$('body').css('background-color', '#1875ad');
	},

	makeListsSortable: function(){
		this.$('div.lists').sortable({
			stop: function(event, ui){
				ui.item.trigger('drop', ui.item.index());
			}
		});
	},

	makeCardsSortable: function(){
		this.$('div.cards').sortable({
			connectWith: $('.cards'),
			placeholder: "card-placeholder",
			forcePlaceholderSize: true,
			stop: function(event, ui){
				ui.item.trigger('drop', ui.item.index());
			}
		});
	},

	updateSort: function(event, model, future){
		event.stopPropagation();
		var that = this;

		var listCollection = this.model.lists().models;
		var listViews = this.subviews()['.lists'];
		var current = listCollection.indexOf(model);
	
		var swapView = listViews.splice(current, 1)[0];
		listViews.splice(future, 0, swapView);

		var swapList = listCollection.splice(current, 1)[0];
		listCollection.splice(future, 0, swapList);
					
		_.each(listCollection, function(model, index){
			model.set('ord', index);
			model.save({}, {
				success: function(){
					that.makeCardsSortable();
				}
			});
		});
	}

});