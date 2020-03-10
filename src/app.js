const express = require('express');
const path 	  = require('path');

// Database
const {addNewVisitor, deleteVisitor, deleteVisitors, viewVisitor, viewVisitors, updateVisitor} = require('./database');

// Create app
const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Add visitor
app.post('/add-new-visitor', async (req, res) => {

	// Inputs
	let name 		= req.body.name;
	let age 		= req.body.age;
	let date 		= req.body.date_of_visit;
	let time 		= req.body.time_of_visit;
	let assistant 	= req.body.assistant;
	let comments 	= req.body.comments;

	// Save visitor
	const visitor = await addNewVisitor(name, age, date, time, assistant, comments);

	res.status(200).json({ 
		status: 'ok',
		visitor: visitor[0] 
	});

});

// Delete visitor
app.delete('/delete-visitor/:id', async (req, res) => {
	
	const id = req.params.id;

	// Delete visitor
	const visitor = await deleteVisitor(id);

	res.status(200).json({ 
		status: 'ok',
		visitor: visitor[0] 
	});

});

// Delete visitors
app.delete('/delete-visitors', async (req, res) => {

	// Delete visitors
	const visitors = await deleteVisitors();

	res.status(200).json({ 
		status: 'ok',
		visitors: visitors
	});

});

// View visitor
app.get('/view-visitor/:id', async (req, res) => {
	
	const id = req.params.id;

	// View visitor
	const visitor = await viewVisitor(id);

	res.status(200).json({ 
		status: 'ok',
		visitor: visitor[0] 
	});
	
});

// View visitors
app.get('/view-visitors', async (req, res) => {
	
	// View visitors
	const visitors = await viewVisitors();

	res.status(200).json({ 
		status: 'ok',
		visitors: visitors
	});

});

// Update visitor
app.put('/update-visitor/:id', async (req, res) => {
	
	// Inputs
	let name 		= req.body.name;
	let age 		= req.body.age;
	let date 		= req.body.date_of_visit;
	let time 		= req.body.time_of_visit;
	let assistant 	= req.body.assistant;
	let comments 	= req.body.comments;

	const id = req.params.id;

	// Save visitor
	const visitor = await updateVisitor(id, name, age, date, time, assistant, comments);

	res.status(200).json({ 
		status: 'ok',
		visitor: visitor[0] 
	});

});

const server = app.listen(3000, () => console.log('Express Server is running on Port: 3000'));

module.exports = server;