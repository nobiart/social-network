import s from './Posts.module.css';
import {Post} from "./post/Post.tsx";
import {Field, Form, Formik} from "formik";

const AddPostForm = (props: any) => {
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
            <Field
              name="newPost"
              type="textarea"
              value={values.newPost}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={s.submit}>Add New Post</button>
        </Form>
      )}
    </Formik>
  )
}

export const Posts = (props: any) => {
  return (
    <div className={s.container}>
      <h3>My Posts</h3>
      <AddPostForm onSubmit={props.addPost}/>
      <div className={s.posts}>
        {props.posts.map((p: any) => <Post key={p.id} {...p} />)}
      </div>
    </div>
  )
};
