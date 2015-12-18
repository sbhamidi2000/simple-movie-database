var MovieModel = Backbone.Model.extend({
	urlRoot: "http://omdbapi.com"
});

var SearchView = Backbone.View.extend({
	searchText: document.getElementById("search_text"),

	events: {
		"click #search_button": "doSearch"
	},

	doSearch: function() {
		searchModel.fetch({
			data: {
				s: this.searchText.value
			}
		})
	}
});

var ResultsView = Backbone.View.extend({
	template: document.getElementById("list_template").innerHTML,

	initialize: function() {
		this.listenTo(searchModel, "change", this.render);
	},

	events: {
		"click a": "getDetails"
	},

	getDetails: function(event) {
		detailsModel.fetch({
			data: {
				i: event.target.id,
				plot: "full"
			}
		});
	},

	render: function() {
		this.el.innerHTML = Mustache.render(this.template, searchModel.toJSON());
	}
});

var DetailsView = Backbone.View.extend({
	template: document.getElementById("details_template").innerHTML,

	initialize: function() {
		this.listenTo(detailsModel, "change", this.render);
	},

	render: function() {
		this.el.innerHTML = Mustache.render(this.template, detailsModel.toJSON());
	}
});



var searchModel = new MovieModel(),
	detailsModel = new MovieModel(),
	searchView = new SearchView({ el: document.getElementById("search")}),
	resultsView = new ResultsView({ el: document.getElementById("list")}),
	detailsView = new DetailsView({ el: document.getElementById("details")});

