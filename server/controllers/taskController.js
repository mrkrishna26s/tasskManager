import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignedTo } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      createdBy: req.user.createdBy,
      assignedTo
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Create Task Error:', err); //added this to check error
    res.status(500).json({ message: 'Error creating task' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { createdBy, assignedTo, status, priority, dueDate, search } = req.query;
    let filter = {};

    if (createdBy) filter.createdBy = createdBy;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(filter).populate('assignedTo', 'name');
    res.json(tasks);
  } catch (err) {
    console.error('Error creating task:', err);  // added to check error
    res.status(500).json({ message: 'Error creating task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    console.error('Error creating task:', err);  // added to check error
    res.status(500).json({ message: 'Error creating task' });
  }  
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error creating task:', err); // added to check error
    res.status(500).json({ message: 'Error creating task' });
  }  
};