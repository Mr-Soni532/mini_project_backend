const TodoModel = require('../models/todo');

exports.fetchTodo = async (req, res) => {
    let page = +req.query.page || 1;
    let limit = +req.query.limit || 100;
    try {
        const data = await TodoModel.find({ user: req.userId.data })
        .skip((page - 1) * limit).limit(limit);
        res.send(data)
    } catch (error) {
        return res.status(500).json({Error: "Something went wrong!"});
    }
}
// exports.searchTodo = async (req, res) => {
//     let page = +req.query.page;
//     let limit = +req.query.limit;
//     let query = req.query;
//     try {
//         for (key in query) {
//             if (key == 'page' || key == 'limit') continue;
//             let str = query[key];
//             let reg = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
//             query[key] = { $in: new RegExp(`${reg}`) };
//         }
//         const data = await TodoModel.find().skip((page - 1) * limit).limit(limit);
//         if (data.length) res.send(data)
//         else res.send('Data is not available!')
//     } catch (error) {
//         res.status(500).send("Something went wrong!");
//     }
// }

exports.addTodo = async (req, res) => {
    // console.log(req.userId.data)
    try {
        const { title, description } = req.body;
        let newtodo = new TodoModel({
            title, description, user_id: req.userId.data
        });
        let savedTodo = await newtodo.save();

        res.send('Todo has been added successfully.')
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong!");
    }

}

exports.deleteTodo = async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id)
        res.send(`todo withh id:${req.params.id} has been deleted.`)
    } catch (error) {
        res.status(500).send("Something went wrong!")
    }
}

exports.updateTodo = async (req, res) => {
    try {
        await TodoModel.findByIdAndUpdate(req.params.id, req.body)
        res.send(`todo withh id:${req.userId} has been updated.`)
    } catch (error) {
        res.status(500).send("Something went wrong!");
    }
}
