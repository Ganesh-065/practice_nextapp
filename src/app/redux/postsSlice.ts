// redux/postsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Define the Post interface
interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

// Define the API URL (Replace this with your actual API endpoint)
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Async thunk to fetch posts with pagination
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page }: { page: number }) => {
    const response = await fetch(`${API_URL}/api/posts?page=${page}&limit=3`);
    return (await response.json()) as Post[];
  }
);

// Thunk to create a post (CREATE operation)
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost: Omit<Post, "id">) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    return (await response.json()) as Post;
  }
);

// Thunk to update a post (UPDATE operation)
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({
    id,
    updatedPost,
  }: {
    id: number;
    updatedPost: Omit<Post, "id">;
  }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });
    return (await response.json()) as Post;
  }
);

// Thunk to delete a post (DELETE operation)
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload];
        state.page += 1;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      // CREATE operation
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // UPDATE operation
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      // DELETE operation
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;

// Selectors
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectHasMore = (state: any) => state.posts.hasMore;
export const selectPostsError = (state: RootState) => state.posts.error;
