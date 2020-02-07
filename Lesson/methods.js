var mongoose = require('mongoose');
var Lesson = mongoose.model('Lesson');
var Course = mongoose.model('Course');

const addlesson = (req, res, next) => {
    const LessonInfo = req.body.lesson;
    const CourseInfo = req.body.course;
    if (!CourseInfo) {
        return res.status(422).send({ errors: { message: "Course not found" } });
    }
    if (!LessonInfo) {
        return res.status(422).send({ errors: { message: "Lesson not found" } });
    }
    Course.findOne(CourseInfo)
        .then(course => {
            // if (!course) {
            //     res.status(422).send({ errors: { message: "Course not found" } });
            // }
            const lesson = new Lesson(LessonInfo);
            course.lessons.push(lesson);
            course.save();
            lesson.save().then(() => {
                res.status(202).send({ lesson });
            }).catch(next);
        }).catch(
            () => {
                return res.status(422).send({ errors: { message: "Course not found" } });
            }
        );
};
module.exports = addlesson;