App = Ember.Application.create();

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', {path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
});

var posts = [{
  id: '1',
  title: "Rails is Omakase",
  author: {name: "d2h"},
  date: new Date('12-27-2012'),
  excerpt: "This is an excerpt",
  body: "I am the body of the content"
},{
  id: '2',
  title: "The Parley Letter",
  author: {name: "d2h"},
  date: new Date('12-24-2012'),
  excerpt: "Check out this excerpt",
  body: "I am the body of the content, I am I am."
}];

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  edit: function() {
    this.set('isEditing', true);
  },

  doneEditing: function() {
    this.set('isEditing', false);
    this.get('store').commit();
  }
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});