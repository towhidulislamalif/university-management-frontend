import { Button, Col, Form, Row } from 'antd';
import { useCreateAcademicFacultyMutation } from '../../../redux/features/admin/academic.management.api';
import { IAcademicFaculty, IResponse } from '../../../types';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import SelectInput from '../../../components/ui/form/SelectInput';
import { facultyNameOptions } from '../../../constants';
import toast from 'react-hot-toast';

const CreateAcademicFaculty = () => {
  // create academic faculty
  const [createFaculty] = useCreateAcademicFacultyMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const facultyData = {
        name: data.name,
      };

      const { data: res, error } = (await createFaculty(
        facultyData
      )) as IResponse<IAcademicFaculty>;
      console.log('🚀 ~ onSubmit ~ res:', res);

      if (error) {
        // Handle API error
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        // Handle success
        toast.success('Faculty created successfully');
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
            Create Faculty
          </Title> */}
          <FormWrapper onSubmit={onSubmit}>
            <Row gutter={16}>
              <Col span={24}>
                <SelectInput
                  name="name"
                  options={facultyNameOptions}
                  placeholder="Name"
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

export default CreateAcademicFaculty;
