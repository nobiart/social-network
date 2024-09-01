const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

export const profileReducer = (state: any, action: any) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: String(state.posts.length + 2),
        message: state.newPostText,
        likes: 0
      }

      state.posts.push(newPost);
      state.newPostText = '';
      return state;
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText;
      return state;
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const updatePostTextActionCreator = (text: string) => (
  {
    type: UPDATE_NEW_POST_TEXT,
    newText: text
  }
);
