var mongoose = require('mongoose');

var LessonSchema = new mongoose.Schema({
    title: String,
    description: String,
    body: String,
    images: [Buffer],
    favoritesCount: { type: Number, default: 0 },
    Course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


module.exports =  LessonSchema    = mongoose.model('Lesson', LessonSchema);