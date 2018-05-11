import { Meteor } from 'meteor/meteor';

ProteinData = new Meteor.Collection('protein_data')
History = new Meteor.Collection('history')

Meteor.publish('allProteinData', function() {
  return ProteinData.find({ userId: this.userId })
})

Meteor.publish('allHistory', function() {
  return History.find({ userId: this.userId})
})

Meteor.startup(() => {
  // code to run on server at startup

});
