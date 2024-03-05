// Import necessary dependencies and components
import { useState } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { IOfferingCourse, IResponse } from '../../../types';
import {
  useCreateOfferCourseMutation,
  useGetAssignedTeacherQuery,
  useGetCoursesQuery,
  useGetSemesterQuery,
} from '../../../redux/features/admin/course.management.api';
import { dayOptions } from '../../../constants';
import TimeInput from '../../../components/ui/form/TimeInput';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import SelectInput from '../../../components/ui/form/SelectInput';
import SelectInputWithWatch from '../../../components/ui/form/SelectInputWithWatch';
import TextInput from '../../../components/ui/form/TextInput';
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicFacultyQuery,
} from '../../../redux/features/admin/academic.management.api';
import moment from 'moment';
import toast from 'react-hot-toast';

const OfferCourse = () => {
  // State for selected course id
  const [courseId, setCourseId] = useState('');

  // Mutation for creating an offer course
  const [createOfferCourse] = useCreateOfferCourseMutation();

  // Query data for various form inputs
  const { data: semesterRegData } = useGetSemesterQuery(undefined);
  const semesterRegOptions = semesterRegData?.data?.map((semesterReg) => ({
    label: semesterReg.academicSemester.name,
    value: semesterReg._id,
  }));

  const { data: academicFacultyData } = useGetAcademicFacultyQuery(undefined);
  const academicFacultyOptions = academicFacultyData?.data?.map(
    (academicFaculty) => ({
      label: academicFaculty.name,
      value: academicFaculty._id,
    })
  );

  const { data: academicDepartmentData } =
    useGetAcademicDepartmentQuery(undefined);
  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (academicDepartment) => ({
      label: academicDepartment.name,
      value: academicDepartment._id,
    })
  );

  const { data: courseData } = useGetCoursesQuery(undefined);
  const courseOptions = courseData?.data?.map((course) => ({
    label: course.title,
    value: course._id,
  }));

  const { data: assignedTeacherData } = useGetAssignedTeacherQuery(courseId, {
    skip: !courseId,
  });
  const assignedTeacherOptions = assignedTeacherData?.data?.faculties.map(
    (teacher) => ({
      label: teacher.fullName,
      value: teacher._id,
    })
  );

  // Form submission handler
  const onSubmit = async (data: FieldValues) => {
    // console.log("🚀 ~ onSubmit ~ data:", data)
    try {
      const offerCourseData = {
        ...data,
        section: Number(data.section),
        maxCapacity: Number(data.maxCapacity),
        startTime: moment(new Date(data.startTime)).format('HH:mm'),
        endTime: moment(new Date(data.endTime)).format('HH:mm'),
      };

      // Make the API call to create an offer course
      const { data: res, error } = (await createOfferCourse(
        offerCourseData
      )) as IResponse<IOfferingCourse>;
      console.log('🚀 ~ onSubmit ~ res:', res);

      if (error) {
        // Handle API error
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        // Handle success
        toast.success('Offered Course created successfully');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Row justify="center">
        <Col span={24} style={{ maxWidth: '400px' }}>
          <FormWrapper onSubmit={onSubmit}>
            <Row gutter={16}>
              <Col span={24}>
                <SelectInput
                  name="semesterRegistration"
                  options={semesterRegOptions}
                  placeholder="Semester Registration"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <SelectInput
                  name="academicFaculty"
                  options={academicFacultyOptions}
                  placeholder="Academic Faculty"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <SelectInput
                  name="academicDepartment"
                  options={academicDepartmentOptions}
                  placeholder="Academic Department"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <SelectInputWithWatch
                  name="course"
                  options={courseOptions}
                  onValueChange={setCourseId}
                  placeholder="Course"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <SelectInput
                  name="faculty"
                  options={assignedTeacherOptions}
                  placeholder="Faculty"
                  disabled={!courseId}
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <TextInput
                  type="text"
                  name="section"
                  placeholder="Section"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <TextInput
                  type="text"
                  name="maxCapacity"
                  placeholder="Max Capacity"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <SelectInput
                  name="days"
                  options={dayOptions}
                  mode="multiple"
                  placeholder="Days"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <TimeInput
                  name="startTime"
                  format="HH:mm"
                  placeholder="Start time"
                  size="middle"
                  inputStyle={{ width: '100%' }}
                />
              </Col>
              <Col span={24}>
                <TimeInput
                  name="endTime"
                  format="HH:mm"
                  placeholder="End time"
                  size="middle"
                  inputStyle={{ width: '100%' }}
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

export default OfferCourse;
