import './main.html';

ProteinData = new Meteor.Collection('protein_data')
History = new Meteor.Collection('history')

Meteor.subscribe('allProteinData')
Meteor.subscribe('allHistory')

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

    ProteinData.update(this._id, { $inc: { total: amount } })
    History.insert({
      value: amount,
      date: new Date().toTimeString(),
      userId: this._id
    })
  }
})