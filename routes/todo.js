const express = require('express');
const router = require('express').Router();
const Todo = require("../models/Todo");

const app = express();

// index - todo
router.get("/", async (req, res, next) => {
    try{

        let query = {};
        const { sort, filter } = req.query;

        if (filter && ['high', 'medium', 'low'].includes(filter)) {
            query.priority = filter;
        }

        let tasks = await Todo.find(query);
        
        res.render("todopage", { tasks } );
    } catch (err) {
        next(err);
    }
})

// add task
router.post("/add/tasks", async (req, res) => {
    try{
        const { todoTask, priorityOfTask, dueDate } = req.body;
        const newTodo = new Todo({
            todo: todoTask,
            priority: priorityOfTask,
            dueDate: dueDate
        });

        await newTodo.save();
        res.redirect("/")
    } catch (err) {
        console.error("Error adding task:", err);
        res.status(500).send("An error occurred while adding the task.");
    }
})

// delete task
router.delete("/delete/task/:_id", async (req, res) => {
    try{
        const { _id } = req.params;
        await Todo.deleteOne({_id});
        res.redirect("/");
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).send("An error occurred while deleting the task.");
    }
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).send("Something went wrong.");
});

module.exports = router;


