'use strict';
const Issue = require('../models/Issue');
const mongoose = require('mongoose');

module.exports = function(app) {

  app.get('/api/issues/:project', async (req, res) => {
    try {
      let project = req.params.project;
      let query = {
        project
      }
      if (req.query) {
        let { issue_text, issue_title, status_text, assigned_to, open, created_by, updated_on, created_on, _id } = req.query;

        if (issue_text) {
          query["issue_text"] = issue_text;
        }
        if (issue_title) {
          query["issue_title"] = issue_title;
        }
        if (created_by) {
          query["created_by"] = created_by;
        }
        if (created_on) {
          query["created_on"] = created_on;
        }
        if (updated_on) {
          query["updated_on"] = updated_on;
        }
        if (status_text) {
          query["status_text"] = status_text;
        }
        if (open) {
          query["open"] = open;
        }
        if (assigned_to) {
          query["assigned_to"] = assigned_to;
        }

        if(_id) {
          query["_id"] = _id;
        }
      }

      let issues = await Issue.find(query);
      res.send(issues);
    }
    catch (err) {
      console.log(err);
      res.end('Server Error');
    }
  })


  app.post('/api/issues/:project', async (req, res) => {
    try {

      let project = req.params.project;
      let { issue_title, created_by, issue_text } = req.body;
      let created_on = new Date();
      let updated_on = new Date();
      let assigned_to = req.body.assigned_to || "";
      let status_text = req.body.status_text || "";
      let open = true;

      if (!issue_text || !issue_title || !created_by) {
        res.json({ error: "required field(s) missing" })
      }
      else {
        let issue = new Issue({
          project,
          issue_title,
          created_by,
          issue_text,
          created_on,
          updated_on,
          open,
          assigned_to,
          status_text
        });

        await issue.save();
        res.json(issue);
      }
    }
    catch (err) {
      console.log(err);
      res.end("Server Error");
    }
  })


  app.put('/api/issues/:project', async (req, res) => {
    try {
      if (!req.body._id) {
        res.json({
          error: 'missing _id'
        })
      }
      else {
        let _id = req.body._id;
        if (!mongoose.isValidObjectId(_id)) {
          res.json({
            error: 'could not update',
            _id: req.body._id
          })
        }
        else {
          let updateFlag = true;
          let update = {};
          if (req.body.hasOwnProperty("issue_title")) {
            updateFlag = false;
            update["issue_title"] = req.body.issue_title;
          }

          if (req.body.hasOwnProperty("issue_text")) {
            updateFlag = false;
            update["issue_text"] = req.body.issue_text;
          }

          if (req.body.hasOwnProperty("created_by")) {
            updateFlag = false;
            update["created_by"] = req.body.created_by;
          }

          if (req.body.hasOwnProperty("assigned_to")) {
            updateFlag = false;
            update["assigned_to"] = req.body.assigned_to;
          }

          if (req.body.hasOwnProperty("status_text")) {
            updateFlag = false;
            update["status_text"] = req.body.status_text;
          }

          if (req.body.hasOwnProperty("open")) {
            updateFlag = false;
            update["open"] = req.body.open;
          }

          if (updateFlag) {
            res.json({
              error: 'no update field(s) sent',
              _id: req.body._id
            })
          }
          else {
            update["updated_on"] = new Date();
            Issue.findByIdAndUpdate({ _id }, { ...update }, (err, doc) => {
              if (err) {
                res.json({
                  error: 'could not update',
                  _id: req.body._id
                })
              }
              else {
                if(doc) {
                  res.json({
                    result: 'successfully updated',
                    _id: req.body._id
                  })
                }
                else {
                  res.json({
                    error: 'could not update',
                    _id: req.body._id
                  })
                }
              }
            });
          }
        }
      }
    }
    catch (err) {
      console.log(err);
      res.json({
        error: 'could not update',
        _id: req.body._id
      })
    }
  })


  app.delete('/api/issues/:project', async (req, res) => {
    try {
      if (!req.body._id) {
        res.json({
          error: "missing _id"
        })
      }
      else {
        let _id = req.body._id;
        if (mongoose.isValidObjectId(_id)) {
          let issue = await Issue.findByIdAndDelete(_id);
          if (issue) {
            res.json({
              result: 'successfully deleted',
              _id
            })
          }
          else {
            res.json({
              error: 'could not delete',
              _id: req.body._id
            })
          }
        }
        else {
          res.json({
            error: 'could not delete',
            _id: req.body._id
          })
        }
      }
    }
    catch (err) {
      console.log(err);
      res.json({
        error: 'could not delete',
        _id: req.body._id
      })
    }
  })
};
