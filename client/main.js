import { Session } from 'meteor/session'

import './main.html';

ProteinData = new Meteor.Collection('protein_data')
History = new Meteor.Collection('history')

Meteor.methods({
  addProtein: function(amount) {
    ProteinData.update({userId: this.userId}, { $inc: { total: amount } })
    History.insert({
      value: amount,
      date: new Date().toTimeString(),
      userId: this.userId
    })
  }
})

Meteor.subscribe('allProteinData')
Meteor.subscribe('allHistory')

Deps.autorun(function() {
  if (Meteor.user())
    console.log("User logged in: " + Meteor.user().profile.name)
  else
    console.log("User logged out!")
})

Template.userDetails.helpers({
  user: function() {
    let data = ProteinData.findOne()
    if (!data) {
      data = {
        userId: Meteor.userId(),
        total: 0,
        goal: 200
      }
      ProteinData.insert(data)
    }
    return data
  },
  lastAmount : function() {
    return Session.get('lastAmount')
  }
})

Template.history.helpers({
  historyItem: function() {
    return History.find({}, {sort: { date: -1 }})
  }
})

Template.userDetails.events({
  'click #addAmount' : function(e) {
    e.preventDefault()
    
    let amount = parseInt($('#amount').val())

    Session.set('lastAmount', amount)
  }
})