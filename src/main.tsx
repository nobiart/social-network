import {renderEntireTree} from "./render.tsx";
import {addPost, state, updateNewPostText} from "./redux/state.ts";

renderEntireTree({state, addPost, updateNewPostText});
