# **Task Manager React App**

## **Project Overview**

This project is a **Task Manager** built using **React**. The application allows users to:
- Add and manage tasks.
- Toggle between light and dark themes.
- Create and manage multiple users.
- Track the completion status of tasks.

## **Features**

- **Add** and **Delete** users.
- Each user has a list of **tasks** that can be added, edited, completed, or deleted.
- **Conditionally styled tasks** (completed or pending).
- **Sidebar** that dynamically updates based on the selected user, showing task summaries.
- **Toggle between light and dark themes**.

## **Architecture**

### **Component Structure:**

App
├── Card 
|
│ └── TaskSection
|
│ └── Task
|
└── Panel
|
├── UserInfo
|
└── UserTag


### **Component Descriptions:**

- **App:**  
  The **main component** that serves as the root of the application. It holds the global state for `currentUser`, `userList`, and theme. It passes down the data using **Context API**.

- **Card:**  
  The component that displays the main content. It shows the tasks of the selected user and provides functionality to manage them.
  
- **TaskSection:**  
  Handles the **task list** for the selected user. It includes:
  - **AddTask()**: Function to add a new task to the user's task list.

- **Task:**  
  Displays an individual task and its actions:
  - **ToggleTask()**: Marks a task as complete or incomplete.
  - **EditTask()**: Allows editing the task’s name.
  - **DeleteTask()**: Removes a task from the user’s list.

- **Panel:**  
  Manages the **sidebar**, displaying user information and task summary.
  - **AddUser()**: Adds a new user to the user list.
  - **ToggleTheme()**: Allows the user to toggle between **light** and **dark** themes.

- **UserInfo:**  
  Displays information about the **selected user**: name, total tasks, and completed tasks. 

- **UserTag:**  
  A clickable component in the sidebar that displays each user. Clicking it selects that user.

### **Main Functions:**

- **AddUser()**:  
  Adds a new user with a unique ID and updates the `userList` state.

- **ToggleTheme()**:  
  Toggles between the **light** and **dark** themes by changing the `theme` state and applying corresponding styles.

- **DeselectUser()**:  
  Deselects the currently selected user and resets the `currentUser` to an empty object.

- **SelectUser()**:  
  Selects a user from the sidebar and updates the `currentUser` state.

## **State Management and Hooks**

- **currentUser**:  
  Represents the currently selected user. Contains details like the user’s name and their associated tasks.

- **userList**:  
  Holds the list of all users. Each user has a list of tasks.

- **userId**:  
  A unique ID counter for adding new users.

- **taskId**:  
  A unique ID counter for adding new tasks.

- **theme**:  
  Represents the current theme (light or dark). It controls the page’s theme through CSS class toggling.

- **input**:  
  Controls the value of input fields for creating new users and tasks.

## **Installation Instructions**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager-react.git
