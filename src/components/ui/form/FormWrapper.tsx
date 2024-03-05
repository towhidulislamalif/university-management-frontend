import React from 'react';
import { Form } from 'antd';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

interface FormWrapperProps {
  children: React.ReactNode;
  formStyle?: React.CSSProperties;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: Record<string, unknown>;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  formStyle,
  onSubmit,
  defaultValues,
}) => {
  const methods = useForm({
    defaultValues: defaultValues || {},
  });

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    // Reset the form to default values after submission
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form
        layout="vertical"
        onFinish={methods.handleSubmit(submitHandler)}
        style={formStyle}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default FormWrapper;
