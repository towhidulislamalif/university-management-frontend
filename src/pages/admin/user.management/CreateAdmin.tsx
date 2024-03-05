import { Button, Col, Divider, Form, Row } from 'antd';
import { useCreateAdminMutation } from '../../../redux/features/admin/user.management.api';
import { IAdmin, IResponse } from '../../../types';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import TextInput from '../../../components/ui/form/TextInput';
import SelectInput from '../../../components/ui/form/SelectInput';
import DateInput from '../../../components/ui/form/DateInput';
import UploadImage from '../../../components/ui/form/UploadImage';
import toast from 'react-hot-toast';
import { bloodGroupOptions, genderOptions } from '../../../constants';

const CreateAdmin = () => {
  const [createAdmin] = useCreateAdminMutation();

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    console.log('Form Data:', data);

    const adminData = {
      password: 'teacher123',
      admin: {
        designation: 'Administrator',
        ...data,
      },
    };

    // Prepare form data for submission
    const formData = new FormData();
    formData.append('data', JSON.stringify(adminData));
    formData.append('file', data.image);

    try {
      const { data: res, error } = (await createAdmin(
        formData
      )) as IResponse<IAdmin>;

      console.log('🚀 ~ onSubmit ~ res:', res);

      if (error) {
        // Handle API error
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        // Handle success
        toast.success('Admin created successfully');
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
          {/* Uncomment the following lines if you have a Title component */}
          {/* <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
            Admin Form
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

export default CreateAdmin;
