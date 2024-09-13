const MovieModel = require("../models/movie-model");
const fs = require("fs");
const path = require("path");

const defaultCon = async (req, res) => {
  let data = await MovieModel.find({});

  res.render("Home", { data });
};

const Addform = async (req, res) => {
  res.render("addMovie");
};
const Viewdata = async (req, res) => {
  res.render("addMovie");
};

const addMovieCon = async (req, res) => {
  console.log("movie  ", req.body.todo);
  console.log("file img", req.file);
  const newTodo = {
    title: req.body.title,
    complate: false,
    path: req.file.path,
    description: req.body.description,
    year: req.body.year,
    time: req.body.time,
  };
  console.log("new todo", newTodo);
  const MovieM = await new MovieModel(newTodo);

  await MovieM.save();

  res.redirect("/");
};

const singleRecCon = async (req, res) => {
  const { id } = req.params;

  let data = await MovieModel.findOne({ _id: id });

  console.log("single record", data);
  res.render("editMovie", { data });
};

const upadatedMovieCon = async (req, res) => {
  const { id } = req.params;

  const currentTodo = await MovieModel.findById(id);

  const updatedTodo = {
    title: req.body.todo,
    description: req.body.description,
    year: req.body.year,
    time: req.body.time,
  };

  if (req.file) {
    updatedTodo.path = req.file.path;
  } else {
    updatedTodo.path = currentTodo.path;
  }

  let update = await MovieModel.findByIdAndUpdate(id, updatedTodo, {
    new: true,
  });
  console.log("Updated todo:", update);

  res.redirect("/");
};

const deleteCon = async (req, res) => {
  const { id } = req.params;

  const movie = await MovieModel.findByIdAndDelete(id);

  if (movie?.path) {
    const filePath = path.join(__dirname, "../", movie.path);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error Image Deleting:", err);
      else console.log("Image Deleted Successfully", filePath);
    });
  }

  res.redirect("/");
};

module.exports = {
  defaultCon,
  addMovieCon,
  singleRecCon,
  upadatedMovieCon,
  deleteCon,
  Addform,
};
