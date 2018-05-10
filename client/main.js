import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.userDetails.helpers({
  user: function() {
    var user = {
      total: 123,
      goal: 251
    }
    return user
  }
})

Template.history.helpers({
  historyItem: function() {
    var historyItems = 
    [
      { date: '5/11/2018 5:46 PM', value: 21 },
      { date: '5/11/2018 5:46 PM', value: 22 },
      { date: '5/11/2018 5:46 PM', value: 23 },
      { date: '5/11/2018 5:46 PM', value: 24 },
      { date: '5/11/2018 5:46 PM', value: 25 }
    ]
    return historyItems
  }
})