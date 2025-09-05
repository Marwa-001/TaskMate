const express = require('express');
const router = express.Router();
const todoModel = require('../models/todo-model');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');


/**
 * @route GET /
 * @description Retrieves all to-dos for the logged-in user, including shared tasks.
 */
router.get('/', isLoggedIn, async (req, res) => {
    try {
        // ✅ Corrected query: Find tasks where the user is either the owner or a collaborator
        const todos = await todoModel
            .find({
                $or: [
                    { user: req.user._id },
                    { collaborators: req.user._id }
                ]
            })
            // ✅ Populate both the user and collaborators fields
            .populate('user', '-password')
            .populate('collaborators', '-password');

        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @route POST /create
 * @description Creates a new to-do and associates it with the currently logged-in user.
 */
router.post('/create', isLoggedIn, async (req, res) => {
    try {
        const { title, content, priority, category, duedate } = req.body;
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const newTodo = new todoModel({
            title,
            content,
            priority,
            category,
            duedate,
            user: user._id,
            isCompleted: false, // Default status for new tasks
        });

        const savedTodo = await newTodo.save();
        user.todos.push(savedTodo._id);
        await user.save();

        res.status(201).json(savedTodo);
    } catch (error) {
        console.error('Error creating to-do:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// src/routes/index.js

/**
 * @route PUT /edit/:id
 * @description Updates a to-do by its ID, ensuring it belongs to the logged-in user.
 * @access Private
 * @param {string} id - The ID of the to-do to update.
 */
router.put('/edit/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    // ✅ Include 'duedate' in the destructured properties from req.body
    const { title, content, priority, status, isCompleted, duedate } = req.body;

    const todo = await todoModel.findOneAndUpdate(
      { _id: id, user: req.user._id },
      // ✅ Add 'duedate' to the update object
      { title, content, priority, status, isCompleted, duedate },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'To-do not found or user not authorized.' });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error('Error updating to-do:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


/**
 * @route DELETE /delete/:id
 * @description Deletes a to-do by its ID, ensuring it belongs to the logged-in user.
 * @access Private
 * @param {string} id - The ID of the to-do to delete.
 */
router.delete('/delete/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todoModel.findOneAndDelete({ _id: id, user: req.user._id });

        if (!todo) {
            return res.status(404).json({ message: 'To-do not found or user not authorized.' });
        }

        await userModel.findByIdAndUpdate(req.user._id, { $pull: { todos: id } });

        res.status(200).json({ message: 'To-do deleted successfully.' });
    } catch (error) {
        console.error('Error deleting to-do:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @route POST /share/:id
 * @description Adds a collaborator to a to-do, ensuring the user exists.
 * @access Private
 * @param {string} id - The ID of the to-do to share.
 */
router.post('/share/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const { collaboratorEmail } = req.body;

        if (!collaboratorEmail) {
            return res.status(400).json({ message: 'Collaborator email is required.' });
        }

        // 1. Find the collaborator by email
        const collaborator = await userModel.findOne({ email: collaboratorEmail });
        if (!collaborator) {
            return res.status(404).json({ message: 'User not found. Please ensure the email is correct.' });
        }

        // 2. Find the task to share, ensuring the current user is the owner
        const todo = await todoModel.findOne({ _id: id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ message: 'To-do not found or you are not the owner.' });
        }

        // 3. Prevent sharing with self
        if (collaborator._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot share a task with yourself.' });
        }
        
        // 4. Check if collaborator is already on the list
        if (todo.collaborators.includes(collaborator._id)) {
            return res.status(400).json({ message: 'User is already a collaborator.' });
        }

        // 5. Add the collaborator to the task's collaborators array
        todo.collaborators.push(collaborator._id);
        await todo.save();

        res.status(200).json({ message: 'Collaborator added successfully.', todo });

    } catch (error) {
        console.error('Error sharing to-do:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @route DELETE /:id/collaborators/:collaboratorId
 * @description Removes a collaborator from a specific to-do.
 */
router.delete('/:id/collaborators/:collaboratorId', isLoggedIn, async (req, res) => {
    try {
        const { id, collaboratorId } = req.params;

        // 1. Find the task and ensure the current user is the owner
        const todo = await todoModel.findOne({ _id: id, user: req.user._id });

        if (!todo) {
            return res.status(404).json({ message: 'To-do not found or you are not the owner.' });
        }

        // 2. Remove the collaborator's ID from the collaborators array
        const initialCollaboratorCount = todo.collaborators.length;
        todo.collaborators.pull(collaboratorId); // Mongoose's .pull() method is perfect for this

        // 3. Check if a collaborator was actually removed
        if (todo.collaborators.length === initialCollaboratorCount) {
            return res.status(404).json({ message: 'Collaborator not found on this task.' });
        }

        await todo.save();

        res.status(200).json({ message: 'Collaborator removed successfully.' });

    } catch (error) {
        console.error('Error removing collaborator:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;