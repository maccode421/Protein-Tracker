import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Users = new Meteor.Collection('users')
History = new Meteor.Collection('history')

Template.userDetails.helpers({
  user: function() {
    return Users.findOne()
  }
})

Template.history.helpers({
  historyItem: function() {
    return History.find()
  }
})