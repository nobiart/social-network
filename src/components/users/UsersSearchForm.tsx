import {Field, Form, Formik} from "formik";
import {UsersFilterType} from "../../redux/usersReducer.ts";
import {memo} from "react";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/usersSelectors.ts";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  console.log(values);
  return errors;
}

type UsersSearchFormPropsType = {
  onChangeFilter: (filter: UsersFilterType) => void,
}

type FriendFormType = "null" | "true" | "false";
type UsersFilterValuesType = {
  term: string,
  friend: FriendFormType,
}

export const UsersSearchForm = memo(({onChangeFilter}: UsersSearchFormPropsType) => {
  const filter = useSelector(getUsersFilter);
  const handleSubmit = (values: UsersFilterValuesType, {setSubmitting}: {
    setSubmitting: (isSubmitting: boolean) => void
  }) => {
    const filter: UsersFilterType = {
      term: values.term,
      friend: values.friend === "true" ? true : values.friend === "false" ? false : null,
    }
    onChangeFilter(filter);
    setSubmitting(false);
  };

  const initialValues: UsersFilterValuesType = {
    term: filter.term,
    friend: String(filter.friend) as FriendFormType,
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={usersSearchFormValidate}
        onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <Field type="text" name="term"/>
            <Field as="select" name="friend" placeholder="Select user type">
              <option value="null">All</option>
              <option value="true">Followed Only</option>
              <option value="false">Non-Followed Only</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
});
