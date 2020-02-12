var mongoose = require('mongoose');
var User = mongoose.model('User');
var Course = mongoose.model('Course');
var Comment = mongoose.model("Comment");
var Lesson = mongoose.model("Lesson");
var Article = mongoose.model("Article");

//SECTION remove comment on a lesson
const RemoveLessonComment = (req , res , next)=>{
    const LessonInfo = req.body.lesson;
    const CommentInfo = req.body.comment;

    if (!CommentInfo){
        res.status(422).send({error:{message:"please provide a comment"}})
    };
    if (!LessonInfo){
        res.status(422).send({error:{message:"please provide a lesson"}})
    };
    Lesson.findById(LessonInfo._id).then(
        (lesson)=> {
            if (!lesson){return res.status(422).send({error:{message:"Lesson not found"}})}
            Comment.deleteOne({_id:CommentInfo._id});

            lesson.comments.splice(lesson.comments.indexOf(CommentInfo._id),1);

            lesson.save().then(
                ()=>{
                    res.status(202).send({
                        lesson:LessonInfo,
                    })
                }
            ).catch(next);
        }
    )
};