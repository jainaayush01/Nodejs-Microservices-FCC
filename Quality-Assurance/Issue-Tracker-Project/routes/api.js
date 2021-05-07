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
      if(req.query) {
        let {issue_text, issue_title, status_text, assigned_to, open, created_by, updated_on, created_on} = req.query;

        if(issue_text) {
          query["issue_text"] = issue_text;
        }
        if(issue_title) {
          query["issue_title"] = issue_title;
        }
        if(created_by) {
          query["created_by"] = created_by;
        }
        if(created_on) {
          query["created_on"] = created_on;
        }
        if(updated_on) {
          query["updated_on"] = updated_on;
        }
        if(status_text) {
          query["status_text"] = status_text;
        }
        if(open) {
          query["open"] = open;
        }
        if(assigned_to) {
          query["assigned_to"] = assigned_to;
        }
      }

      let issues = await Issue.find(query);
      res.send(issues);
    }
    catch (err) {
      res.end('Server Error');
    }
  })


  app.post('/api/issues/:project', async (req, res) => {
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
      console.log(issue);
      res.json(issue);
    }
  })


  app.put('/api/issues/:project', async (req, res) => {
    res.end('ok')
  })
  
  
  app.delete('/api/issues/:project', async (req, res) => {
    res.end('ok')
  })
};
