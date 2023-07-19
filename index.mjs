import express from 'express';
import id from 'uniqid';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

let lists = [
  { id: '1', title: 'Fix broken tv', done: false },
  { id: '2', title: 'Do homework', done: false },
  { id: '3', title: 'Walk the dog', done: false },
];

app.get('/', (req, res) => {
  const format = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  let now = new Date().toLocaleDateString('en-us', format);

  res.render('main', { date: now, tasks: lists });
});

app.post('/', (req, res) => {
  const task = {
    id: id(),
    title: req.body.task,
    done: false,
  };

  if (task.title) {
    lists.push(task);
  } else {
    console.log('Can not be add coz no value inputed');
  }

  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const itemID = req.body.taskID;
  const isDone = req.body.checkbox;

  lists = lists.filter((item) => item.id !== itemID);

  console.log(isDone);
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
