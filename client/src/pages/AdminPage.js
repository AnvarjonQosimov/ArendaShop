import "../styles/AdminPage.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { useTranslation } from "react-i18next";

function AdminPage() {
  const adminEmail = "anvarqosimov153@gmail.com";

  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [selectedPost, setSelectedPost] = useState(null);
  const [viewsData, setViewsData] = useState([]);
  const [timeRange, setTimeRange] = useState("3m");
  const [darkMode, setDarkMode] = useState(false);

  const generateViewsStats = () => {
    const map = {};

    const now = new Date();
    let startDate = new Date();

    if (timeRange === "1d") startDate.setDate(now.getDate() - 1);
    if (timeRange === "7d") startDate.setDate(now.getDate() - 7);
    if (timeRange === "30d") startDate.setDate(now.getDate() - 30);
    if (timeRange === "3m") startDate.setMonth(now.getMonth() - 3);

    posts.forEach((post) => {
      if (!post.createdAt) return;

      const date = new Date(post.createdAt);

      if (isNaN(date)) return;

      if (date < startDate) return;

      const formatted = date.toISOString().split("T")[0];

      if (!map[formatted]) map[formatted] = 0;

      map[formatted] += post.views || 0;
    });

    const result = Object.keys(map)
      .map((date) => ({
        date,
        views: map[date],
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setViewsData(result);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const loadUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));

    const data = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));

    setUsers(data);
  };

  const loadPosts = async () => {
    try {
      const res = await axios.get("https://arendashop.onrender.com/api/post/get");
      setPosts(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUsers();
    loadPosts();
  }, []);

  useEffect(() => {
    generateViewsStats();
  }, [posts, timeRange]);

  // const deletePost = async (id) => {
  //   try {
  //     await axios.delete(`https://arendashop.onrender.com/api/post/delete/${id}`);

  //     setPosts(posts.filter((post) => post._id !== id));
  //     setSelectedPost(null);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getOwner = (ownerId) => {
    const user = users.find((u) => u.uid === ownerId);
    return user ? `${user.name} (${user.email})` : "Unknown";
  };

  const filteredPosts = [...posts]
    .filter((p) =>
      p.initInformation?.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortType === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (sortType === "views") {
        return (b.views || 0) - (a.views || 0);
      }

      return 0;
    });

    // console.log(posts[0]);

    const { t } = useTranslation();

  if (!currentUser || currentUser.email !== adminEmail) {
    return (
      <div className="AdminPage">
        <h2>{t("accessDenied")}</h2>
      </div>
    );
  }

  return (
    <div className={`AdminPage ${darkMode ? "dark" : ""}`}>
      <h1>{t("adminpage")}</h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="darkmode"
        style={{
          marginBottom: "20px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          // background: darkMode ? "#101b3f" : "#949bd7",
          position: "absolute",
          top: "100px",
          right: "20px",
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="stats">
        <div className="statBox">
          <h3>{t("users")}</h3>
          <p>{users.length}</p>
        </div>

        <div className="statBox">
          <h3>{t("posts")}</h3>
          <p>{posts.length}</p>
        </div>

        <div className="statBox">
          <h3>{t("totalViews")}</h3>
          <p>{posts.reduce((acc, post) => acc + (post.views || 0), 0)}</p>
        </div>
      </div>

      <div className="analytics">
        <div className="analyticsHeader">
          <div>
            <h2>{t("totalvisitors")}</h2>
            <p>{t("totalForTheSelectedPeriod")}</p>
          </div>

          <div className="timeFilter">
            <button
              className={timeRange === "3m" ? "active" : ""}
              onClick={() => setTimeRange("3m")}
            >
              {t("last3months")}
            </button>

            <button
              className={timeRange === "30d" ? "active" : ""}
              onClick={() => setTimeRange("30d")}
            >
              {t("last30days")}
            </button>

            <button
              className={timeRange === "7d" ? "active" : ""}
              onClick={() => setTimeRange("7d")}
            >
              {t("last7days")}
            </button>

            <button
              className={timeRange === "1d" ? "active" : ""}
              onClick={() => setTimeRange("1d")}
            >
              {t("last1day")}
            </button>
          </div>
        </div>

        <div className="chartBox">
          {/* <pre>{JSON.stringify(viewsData, null, 2)}</pre> */}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={viewsData}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" tick={{ fontSize: 12 }} />

              <YAxis tick={{ fontSize: 12 }} />

              <Tooltip
                contentStyle={{
                  background: "#1c1c1c",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                }}
              />

              <Area
                className="chartArea"
                type="monotone"
                dataKey="views"
                stroke="#4f6fe4"
                fill="url(#colorViews)"
                strokeWidth={2}
              />

              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="controls">
        <input
          placeholder="Search post..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="newest">{t("newest")}</option>
          <option value="views">{t("mostViewed")}</option>
        </select>
      </div>

      <div className="cardsList">
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="adminCard"
            onClick={() => setSelectedPost(post)}
          >
            <h3>{post.initInformation}</h3>
            <p>{post.additInformation}</p>

            <span>👁 {post.views || 0}</span>
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="modalOverlay" onClick={() => setSelectedPost(null)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPost.initInformation}</h2>

            <p>{selectedPost.additInformation}</p>

            <p>
              <b>{t("owner")}:</b> {(selectedPost.ownerId)}
            </p>

            <p>
              <b>{t("views")}:</b> {selectedPost.views || 0}
            </p>

            <p>
              <b>{t("date")}:</b>{" "}
              {selectedPost.createdAt
                ? new Date(selectedPost.createdAt).toLocaleString()
                : "Unknown"}
            </p>

            <div className="modalButtons">
              <button
                className="closeBtn"
                onClick={() => setSelectedPost(null)}
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;