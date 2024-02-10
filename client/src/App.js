import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // console.log(tasks);

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"Holiday tick list"} getData={getData} />
          <p className="user-email">Welcome Back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
