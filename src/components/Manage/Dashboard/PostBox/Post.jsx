import React, { useState } from "react";
import styles from "./Post.module.scss";

const Post = ({ id, content, category, postedBy, vinSlot, expanded, onClick }) => {
  const [expandedPost, setExpandedPost] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState(null);
  const [newPost, setNewPost] = useState({
    content: "",
    category: ""
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditMode(false);
    setEditedPost(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setEditedPost((prevState) => ({
        ...prevState,
        [name]: value
      }));
  };

  const handleConfirm = () => {
    if (editMode) {
      console.log("Edited post:", editedPost);
    } else {
      console.log("New post:", newPost);
    }
    setNewPost({
      content: "",
      category: ""
    });
    togglePopup();
  };

  const handleEdit = (post) => {
    setEditedPost(post);
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (postId) => {
    console.log("Deleted post with ID:", postId);
  };

  const postData = [
    {
      "id": 17,
      "content": "Jumped a new personal best in long jump training! Feeling the progress. #trackandfield",
      "category": "Sports"
    },
    {
      "id": 18,
      "content": "Aced a difficult downward facing dog pose in yoga. Flexibility goals achieved! #yogaflow",
      "category": "Health & Fitness"
    },
    {
      "id": 19,
      "content": "Smashed my personal record in the 100 meter swim. Feeling the accomplishment! #watersports",
      "category": "Sports"
    },
    {
      "id": 20,
      "content": "Hiked through a beautiful forest trail. Nature is my therapy. #getoutside",
      "category": "Nature"
    },
    {
      "id": 21,
      "content": "Practicing mindfulness during meditation. Finding inner peace and focus. #wellbeing",
      "category": "Health & Wellness"
    },
    {
      "id": 22,
      "content": "Dominated a game of badminton with friends. Competitive spirit alive! #friendlycompetition",
      "category": "Sports"
    },
    {
      "id": 23,
      "content": "Trying a new core workout routine. Feeling the burn, but loving the challenge. #fitnessmotivation",
      "category": "Health & Fitness"
    },
    {
      "id": 24,
      "content": "Went rock climbing with some friends. Teamwork and pushing my limits. #adventuretime",
      "category": "Adventure"
    },
    {
      "id": 25,
      "content": "Scored the winning goal in the final seconds of the soccer game! Pure joy! #champions",
      "category": "Sports"
    },
    {
      "id": 26,
      "content": "Taking a yoga class to stretch and unwind after a long week. #selfcare",
      "category": "Health & Fitness"
    }
  ];
  

  return (
    <div className={styles["post-container"]}>
      <div className={styles["label-container"]}>
        <h2>Posts</h2>
      </div>
      <div className={styles["post-list"]}>
        {postData.map((post) => (
          <div
            key={post.id}
            className={styles["post"]}
            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
          >
            <div className={styles["post-content"]}>{post.content}</div>
            {expandedPost === post.id && (
              <div className={styles["post-details"]}>
                <div>
                  <strong>Category:</strong> {post.category}
                </div>
                <div className={styles["button-container"]}>
                  <button
                    className={styles["edit-button"]}
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles["delete-button"]}
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles["add-button"]} onClick={togglePopup}>
        +
      </div>
      {showPopup && (
        <div className={styles["modal"]}>
          <div className={styles["popup-box"]}>
            <h2>{editMode ? "Edit Post" : "Add Post"}</h2>
            <form>
              <div className={styles["input-group"]}>
                <label className={styles["label"]} htmlFor="content">
                  Content:
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={editMode ? editedPost.content : newPost.content}
                  onChange={handleChange}
                  rows={5}
                />
              </div>
              <div className={styles["input-group"]}>
                <label className={styles["label"]} htmlFor="category">
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={editMode ? editedPost.category : newPost.category}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["button-container"]}>
                <button
                  className={styles["confirm-button"]}
                  type="button"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button
                  className={styles["cancel-button"]}
                  type="button"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
