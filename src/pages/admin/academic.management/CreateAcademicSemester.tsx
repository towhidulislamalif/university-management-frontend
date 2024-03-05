import { Button, Col, Form, Row } from 'antd';
import { useCreateAcademicSemesterMutation } from '../../../redux/features/admin/academic.management.api';
import { IAcademicSemester, IResponse } from '../../../types';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import SelectInput from '../../../components/ui/form/SelectInput';
import { monthOptions, semesterOptions, yearOptions } from '../../../constants';
import toast from 'react-hot-toast';

const CreateAcademicSemester = () => {
  // create academic semesters
  const [createSemester] = useCreateAcademicSemesterMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const selectedSemester = semesterOptions[data?.name - 1]?.label;

      const semesterData = {
        name: selectedSemester,
        year: data.year?.toString(),
        code: data.name,
        startMonth: data.startMonth,
        endMonth: data.endMonth,
      };

      const { data: res, error } = (await createSemester(
        semesterData
      )) as IResponse<IAcademicSemester>;
      console.log('🚀 ~ onSubmit ~ res:', res);

      if (error) {
        // Handle API error
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        // Handle success
        toast.success('Semester created successfully');
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
            Create Semester
          </Title> */}
          <FormWrapper onSubmit={onSubmit}>
            <Row gutter={16}>
              <Col span={24}>
                <SelectInput
                  name="name"
                  options={semesterOptions}
                  placeholder="Name"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <SelectInput
                  name="year"
                  options={yearOptions}
                  placeholder="Year"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <SelectInput
                  name="startMonth"
                  options={monthOptions}
                  placeholder="Start Month"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <SelectInput
                  name="endMonth"
                  options={monthOptions}
                  placeholder="End Month"
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

export default CreateAcademicSemester;
