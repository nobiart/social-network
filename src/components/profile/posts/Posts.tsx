import s from './Posts.module.css';
import {Post} from "./post/Post.tsx";
import {Form, Formik} from "formik";
import {TextArea} from "../../common/form/FormControl.tsx";
import {maxLengthCreator} from "../../../utils/validators.ts";
import {memo} from "react";

const AddPostForm = (props: any) => {
  const maxLength = maxLengthCreator(10);

  return (
    <Formik
      initialValues={{newPost: ""}}
      onSubmit={(values, {setSubmitting}) => {
        console.log(values.newPost);
        props.onSubmit(values.newPost);
        setSubmitting(false);
        values.newPost = "";
      }}
    >
      {({values, handleSubmit, handleChange}) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <TextArea
              label="Message"
              name="newPost"
              type="textarea"
              value={values.newPost}
              onChange={handleChange}
              validate={maxLength}
            />
          </div>
          <button type="submit" className={s.submit}>Add New Post</button>
        </Form>
      )}
    </Formik>
  )
}

export const Posts = memo((props: any) => {
  return (
    <div className={s.container}>
      <h3>My Posts</h3>
      <AddPostForm onSubmit={props.addPost}/>
      <div className={s.posts}>
        {props.posts.map((p: any) => <Post key={p.id} {...p} />)}
      </div>
    </div>
  )
});
