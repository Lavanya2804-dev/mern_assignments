const API = import.meta.env.VITE_API_URL;
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";

import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
const [editText, setEditText] = useState("");
const [replyingTo, setReplyingTo] = useState(null);
const [replyText, setReplyText] = useState("");
  useEffect(() => {
  if (article) {
    setComments(article.comments || []);
    return;
  }

  const getArticle = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `${API}/user-api/article/${id}`,
        { withCredentials: true }
      );

      setArticle(res.data.payload);

      // ✅ ADD THIS
      setComments(res.data.payload.comments || []);
    } catch (err) {
      setError(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  getArticle();
}, [id]);

 const formatDate = (date) => {
  if (!date) return "—";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "—";

  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
};

  // delete article
  const deleteArticle = async () => {
  try {
    await axios.patch(
      `${API}/author-api/articles/${id}/status`,
      { isArticleActive: false },
      { withCredentials: true }
    );

    navigate("/author-profile/articles");

  } catch (err) {
    setError(err.response?.data?.error);
  }
};

  const editArticle = (articleObj) => {
  navigate(`/edit-article/${articleObj._id}`, { state: articleObj });
};

const addComment = async () => {
  try {
    let res;

    // ✅ AUTHOR API
    if (user?.role === "AUTHOR") {
      res = await axios.post(
        `${API}/author-api/comment/${article._id}`,
        { comment },
        { withCredentials: true }
      );
    } 
    // ✅ USER API
    else {
      res = await axios.put(
        `${API}/user-api/articles`,
        {
          articleId: article._id,
          comment: comment
        },
        { withCredentials: true }
      );
    }

    // ✅ update UI
    setComments((prev) => [...prev, res.data.payload]);
    setComment("");

  } catch (err) {
    console.error(err);
  }
};

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  const handleDeleteComment = async (commentId) => {
  try {
    if (!window.confirm("Delete this comment?")) return;

    await axios.delete(
      `${API}/author-api/comment/${article._id}/${commentId}`,
      { withCredentials: true }
    );

    // ✅ update UI instantly
    setComments((prev) =>
      prev.filter((c) => c._id !== commentId)
    );

  } catch (err) {
    console.log(err);
  }
};

const handleEditComment = async (commentId) => {
  try {
    const res = await axios.put(
      `${API}/author-api/comment/${article._id}/${commentId}`,
      { comment: editText },
      { withCredentials: true }
    );

    setComments((prev) =>
      prev.map((c) =>
        c._id === commentId ? { ...c, comment: editText } : c
      )
    );

    setEditingId(null);
    setEditText("");

  } catch (err) {
    console.log(err);
  }
};

const handleReply = async (commentId) => {
  try {
    const res = await axios.post(
      `${API}/author-api/reply/${article._id}/${commentId}`,
      { comment: replyText },
      { withCredentials: true }
    );

    setComments((prev) =>
      prev.map((c) =>
        c._id === commentId
          ? {
              ...c,
              replies: [...(c.replies || []), res.data.payload],
            }
          : c
      )
    );

    setReplyingTo(null);
    setReplyText("");

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className={articlePageWrapper}>
      {/* Header */}
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase`}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>✍️ {article.author?.firstName || "Author"}</div>

          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* Content */}
      <div className={articleContent}>{article.content}</div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={deleteBtn} onClick={deleteArticle}>
            Delete
          </button>
        </div>
      )}

{/* Footer */}
<div className={articleFooter}>
  Last updated: {formatDate(article.updatedAt)}
</div>

<hr style={{ marginTop: "30px" }} />

{/* COMMENT BOX */}
<div
  style={{
    marginTop: "20px",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  }}
>
  <h3 style={{ marginBottom: "10px" }}>💬 Add a Comment</h3>

  <textarea
    style={{
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      resize: "none",
      minHeight: "80px",
      outline: "none"
    }}
    placeholder="Write your thoughts..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
  />

  <button
    onClick={addComment}
    style={{
      marginTop: "12px",
      padding: "8px 18px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#4f46e5",
      color: "white",
      cursor: "pointer",
      fontWeight: "500"
    }}
  >
    Post Comment
  </button>
  
</div>

{/* COMMENTS LIST */}
<div style={{ marginTop: "30px" }}>
  <h3 style={{ fontWeight: "600" }}>All Comments</h3>

  {comments.length === 0 ? (
    <p style={{ color: "gray", marginTop: "10px" }}>
      No comments yet. Be the first one 🚀
    </p>
  ) : (
    comments.map((c, index) => (
  <div
    key={c._id}
    style={{
      display: "flex",
      gap: "12px",
      marginTop: "15px",
      padding: "15px",
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      border: "1px solid #eee",
      boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
    }}
  >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: "#6366f1",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold"
          }}
        >
          {c.user?.firstName?.charAt(0) || "U"}
        </div>

<div style={{ flex: 1 }}>

  {/* 🔹 TOP ROW */}
  <div style={{ display: "flex", justifyContent: "space-between" }}>

    {/* LEFT: name + role */}
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontWeight: "600" }}>
        {c.user?.firstName || "User"}
      </span>

      <span
        style={{
          fontSize: "11px",
          padding: "3px 10px",
          borderRadius: "20px",
          backgroundColor:
            c.user?.role === "AUTHOR" ? "#dbeafe" : "#ede9fe",
          color:
            c.user?.role === "AUTHOR" ? "#1d4ed8" : "#6d28d9",
          fontWeight: "500"
        }}
      >
        {c.user?.role || "USER"}
      </span>
    </div>

    {/* RIGHT: actions */}
    {(c.user?._id === user?._id ||
      article.author?._id === user?._id) && (
      <div style={{ display: "flex", gap: "10px" }}>

        {/* EDIT */}
        {c.user?._id === user?._id && (
          <button
            onClick={() => {
              setEditingId(c._id);
              setEditText(c.comment);
            }}
            style={{
              fontSize: "12px",
              color: "#2563eb",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            ✏️ Edit
          </button>
        )}

        {/* DELETE */}
        <button
          onClick={() => handleDeleteComment(c._id)}
          style={{
            fontSize: "12px",
            color: "red",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
        >
          🗑 Delete
        </button>

      </div>
    )}
  </div>

  {/* 🔹 COMMENT / EDIT BOX */}
  {editingId === c._id ? (
    <div style={{ marginTop: "8px" }}>
      <textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <div style={{ marginTop: "6px", display: "flex", gap: "8px" }}>
        <button onClick={() => handleEditComment(c._id)}>Save</button>
        <button onClick={() => setEditingId(null)}>Cancel</button>
      </div>
    </div>
  ) : (
    <p style={{ marginTop: "8px", lineHeight: "1.5" }}>
      {c.comment}
    </p>
  )}
  <button
  onClick={() => setReplyingTo(c._id)}
  style={{
    fontSize: "12px",
    color: "#6b7280",
    background: "none",
    border: "none",
    cursor: "pointer",
    marginTop: "6px"
  }}
>
  💬 Reply
</button>

{/* Reply Input */}
{replyingTo === c._id && (
  <div style={{ marginTop: "8px" }}>
    <input
      value={replyText}
      onChange={(e) => setReplyText(e.target.value)}
      placeholder="Write a reply..."
      style={{
        width: "100%",
        padding: "6px",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    />

    <button
      onClick={() => handleReply(c._id)}
      style={{ marginTop: "5px" }}
    >
      Send
    </button>
  </div>
)}

{/* 🔽 ALWAYS SHOW REPLIES */}
{c.replies?.length > 0 && (
  <div style={{ marginTop: "10px" }}>
    {c.replies.map((r) => (
      <div
        key={r._id}
        style={{
          marginLeft: "50px",
          marginTop: "10px",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "#f9fafb",
          border: "1px solid #eee"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontWeight: "600", fontSize: "13px" }}>
            {r.user?.firstName || "User"}
          </span>

          <span
            style={{
              fontSize: "10px",
              padding: "2px 8px",
              borderRadius: "20px",
              backgroundColor:
                r.user?.role === "AUTHOR" ? "#dbeafe" : "#ede9fe",
              color:
                r.user?.role === "AUTHOR" ? "#1d4ed8" : "#6d28d9"
            }}
          >
            {r.user?.role || "USER"}
          </span>
        </div>

        <p style={{ marginTop: "4px", fontSize: "13px" }}>
          {r.comment}
        </p>
      </div>
    ))}
  </div>
)}

</div>
      </div>
    ))
  )}
</div>

</div> 

  );
}

export default ArticleByID;