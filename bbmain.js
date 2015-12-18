

var MovieModel = Backbone.Model.extend({
	urlRoot: "http://www.omdbapi.com",
});


var model = new MovieModel();


model.fetch({
	data: {
		s: "Star Wars"
	}
});


var MovieView = Backbone.View.extend({
	template: document.getElementById("template").innerHTML,

    initialize: function() {
        this.listenTo(model, "change", this.render);
    },

	render: function() {
		document.body.innerHTML = Mustache.render(this.template, model.toJSON());
	}
})

var view = new MovieView();