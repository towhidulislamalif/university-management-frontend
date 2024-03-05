import { Button, Col, Form, Row } from 'antd';
import {
  useCreateCourseMutation,
  useGetCoursesQuery,
} from '../../../redux/features/admin/course.management.api';
import { ICourse, IResponse } from '../../../types';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';

import toast from 'react-hot-toast';
import TextInput from '../../../components/ui/form/TextInput';
import SelectInput from '../../../components/ui/form/SelectInput';

const CreateCourse = () => {
  const [createCourse] = useCreateCourseMutation();
  const { data: courseData, isLoading } = useGetCoursesQuery(undefined);

  const preRequisiteCourseOptions = courseData?.data?.map((course) => ({
    label: course.title,
    value: course._id,
  }));

  const onSubmit = async (data: FieldValues) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    try {
      const coursePayload = {
        title: data.title,
        prefix: data.prefix,
        code: Number(data.code),
        credits: Number(data.credits),
        preRequisiteCourses: data.preRequisiteCourses
          ? data.preRequisiteCourses.map(
              (preRequisiteCourse: Partial<ICourse>) => ({
                course: preRequisiteCourse,
                isDeleted: false,
              })
            )
          : [],
        isDeleted: false,
      };
      const { data: res, error } = (await createCourse(
        coursePayload
      )) as IResponse<ICourse>;
      console.log('🚀 ~ onSubmit ~ res:', res);
      if (error) {
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        toast.success('Course created successfully');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Row justify="center">
        <Col span={24} md={12} lg={8}>
          <FormWrapper onSubmit={onSubmit}>
            <Row gutter={16}>
              <Col span={24}>
                <TextInput
                  type="text"
                  name="title"
                  placeholder="Title"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <TextInput
                  type="text"
                  name="prefix"
                  placeholder="Prefix"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <TextInput
                  type="text"
                  name="code"
                  placeholder="Code"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <TextInput
                  type="text"
                  name="credits"
                  placeholder="Credits"
                  size="middle"
                />
              </Col>
              {preRequisiteCourseOptions && (
                <Col span={24}>
                  <SelectInput
                    name="preRequisiteCourses"
                    options={preRequisiteCourseOptions}
                    mode="multiple"
                    placeholder="Prerequisite Courses"
                    size="middle"
                  />
                </Col>
              )}
            </Row>

            <Form.Item style={{ marginTop: '24px' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={isLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </FormWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default CreateCourse;
