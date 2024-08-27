import {renderEntireTree} from "./render.tsx";
import {addPost, state} from "./redux/state.ts";

renderEntireTree({state, addPost});
