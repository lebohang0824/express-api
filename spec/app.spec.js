describe("Testing express api end points", () => {

	const axios = require('axios');
	const visitor = {
		name: 'John Blues',
		age: 19,
		date_of_visit: '1/8/2000',
		time_of_visit: '12:00:00',
		assistant: 'Lebohang Mokoena',
		comments: 'No Comment'
	}
	const updatedVisitor = {
		name: 'Jonas Singer Blue',
		age: 19,
		date_of_visit: '1/8/2000',
		time_of_visit: '12:00:00',
		assistant: 'Lebohang Mokoena',
		comments: 'What a wonderful time.'
	}

	let visitor_id;
		
	it('Should add new visitor', async () => {
		const res = await axios.post('http://127.0.0.1:3000/add-new-visitor', visitor);

		objVisitor = res.data.visitor;
		visitor_id = objVisitor.id;

		expect(res.data.status).toBe('ok');
		expect(objVisitor.id).toEqual(visitor_id);
		expect(objVisitor.name).toEqual(visitor.name);
		expect(objVisitor.age).toEqual(visitor.age);
		expect(new Date(objVisitor.date_of_visit)).toEqual(new Date(visitor.date_of_visit));
		expect(objVisitor.time_of_visit).toEqual(visitor.time_of_visit);
		expect(objVisitor.assistant).toEqual(visitor.assistant);
		expect(objVisitor.comments).toEqual(visitor.comments);
	});
		
	it('Should view visitor', async () => { 
		const res = await axios.get(`http://127.0.0.1:3000/view-visitor/${visitor_id}`);

		objVisitor = res.data.visitor;

		expect(res.data.status).toBe('ok');
		expect(objVisitor.id).toEqual(visitor_id);
		expect(objVisitor.name).toEqual(visitor.name);
		expect(objVisitor.age).toEqual(visitor.age);
		expect(new Date(objVisitor.date_of_visit)).toEqual(new Date(visitor.date_of_visit));
		expect(objVisitor.time_of_visit).toEqual(visitor.time_of_visit);
		expect(objVisitor.assistant).toEqual(visitor.assistant);
		expect(objVisitor.comments).toEqual(visitor.comments);
	}); 

	it('Should view visitors', async () => {
		const res = await axios.get('http://127.0.0.1:3000/view-visitors');

		objVisitor = res.data.visitor;

		expect(res.data.status).toBe('ok');
		expect(res.data.visitors).not.toBe([]);
	});

	it('Should update visitor', async () => {
		const res = await axios.put(`http://127.0.0.1:3000/update-visitor/${visitor_id}`, updatedVisitor);

		objVisitor = res.data.visitor;
		visitor_id = objVisitor.id;

		expect(res.data.status).toBe('ok');
		expect(objVisitor.id).toEqual(visitor_id);
		expect(objVisitor.name).toEqual(updatedVisitor.name);
		expect(objVisitor.age).toEqual(updatedVisitor.age);
		expect(new Date(objVisitor.date_of_visit)).toEqual(new Date(updatedVisitor.date_of_visit));
		expect(objVisitor.time_of_visit).toEqual(updatedVisitor.time_of_visit);
		expect(objVisitor.assistant).toEqual(updatedVisitor.assistant);
		expect(objVisitor.comments).toEqual(updatedVisitor.comments);
	});
		
	it('Should delete visitor', async () => {
		const res = await axios.delete(`http://127.0.0.1:3000/delete-visitor/${visitor_id}`);

		objVisitor = res.data.visitor;

		expect(res.data.status).toBe('ok');
		expect(res.data.visitors).not.toEqual([]);
	});

	it('Should delete visitors', async () => {
		const res = await axios.delete('http://127.0.0.1:3000/delete-visitors');

		expect(res.data.status).toBe('ok');
		expect(res.data.visitors).toEqual([]);
	});

});