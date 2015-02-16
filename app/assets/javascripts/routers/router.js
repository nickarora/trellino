TrelloClone.Routers.TrelloRouter = Backbone.Router.extend({
	
	routes: {
		"": "boardsIndex",
		"boards/:id": "boardShow"
	},

	initialize: function(options){
		this.$rootEl = options.root;
	},

	boardsIndex: function(){
		TrelloClone.Collections.boards.fetch();
		
		var boardsIndexView = new TrelloClone.Views.BoardsIndex({
			collection: TrelloClone.Collections.boards
		});

		this._swapView(boardsIndexView);
	},

	boardShow: function(id){
		console.log(id);
		var board = TrelloClone.Collections.boards.getOrFetch(id);
    var boardShowView = new TrelloClone.Views.BoardShow({
      model: board
    });

    this._swapView(boardShowView);
	},

	_swapView: function(newView){
		if (this._currentView){
			this._currentView.remove();
		}
		
		this._currentView = newView;
		this.$rootEl.html(newView.render().$el)
	}

});