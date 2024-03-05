import { Button, Col, Form, Row } from 'antd';
import { useGetEnrolledCoursesForTeacherQuery } from '../../redux/features/teacher/faculty.course.api';
import FormWrapper from '../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import SelectInput from '../../components/ui/form/SelectInput';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';

const MyCourse = () => {
  const { data: teacherEnrolledCoursesData } =
    useGetEnrolledCoursesForTeacherQuery(undefined);

  const navigate = useNavigate();

  const semesterOptions = teacherEnrolledCoursesData?.data?.map(
    (teacherEnrolledCourse) => ({
      label: `${teacherEnrolledCourse.academicSemester.name}- ${teacherEnrolledCourse.academicSemester.year}`,
      value: teacherEnrolledCourse.semesterRegistration._id,
    })
  );

  const courseOptions = teacherEnrolledCoursesData?.data?.map(
    (teacherEnrolledCourse) => ({
      label: teacherEnrolledCourse.course.title,
      value: teacherEnrolledCourse.course._id,
    })
  );

  const onSubmit = async (data: FieldValues) => {
    // console.log('🚀 ~ onSubmit ~ data:', data);
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Row justify="center">
        <Col span={24} md={12} lg={8}>
          <Title
            level={3}
            style={{ textAlign: 'center', marginBottom: '24px' }}
          >
            Fill this form and see your students
          </Title>
          <FormWrapper onSubmit={onSubmit}>
            <Row gutter={16}>
              <Col span={24}>
                <SelectInput
                  name="semesterRegistration"
                  options={semesterOptions}
                  placeholder="Semester Registration"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <SelectInput
                  name="course"
                  options={courseOptions}
                  placeholder="Course"
                  size="middle"
                />
              </Col>
            </Row>

            <Form.Item style={{ marginTop: '24px' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
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

export default MyCourse;
