const express = require('express');
const router = express.Router();
const todoModel = require('../models/todo-model');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');

/**
 * @route GET /
 * @description Retrieves all to-dos. Populates the 'user' field and excludes the password.
 * @access Private (requires authentication via isLoggedIn middleware)
 */
router.get('/', async (req, res) => {
    try {
        // Find all to-dos, populate the user reference, and exclude the password field for security.
        const todos = await todoModel.find().populate('user', '-password');
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @route POST /create
 * @description Creates a new to-do and associates it with the currently logged-in user.
 * @access Private (requires authentication via isLoggedIn middleware)
 */
router.post('/create', isLoggedIn, async (req, res) => {
    try {
        const { title, content, priority } = req.body;

        // Find the logged-in user to link the new to-do.
        // req.user is populated by the isLoggedIn middleware.
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Create the new to-do, ensuring the user ID is correctly assigned.
        const todo = await todoModel.create({
            title,
            content,
            priority,
            user: user._id // This is a crucial link between the two models.
        });

        // Add the new to-do's ID to the user's todos array.
        user.todos.push(todo._id);
        await user.save();

        res.status(201).json(todo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @route PUT /edit/:id
 * @description Edits a to-do by its ID, ensuring it belongs to the logged-in user.
 * @access Private
 * @param {string} id - The ID of the to-do to edit.
 */
router.put('/edit/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, priority, status } = req.body; // include status!

    const todo = await todoModel.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, content, priority, status },   // update status too
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

        // Find and delete the to-do, but only if it belongs to the authenticated user.
        const todo = await todoModel.findOneAndDelete({ _id: id, user: req.user._id });

        if (!todo) {
            return res.status(404).json({ message: 'To-do not found or user not authorized.' });
        }

        // Remove the to-do reference from the user's document
        await userModel.findByIdAndUpdate(req.user._id, {
            $pull: { todos: id }
        });

        res.status(200).json({ message: 'To-do successfully deleted.' });
    } catch (error) {
        console.error('Error deleting to-do:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;