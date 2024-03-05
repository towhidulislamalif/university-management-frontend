import { Button, Col, Form, Row } from 'antd';
import {
  useCreateAcademicDepartmentMutation,
  useGetAcademicFacultyQuery,
} from '../../../redux/features/admin/academic.management.api';
import { IAcademicDepartment, IResponse } from '../../../types';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import SelectInput from '../../../components/ui/form/SelectInput';
import { departmentNameOptions } from '../../../constants';
import toast from 'react-hot-toast';

const CreateAcademicDepartment = () => {
  // create academic department
  const [createDepartment] = useCreateAcademicDepartmentMutation();

  // get academic faculty
  const { data: facultyData } = useGetAcademicFacultyQuery(undefined);

  const facultyOptions = facultyData?.data?.map((faculty) => ({
    label: faculty.name,
    value: faculty._id,
  }));

  const onSubmit = async (data: FieldValues) => {
    try {
      const departmentData = {
        name: data.name,
        academicFaculty: data.academicFaculty,
      };

      const { data: res, error } = (await createDepartment(
        departmentData
      )) as IResponse<IAcademicDepartment>;
      console.log('🚀 ~ onSubmit ~ res:', res);

      if (error) {
        // Handle API error
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        // Handle success
        toast.success('Department created successfully');
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
          {/* <Title
            level={2}
            style={{ textAlign: 'center', marginBottom: '24px' }}
          >
            Create Department
          </Title> */}
          <FormWrapper onSubmit={onSubmit}>
            <Row gutter={16}>
              <Col span={24}>
                <SelectInput
                  name="name"
                  options={departmentNameOptions}
                  placeholder="Name"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <SelectInput
                  name="academicFaculty"
                  options={facultyOptions}
                  placeholder="Academic Faculty"
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

export default CreateAcademicDepartment;
