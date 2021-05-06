'use strict';
const Issue = require('../models/Issue');
const mongoose = require('mongoose');


      // issue_title: req.query.issue_title || "",
      // issue_text: req.query.issue_text || "",
      // created_by: req.query.created_by || "",
      // status_text: req.query.status_text || "",
      // assigned_to: req.query.assigned_to || "",
      // open: req.query.open || "",
      // updated_on: new Date(),
module.exports = function(app) {

  app.get('/api/issues/:project', async (req, res) => {
    try{
      console.log(req.query);
      let project = req.params.project;
      console.log(project);
      let query = {
        "project": project
      }
      // if(req.query) {
      //   let {issue_text, issue_title, status_text, assigned_to, open, created_by, updated_on, created_on} = req.query;

      //   if(issue_text) {
      //     query["issue_text"] = issue_text;
      //   }
      //   if(issue_title) {
      //     query["issue_title"] = issue_title;
      //   }
      //   if(created_by) {
      //     query["created_by"] = created_by;
      //   }
      //   if(created_on) {
      //     query["created_on"] = created_on;
      //   }
      //   if(updated_on) {
      //     query["updated_on"] = updated_on;
      //   }
      //   if(status_text) {
      //     query["status_text"] = status_text;
      //   }
      //   if(open) {
      //     query["open"] = open;
      //   }
      //   if(assigned_to) {
      //     query["assigned_to"] = assigned_to;
      //   }
      // }
      console.log(query);
      let issues = await Issue.findOne({project});

      console.log(issues);
      res.send(issues);
    }
    catch(err) {
      res.end('Server Error');
    }
  })
  app.post('/api/issues/:project', async (req, res) => {
    // console.log(req.body)
    // console.log(req.query)
    // console.log(req.params)
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

  // .get( async function (req, res){
  //   let project = req.params.project;
  //   let 
  // })

  // .post( async function (req, res){

  // })

  // .put(function (req, res){
  //   let project = req.params.project;

  // })

  // .delete(function (req, res){
  //   let project = req.params.project;

  // });

};
