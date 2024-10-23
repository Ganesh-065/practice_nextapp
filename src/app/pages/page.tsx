// "use client"; // Add this line at the top to indicate it's a Client Component

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../redux/store";
// import {
//   fetchPosts,
//   createPost,
//   updatePost,
//   deletePost,
//   selectPosts,
//   selectPostsLoading,
//   selectHasMore,
// } from "../redux/postsSlice";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   CircularProgress,
// } from "@mui/material";
// import styles from "./HomePage.module.css"; // Assuming you add CSS for styling

// const HomePage = () => {
//   const dispatch = useAppDispatch();
//   const posts = useSelector(selectPosts);
//   const loading = useSelector(selectPostsLoading);
//   const hasMore = useSelector(selectHasMore);
//   const [page, setPage] = useState(1);

//   console.log("1");

//   // State for dialog
//   const [open, setOpen] = useState(false);
//   const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
//   const [updatedPostContent, setUpdatedPostContent] = useState({
//     title: "",
//     body: "",
//   });

//   useEffect(() => {
//     dispatch(fetchPosts({ page }));
//   }, [dispatch, page]);

//   // Infinite scroll logic using IntersectionObserver
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const target = entries[0];
//         if (target.isIntersecting && hasMore && !loading) {
//           setPage((prevPage) => prevPage + 1); // Load next page
//         }
//       },
//       {
//         rootMargin: "100px", // Trigger when the user is 100px before reaching the bottom
//       }
//     );

//     const sentinel = document.querySelector("#scroll-sentinel");
//     if (sentinel) {
//       observer.observe(sentinel);
//     }

//     return () => {
//       if (sentinel) {
//         observer.unobserve(sentinel);
//       }
//     };
//   }, [loading, hasMore]);

//   const handleCreatePost = () => {
//     dispatch(createPost({ title: "New Post", body: "This is a new post." }));
//   };

//   const handleUpdatePost = () => {
//     if (selectedPostId !== null) {
//       dispatch(
//         updatePost({ id: selectedPostId, updatedPost: updatedPostContent })
//       );
//       setOpen(false);
//     }
//   };

//   const handleDeletePost = (id: number) => {
//     dispatch(deletePost(id));
//   };

//   const handleOpenDialog = (post: {
//     id: number;
//     title: string;
//     body: string;
//   }) => {
//     setSelectedPostId(post.id);
//     setUpdatedPostContent({ title: post.title, body: post.body });
//     setOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setOpen(false);
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Posts</h1>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleCreatePost}
//         className={styles.createButton}
//       >
//         Create Post
//       </Button>
//       <List className={styles.postList}>
//         {posts.map((post) => (
//           <ListItem key={post.id} className={styles.postItem}>
//             <ListItemText primary={post.title} secondary={post.body} />
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => handleOpenDialog(post)}
//             >
//               Update
//             </Button>
//             <Button
//               variant="outlined"
//               color="error"
//               onClick={() => handleDeletePost(post.id)}
//             >
//               Delete
//             </Button>
//           </ListItem>
//         ))}
//       </List>
//       {/* Dialog for updating post */}
//       <Dialog
//         open={open}
//         onClose={handleCloseDialog}
//         disablePortal
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>Edit Post</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Title"
//             value={updatedPostContent.title}
//             onChange={(e) =>
//               setUpdatedPostContent({
//                 ...updatedPostContent,
//                 title: e.target.value,
//               })
//             }
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Body"
//             value={updatedPostContent.body}
//             onChange={(e) =>
//               setUpdatedPostContent({
//                 ...updatedPostContent,
//                 body: e.target.value,
//               })
//             }
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdatePost} color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//       {loading && <CircularProgress className={styles.loadingSpinner} />}
//       <div id="scroll-sentinel"></div>{" "}
//       {/* This is the sentinel for intersection observer */}
//     </div>
//   );
// };

// export default HomePage;

"use client"; // Add this line at the top to indicate it's a Client Component

import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  selectPosts,
  selectPostsLoading,
  selectHasMore,
} from "../redux/postsSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import styles from "./HomePage.module.css"; // Assuming you add CSS for styling
import { useEffect, useState } from "react";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const hasMore = useSelector(selectHasMore);
  const [page, setPage] = useState(1);

  // State for dialog
  const [open, setOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [updatedPostContent, setUpdatedPostContent] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    dispatch(fetchPosts({ page }));
  }, [dispatch, page]);

  // Infinite scroll logic using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      },
      {
        rootMargin: "100px", // Trigger when the user is 100px before reaching the bottom
      }
    );

    const sentinel = document.querySelector("#scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [loading, hasMore]);

  const handleCreatePost = () => {
    dispatch(createPost({ title: "New Post", body: "This is a new post." }));
  };

  const handleUpdatePost = () => {
    if (selectedPostId !== null) {
      dispatch(
        updatePost({ id: selectedPostId, updatedPost: updatedPostContent })
      );
      setOpen(false);
    }
  };

  const handleDeletePost = (id: number) => {
    dispatch(deletePost(id));
  };

  const handleOpenDialog = (post: {
    id: number;
    title: string;
    body: string;
  }) => {
    setSelectedPostId(post.id);
    setUpdatedPostContent({ title: post.title, body: post.body });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Posts</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreatePost}
        className={styles.createButton}
      >
        Create Post
      </Button>
      <List className={styles.postList}>
        {posts.map((post) => (
          <ListItem key={post.id} className={styles.postItem}>
            <ListItemText primary={post.title} secondary={post.body} />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleOpenDialog(post)}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeletePost(post.id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      {/* Dialog for updating post */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={updatedPostContent.title}
            onChange={(e) =>
              setUpdatedPostContent({
                ...updatedPostContent,
                title: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Body"
            value={updatedPostContent.body}
            onChange={(e) =>
              setUpdatedPostContent({
                ...updatedPostContent,
                body: e.target.value,
              })
            }
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdatePost} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {loading && <CircularProgress className={styles.loadingSpinner} />}
      <div id="scroll-sentinel"></div>{" "}
      {/* This is the sentinel for intersection observer */}
    </div>
  );
};

export default HomePage;

// import { GetServerSideProps, NextPage } from "next";

// interface HomeProps {
//   message: string;
// }

// const Home: NextPage<HomeProps> = ({ message }) => {
//   return <div>{message}</div>;
// };

// // Prefetching data at request time
// export const getServerSideProps: GetServerSideProps = async () => {
//   // Simulating a fetch from an API or database
//   const res = await fetch("http://localhost:3000/api/hello");
//   const data = await res.json();

//   return {
//     props: {
//       message: data.message || "No message found",
//     },
//   };
// };

// export default Home;
