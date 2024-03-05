import { Button, Col, Divider, Form, Row } from 'antd';
import { useCreateStudentMutation } from '../../../redux/features/admin/user.management.api';
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicSemesterQuery,
} from '../../../redux/features/admin/academic.management.api';
import { IResponse, IStudent } from '../../../types';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import TextInput from '../../../components/ui/form/TextInput';
import SelectInput from '../../../components/ui/form/SelectInput';
import DateInput from '../../../components/ui/form/DateInput';
import UploadImage from '../../../components/ui/form/UploadImage';
import { bloodGroupOptions, genderOptions } from '../../../constants';
import toast from 'react-hot-toast';

const CreateStudent = () => {
  const [createStudent] = useCreateStudentMutation();

  const { data: semesterData, isFetching } =
    useGetAcademicSemesterQuery(undefined);
  const semesterOptions = semesterData?.data?.map((semester) => ({
    label: `${semester.name}-${semester.year}`,
    value: semester._id,
  }));

  const { data: departmentData } = useGetAcademicDepartmentQuery(undefined);
  const departmentOptions = departmentData?.data?.map((department) => ({
    label: department.name,
    value: department._id,
  }));

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    console.log('Form Data:', data);

    const studentData = {
      password: 'student123',
      student: data,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(studentData));
    formData.append('file', data.image);

    try {
      const { data: res, error } = (await createStudent(
        formData
      )) as IResponse<IStudent>;

      console.log('🚀 ~ onSubmit ~ res:', res);

      if (error) {
        // Handle API error
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        // Handle success
        toast.success('Student created successfully');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Row justify="center">
        <Col span={24} md={18} lg={16}>
          {/* <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
            Student Form
          </Title> */}
          <FormWrapper onSubmit={onSubmit}>
            <Divider>Personal Info</Divider>
            <Row gutter={16}>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="name.firstName"
                  placeholder="First name"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="name.middleName"
                  placeholder="Middle name"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="name.lastName"
                  placeholder="Last name"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <DateInput
                  name="dateOfBirth"
                  placeholder="Date of birth"
                  size="middle"
                  inputStyle={{ width: '100%' }}
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <SelectInput
                  name="gender"
                  options={genderOptions}
                  placeholder="Gender"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <SelectInput
                  name="bloogGroup"
                  options={bloodGroupOptions}
                  placeholder="Blood Group"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <UploadImage
                  type="file"
                  name="image"
                  placeholder="Upload image"
                  size="middle"
                />
              </Col>
            </Row>
            <Divider>Contact Info</Divider>
            <Row gutter={16}>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="email"
                  name="email"
                  placeholder="Email address"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="contactNo"
                  placeholder="Contact number"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="emergencyContactNo"
                  placeholder="Emergency contact number"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="presentAddress"
                  placeholder="Present address"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="permanentAddress"
                  placeholder="Permanent address"
                  size="middle"
                />
              </Col>
            </Row>
            <Divider>Parent Info</Divider>
            <Row gutter={16}>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="guardian.fatherName"
                  placeholder="Father name"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="guardian.fatherOccupation"
                  placeholder="Father Occupation"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="guardian.fatherContactNo"
                  placeholder="Father Contact number"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="guardian.motherName"
                  placeholder="Mother name"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="guardian.motherOccupation"
                  placeholder="Mother Occupation"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="guardian.motherContactNo"
                  placeholder="Mother Contact number"
                  size="middle"
                />
              </Col>
            </Row>
            <Divider>Local Parent Info</Divider>
            <Row gutter={16}>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="localGuardian.name"
                  placeholder="Name"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="localGuardian.occupation"
                  placeholder="Occupation"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="localGuardian.contactNo"
                  placeholder="Contact number"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <TextInput
                  type="text"
                  name="localGuardian.address"
                  placeholder="Address"
                  size="middle"
                />
              </Col>
            </Row>
            <Divider>Academic Info</Divider>
            <Row gutter={16}>
              <Col span={24} md={12} lg={8}>
                <SelectInput
                  name="admissionSemester"
                  options={semesterOptions}
                  placeholder="Admission semester"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <SelectInput
                  name="academicDepartment"
                  options={departmentOptions}
                  placeholder="Academic department"
                  size="middle"
                  disabled={isFetching}
                />
              </Col>
            </Row>
            {/* Submit button */}
            <Form.Item>
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

export default CreateStudent;
