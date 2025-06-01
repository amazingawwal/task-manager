const http = require('http');
const taskManager = require('./taskManager');
const format = require('./taskManager')

const args = process.argv.slice(2);
const command = args[0];

try {
  switch (command) {
    case 'add':
      const [title, description] = args.slice(1);
      if (!title || !description) {
        console.error('Please provide both a title and description.');
        break;
      }
      const task = taskManager.addTask(title, description);
      console.log('✓ Task added successfully:', 'ID:', task.id, 'Title:', task.title);
      break;

    case 'list':
      const tasks = taskManager.getAllTasks();
      if (tasks.length === 0) {
        console.log('No tasks found.');
      } else {
        tasks.forEach(t =>{
            let taskStatus;
            t.completed? taskStatus = '(Completed ✓)' : taskStatus = '(Pending)';
            console.log(`[ ${t.id}] ${t.title} ${taskStatus}
            Description: ${t.description}
            created: ${format.formatDate(t.createdAt)}`)
        // console.log(t)
        }
        );
      }
      break;

    case 'complete':
      const completeId = parseInt(args[1]);
      if (isNaN(completeId)) {
        console.error('Please provide a valid task ID.');
        break;
      }
      if (taskManager.markTaskComplete(completeId)) {
        console.log(`Task ${completeId} marked as completed.`);
      } else {
        console.error(`Task ${completeId} not found.`);
      }
      break;

    case 'delete':
      const deleteId = parseInt(args[1]);
      if (isNaN(deleteId)) {
        console.error('Please provide a valid task ID.');
        break;
      }
      if (taskManager.deleteTask(deleteId)) {
        console.log(`Task ${deleteId} deleted.`);
      } else {
        console.error(`Task ${deleteId} not found.`);
      }
      break;

      case 'server':
        const http = require('http');
        const port = 4000;
      
        const server = http.createServer((req, res) => {
          if (req.method === 'GET' && req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to ATM: Amazing Task Manager');
      
          } else if (req.method === 'GET' && req.url === '/tasks') {
            const tasks = taskManager.getAllTasks();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(tasks, null, 2));
      
          } else if (req.method === 'POST' && req.url === '/tasks') {
            let body = '';
      
            req.on('data', chunk => {
              body += chunk.toString();
            });
      
            req.on('end', () => {
              try {
                const { title, description } = JSON.parse(body);
      
                if (!title || !description) {
                  res.writeHead(400, { 'Content-Type': 'text/plain' });
                  return res.end('Missing title or description.');
                }
      
                const newTask = taskManager.addTask(title, description);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newTask, null, 2));
              } catch (err) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
              }
            });
      
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
          }
        });
      
        server.listen(port, () => {
          console.log(`Server is up and running at http://localhost:${port}`);
        });
        break;
    default:
      console.log(`Try CLI`);
  }
} catch (err) {
  console.error('An unexpected error occurred:', err.message);
}


// console.log('args:', args , 'command:', command);

