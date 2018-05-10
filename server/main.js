import { Meteor } from 'meteor/meteor';

Users = new Meteor.Collection('users')
History = new Meteor.Collection('history')

Meteor.startup(() => {
  // code to run on server at startup

  if (Users.find().count() === 0) {
    Users.insert({
      total: 120,
      goal: 200
    })
  }

  if (History.find().count() === 0) {
    History.insert({
      value: 20,
      date: new Date().toTimeString()
    })
    History.insert({
      value: 40,
      date: new Date().toTimeString()
    })
    History.insert({
      value: 30,
      date: new Date().toTimeString()
    })
  }
});
