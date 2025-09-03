const cron = require('node-cron');
const nodemailer = require('nodemailer');
const todoModel = require('./models/todo-model');
const userModel = require('./models/user-model');

// =================================================================
// 📧 Configure Email Transporter
// =================================================================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marvaa.003@gmail.com',
    pass: 'pryewmlniuqhwlmi'
  }
});

// =================================================================
// 📅 Schedule a Daily Task Check
// =================================================================
// Currently runs every minute for testing — change to '0 9 * * *' for 9 AM daily
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily task check for upcoming deadlines...');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    // Fetch all tasks (status not Completed)
    const allTasks = await todoModel.find({
      status: { $ne: 'Completed' }
    }).populate('user', 'email');

    // Convert string duedate -> Date and filter for today
    const upcomingTasks = allTasks.filter(task => {
      if (!task.duedate) return false;
      const taskDate = new Date(task.duedate); // convert from string
      return taskDate >= today && taskDate < tomorrow;
    });

    if (upcomingTasks.length === 0) {
      console.log('No tasks due today.');
      return;
    }

    // Group tasks by user
    const tasksByUser = upcomingTasks.reduce((acc, task) => {
      const userEmail = task.user.email;
      if (!acc[userEmail]) acc[userEmail] = [];
      acc[userEmail].push(task);
      return acc;
    }, {});

    // Send emails
    for (const email in tasksByUser) {
      const tasks = tasksByUser[email];
      const taskList = tasks
        .map(task => `  - ${task.title} (Due: ${new Date(task.duedate).toLocaleDateString()})`)
        .join('\n');

      const mailOptions = {
        from: '"TaskMate" <marvaa.003@gmail.com>',
        to: email,
        subject: 'Reminder: Upcoming Task Deadlines',
        text: `Hello,\n\nYou have tasks due today:\n\n${taskList}\n\nDon't forget to complete them!`
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Sent reminder email to ${email}`);
    }
  } catch (error) {
    console.error('❌ Error sending task reminders:', error);
  }
});

console.log('Task notification service started.');
