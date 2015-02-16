TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
	
	template: JST['boards_index'],
	formTemplate: JST['new_board_form'],

	events: {
		'submit form': 'newBoardHandler',
		'click .new-board-link': 'newFormHandler',
		'click .cancel': 'cancelFormHandler',
		'blur input': 'cancelFormHandler'
	},

	newBoardHandler: function(event){
		event.preventDefault();

		var params = $(event.target).serializeJSON();
		var newBoard = new TrelloClone.Models.Board(params["board"]);

		newBoard.save({}, {
			success: function(){
				TrelloClone.Collections.boards.add(newBoard);
				Backbone.history.navigate("/", { trigger: true });
			}
		});
	},

	newFormHandler: function(event){
		event.preventDefault();
		var selector='.new-board'
		var $target = $(selector);
		var newBoardFormView = new TrelloClone.Views.BoardsNew();
		$target.empty();
		this.addSubview(selector, newBoardFormView);
	},

	cancelFormHandler: function(event){
		event.preventDefault();
		if (event.relatedTarget && event.relatedTarget.type === "submit"){
			return;
		}
		var selector = '.new-board';
		var subview = this.subviews()['.new-board'][0];
		this.removeSubview(selector, subview);
		
		$formLink = $('<div class="new-board-link">')
		$formLink.text("Create a new board...");
		$(selector).append($formLink);
	},
		
	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render.bind(this));
		this.listenTo(this.collection, 'add', this.addBoardSubView.bind(this));

		this.collection.each(function(board){
			this.addBoardSubView(board);
		}, this);
	},

	addBoardSubView: function(board){
		var boardIndexItemView = new TrelloClone.Views.BoardsIndexItem({ model: board });
		this.addSubview( '.board-list', boardIndexItemView);
	},

	render: function(){
		$('body').css('background-color', '#fff');
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();

		return this;
	}

});