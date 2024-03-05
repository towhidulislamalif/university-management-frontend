import { Button, Col, Divider, Form, Row, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import {
  useGetTeacherQuery,
  useUpdateTeacherMutation,
} from '../../../redux/features/admin/user.management.api';
import { useGetAcademicDepartmentQuery } from '../../../redux/features/admin/academic.management.api';
import { IResponse, ITeacher } from '../../../types';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import TextInput from '../../../components/ui/form/TextInput';
import SelectInput from '../../../components/ui/form/SelectInput';
import {
  bloodGroupOptions,
  designationOptions,
  genderOptions,
} from '../../../constants';
import toast from 'react-hot-toast';

const UpdateTeacherInfo = () => {
  const { id } = useParams();
  // console.log('🚀 ~ UpdateStudentInfo ~ id:', id);
  const { data: teacherData, isLoading } = useGetTeacherQuery(id);

  const [updateTeacher] = useUpdateTeacherMutation();

  const { data: departmentData } = useGetAcademicDepartmentQuery(undefined);
  const departmentOptions = departmentData?.data?.map((department) => ({
    label: department.name,
    value: department._id,
  }));

  if (isLoading) {
    return <Skeleton />;
  }

  // default values
  const defaultStudentValues = {
    name: {
      firstName: teacherData?.data?.name.firstName,
      middleName: teacherData?.data?.name.middleName,
      lastName: teacherData?.data?.name.lastName,
    },
    gender: teacherData?.data?.gender,
    bloogGroup: teacherData?.data?.bloogGroup,
    email: teacherData?.data?.email,
    contactNo: teacherData?.data?.contactNo,
    emergencyContactNo: teacherData?.data?.emergencyContactNo,
    presentAddress: teacherData?.data?.presentAddress,
    permanentAddress: teacherData?.data?.permanentAddress,
  };

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    const teacherData = {
      id: id,
      data: {
        faculty: data,
      },
    };

    try {
      const { data: res, error } = (await updateTeacher(
        teacherData
      )) as IResponse<ITeacher>;

      console.log('🚀 ~ onSubmit ~ res:', res);

      if (error) {
        // Handle API error
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        // Handle success
        toast.success('Teacher update successfully');
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
        Teacher Information Update
      </Title> */}
          <FormWrapper onSubmit={onSubmit} defaultValues={defaultStudentValues}>
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
            <Divider>Profession</Divider>
            <Row gutter={16}>
              <Col span={24} md={12} lg={8}>
                <SelectInput
                  name="designation"
                  options={designationOptions}
                  placeholder="Designation"
                  size="middle"
                />
              </Col>
              <Col span={24} md={12} lg={8}>
                <SelectInput
                  name="academicDepartment"
                  options={departmentOptions}
                  placeholder="Academic department"
                  size="middle"
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

export default UpdateTeacherInfo;
