import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Users = new Meteor.Collection('users')
History = new Meteor.Collection('history')

Meteor.subscribe('allUsers')
Meteor.subscribe('allHistory')

Template.userDetails.helpers({
  user: function() {
    return Users.findOne()
  }
})

Template.history.helpers({
  historyItem: function() {
    return History.find({}, {sort: { date: -1 }, limit: 5})
  }
})

Template.userDetails.events({
  'click #addAmount' : function(e) {
    e.preventDefault()
    
    let amount = parseInt($('#amount').val())

    Users.update(this._id, { $inc: { total: amount } })
    History.insert({
      value: amount,
      date: new Date().toTimeString(),
      userId: this._id
    })
  }
})