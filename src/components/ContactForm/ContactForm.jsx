import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const initialValues = {
    name: '',
    number: '',
  };
  const nameFieldId = useId();
  const numberFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  const ContactFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too short!')
      .max(50, 'Too long!')
      .required('Required!'),
    number: Yup.string()
      .min(3, 'Too short!')
      .max(50, 'Too long!')
      .required('Required!')
      .matches(/^[0-9-]+$/, 'Numbers and dashes only'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.form}>
        <div className={css.fieldwrap}>
          <label htmlFor={nameFieldId} className={css.label}>
            Name{' '}
            <ErrorMessage name="name" component="span" className={css.error} />
          </label>
          <Field
            name="name"
            type="text"
            id={nameFieldId}
            className={css.input}
          />
        </div>

        <div className={css.fieldwrap}>
          <label htmlFor={numberFieldId} className={css.label}>
            Number{' '}
            <ErrorMessage
              name="number"
              component="span"
              className={css.error}
            />
          </label>
          <Field
            name="number"
            type="tel"
            id={numberFieldId}
            className={css.input}
          />
        </div>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
