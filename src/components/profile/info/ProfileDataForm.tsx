import {Form, Formik} from "formik";
import {Input, TextArea} from "../../common/form/FormControl.tsx";

interface IContactsData {
  github: string,
  vk: string,
  facebook: string,
  instagram: string,
  twitter: string,
  website: string,
  youtube: string,
  mainLink: string,
}

interface IFormData {
  fullName: string,
  aboutMe: string,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  contacts: IContactsData,
}

interface ILoginFormProps {
  profile: any,
  handleSubmit: (formData: IFormData, setStatus: (status?: any) => void) => Promise<void>;
}

export const ProfileDataForm = ({profile, handleSubmit}: ILoginFormProps) => {
  return (
    <Formik
      initialValues={profile}
      onSubmit={(values, {setSubmitting, setStatus}) => {
        console.log(values);
        handleSubmit(values, setStatus);
        setSubmitting(false);
      }}
    >
      {({values, handleSubmit, handleChange, isSubmitting, status}) => (
        <Form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
          <TextArea
            label="About Me"
            type="textarea"
            name="aboutMe"
            value={values.aboutMe}
            onChange={handleChange}
          />
          <Input
            label="Is Looking For A Job?"
            type="checkbox"
            name="lookingForAJob"
            value={values.lookingForAJob}
            onChange={handleChange}
          />
          <TextArea
            label="Job Description"
            type="textarea"
            name="lookingForAJobDescription"
            value={values.lookingForAJobDescription}
            onChange={handleChange}
          />
          {Object.keys(profile.contacts ?? {}).map(key => {
            return (
              <Input
                key={key}
                label={key}
                type="text"
                name={`contacts.${key}`}
                value={values.contacts[key]}
                onChange={handleChange}
              />
            )
          })}
          <div>{status?.error}</div>
          <div>
            <button type="submit" disabled={isSubmitting}>Save</button>
          </div>
        </Form>
      )}
    </Formik>
  )
};
