// Create two Contexts: one for the current user, and one for the list of all users
const userContext = React.createContext();
const userListContext = React.createContext();

// ========== Root component of the app ==========
function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [userList, setUserList] = React.useState([]);
  const [theme, setTheme] = React.useState(true); // true = light, false = dark

  //========== Update body class based on theme ==========
  React.useEffect(() => {
    document.body.classList.toggle('dark', !theme);
    document.body.classList.toggle('light', theme);
  }, [theme]);

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      <userListContext.Provider value={{ userList, setUserList }}>
        <aside className="sidebar card">
          <Panel theme={theme} setTheme={setTheme} />
        </aside>
        <main className="main">
          <Card />
        </main>
      </userListContext.Provider>
    </userContext.Provider>
  );
}

// ========== Main content area where selected user's tasks are shown ==========
function Card() {
  const { currentUser } = React.useContext(userContext);

  return (
    <div className="card">
      <h1 id="mainTitle">
        {currentUser.name ? `Tasks of ${currentUser.name}` : "Select a user"}
      </h1>
      <TaskSection />
    </div>
  );
}

// ========== Task input and list section (only visible when a user is selected) ==========
function TaskSection() {
  const { currentUser, setCurrentUser } = React.useContext(userContext);
  const [input, setInput] = React.useState("");
  const [taskId, setTaskId] = React.useState(0);

  // ========== Hide section if no user selected ==========
  if (!currentUser.name) return null;

  // ========== Add new task to current user's list ==========
  function addTask() {
    if (!input.trim()) return;

    const updatedTasks = [...currentUser.tasks, {
      id: taskId,
      name: input,
      done: false
    }];

    setCurrentUser({ ...currentUser, tasks: updatedTasks });
    setTaskId(taskId + 1);
    setInput("");
  }

  return (
    <div id="taskSection">
      <ul id="taskList">
        {currentUser.tasks?.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
      <input
        id="newTaskInput"
        placeholder="New task..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

// Single task item with toggle, edit, and delete functionality
function Task({ task }) {
  const { currentUser, setCurrentUser } = React.useContext(userContext);

  // ========== Toggle task completion ==========
  function toggle() {
    const updatedTasks = currentUser.tasks.map(t =>
      t.id === task.id ? { ...t, done: !t.done } : t
    );
    setCurrentUser({ ...currentUser, tasks: updatedTasks });
  }

  // ========== Edit task name ========== 
  function edit() {
    const name = prompt("Edit task:", task.name);
    if (name?.trim()) {
      const updatedTasks = currentUser.tasks.map(t =>
        t.id === task.id ? { ...t, name } : t
      );
      setCurrentUser({ ...currentUser, tasks: updatedTasks });
    }
  }

  // ========== Delete task ==========
  function remove() {
    const updatedTasks = currentUser.tasks.filter(t => t.id !== task.id);
    setCurrentUser({ ...currentUser, tasks: updatedTasks });
  }

  return (
    <li className={task.done ? "completed" : ""}>
      <span onClick={toggle} style={{ cursor: "pointer" }}>{task.name}</span>
      <div className="actions">
        <button onClick={edit}>✏️</button>
        <button onClick={remove}>🗑️</button>
      </div>
    </li>
  );
}

// Sidebar panel that handles users, theme toggle, and user info
function Panel({ theme, setTheme }) {
  const { userList, setUserList } = React.useContext(userListContext);
  const { currentUser, setCurrentUser } = React.useContext(userContext);
  const [input, setInput] = React.useState("");
  const [userId, setUserId] = React.useState(0);

  // ========== Add new user to the list ==========
  function addUser() {
    if (!input.trim()) return;

    setUserList([...userList, {
      id: userId,
      name: input,
      tasks: []
    }]);
    setUserId(userId + 1);
    setInput("");
  }

  return (
    <>
      <h2>Users</h2>
      <ul id="taskList">
        {userList.map(user => (
          <UserTag key={user.id} user={user} />
        ))}
      </ul>
      <input
        id="newUserInput"
        placeholder="New user..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>
      <UserInfo />
      <button id="themeToggleBtn" onClick={() => setTheme(!theme)}>
        🌙/☀️ Theme
      </button>
    </>
  );
}

// ========== Single user item in the sidebar ==========
function UserTag({ user }) {
  const { currentUser, setCurrentUser } = React.useContext(userContext);
  const { userList, setUserList } = React.useContext(userListContext);

  // ========== Select user and update previous user's tasks ==========
  function selectUser() {
    if (user.id === currentUser.id) return;

    const updatedList = userList.map(u =>
      u.id === currentUser.id ? currentUser : u
    );
    setUserList(updatedList);
    setCurrentUser(user);
  }

  return (
    <li
      style={{
        cursor: "pointer",
        fontWeight: user.id === currentUser.id ? "bold" : "normal"
      }}
      onClick={selectUser}
    >
      {user.name}
    </li>
  );
}

// Shows selected user's name, stats, and a deselect button
function UserInfo() {
  const { currentUser, setCurrentUser } = React.useContext(userContext);
  const { userList, setUserList } = React.useContext(userListContext);

  if (!currentUser.name) return null;

  const completed = currentUser.tasks?.filter(t => t.done).length;

  // ==========Save current user's data and deselect ==========
  function deselect() {
    const updatedList = userList.map(u =>
      u.id === currentUser.id ? currentUser : u
    );
    setUserList(updatedList);
    setCurrentUser({});
  }

  return (
    <div id="userInfo">
      <hr />
      <p id="userName">{currentUser.name}</p>
      <p id="userStats">{`Tasks: ${completed} / ${currentUser.tasks?.length} completed`}</p>
      <button onClick={deselect}>Deselect</button>
    </div>
  );
}

// ========== Render the root React app ==========
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
