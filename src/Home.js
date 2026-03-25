import { useState, useEffect } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  const getPosts = async () => {
    const res = await fetch("http://localhost:3000/posts");
    const data = await res.json();
    setPosts(data);
  };

  const createPost = async () => {
    await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    setContent("");
    getPosts();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h2>Anonymous Board</h2>

      <button onClick={logout}>Logout</button>

      <br /><br />

      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
      />

      <button onClick={createPost}>Post</button>

      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.content} (👍 {p.upvotes})</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;