const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Assignment = require('../models/assignment');

function returnError(res, error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }

router.get('/', (req, res, next) => {
  Assignment.find()
        .then(assignments => {
          res.status(200).json({
            message: 'Assignments fetched successfully',
            assignments: assignments
          });
        })
        .catch(error => {
          returnError(res, error);
          });
        });

router.get('/:id', (req, res, next) => {
  Assignment.findOne({"id": req.params.id })
  .populate('group')
  .then(assignment => {
    res.status(200).json({
      message: 'Assignment fetched successfully!',
      assignment: assignment
    });
  })
  .catch(error => {
    returnError(res, error);
  });
});

router.post('/', (req, res, next) => {
  const maxAssignmentId = sequenceGenerator.nextId("assignments");

  const assignment = new Assignment({
    id: maxAssignmentId,
    name: req.body.name,
    course_name: req.body.course_name,
    due_date: req.body.due_date,
    done: req.body.done,
    alive: req.body.alive,
    points: req.body.points,
    desc: req.body.desc,
    personal_notes: req.body.personal_notes
});

assignment.save()
.then(createdAssignment => {
  res.status(201).json({
    message: 'Assignment added successfully',
    assignment: createdAssignment
  });
})
.catch(error => {
  returnError(res, error);
  });
});

router.put('/:id', (req, res, next) => {
  Assignment.findOne({ id: req.params.id })
  .then(assignment => {
    assignment.name = req.body.name;
    assignment.course_name = req.body.course_name;
    assignment.due_date = req.body.due_date;
    assignment.done = req.body.done;
    assignment.done = req.body.done;
    assignment.alive = req.body.alive;
    assignment.points = req.body.points;
    assignment.desc = req.body.desc;
    assignment.personal_notes = req.body.personal_notes;

    Assignment.updateOne({ id: req.params.id }, assignment)
    .then(result => {
      res.status(204).json({
        message: 'Assignment updated successfully'
      })
    })
    .catch(error => {
      returnError(res, error);
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Assignment not found',
      error: { assignment: 'Assignment not found'}
    });
  });  
});

router.delete("/:id", (req, res, next) => {
  Assignment.findOne({ id: req.params.id })
  .then(assignment => {
    Assignment.deleteOne({ id: req.params.id })
    .then(result => {
      res.status(204).json({
        message: "Assignment deleted successfully"
      });
    })
    .catch(error => {
      returnError(res, error);
    })
  })
  .catch(error => {
    res.status(500).json({
      message: 'Assignment not found',
      error: { assignment: 'Assignment not found'}
    });
  });
});
    module.exports = router;