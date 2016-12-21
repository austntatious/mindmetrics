const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uuid: String,
  first_name: String,
  last_name: String,
  session: Object,
  email: String,
  content_items: Object, // formatted object of everything input to Watson, along with appended data like wordcount
  watson_profile: Object,
  meta_data: Object, // ip address, browswer info, etc
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

// notes: obtain IP address and browser info to gather data on user location and device usage
// occupation and years of employment
// graduation year, major, and how many months of unemployment vs satisfactory employment
// relationship status - single, married, dating
// there are possible selection bias in the people who choose to take this survey, as well as selection bias for people who have enough personal/reflective writing
// to be able to participate

// linguistic analysis of a user's input likely has more accuracy than self-reported questionnaires because a user's writing is more directly reflective of their
// consciousness. Reporting has a higher likelihood of bias and answering questions in an ideal sense, while writing will be a clearer representation of their voice

// Link friends, significant others, music tastes (spotify, etc), movie tastes (netflix, rottentomatoes), book preferences (goodreads)
// Friends will have a compatibility in hobbies or personality. Hobbies and taste in arts will give insights into the guiding themes in their lives
// People who like romance movies are perhaps more romantic

// other indicators of personality - external assessment from friends and peers
// dating life indicates your vulnerabiity and authenticity
// preferences for gambling or risky behavior likely shows openness to experience
// measure values, needs, and mindset (mindset regarding personal growth vs static values - Carol Dweck)

// sync with wearable to correlate physical activity, heartrate, likelihoods of depression, social activity, etc