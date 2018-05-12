import { Meteor } from 'meteor/meteor';

ProteinData = new Meteor.Collection('protein_data')
History = new Meteor.Collection('history')

Meteor.methods({
  addProtein: function(amount) {

    if (!this.isSimulation) {
      const Future = Npm.require('fibers/future')
      let future = new Future()
      Meteor.setTimeout(function() {
        future.return()
      }, 3 * 1000)
      future.wait()
    } else {
      amount = 500
    }

    ProteinData.update({userId: this.userId}, { $inc: { total: amount } })
    History.insert({
      value: amount,
      date: new Date().toTimeString(),
      userId: this.userId
    })
  }
})

Meteor.publish('allProteinData', function() {
  return ProteinData.find({ userId: this.userId })
})

Meteor.publish('allHistory', function() {
  return History.find({ userId: this.userId }, {sort: { date: -1 }, limit: 5})
})

Meteor.startup(() => {
  // code to run on server at startup

});
