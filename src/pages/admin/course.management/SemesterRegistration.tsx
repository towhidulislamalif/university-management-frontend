import { Button, Col, Form, Row } from 'antd';
import { useGetAcademicSemesterQuery } from '../../../redux/features/admin/academic.management.api';
import { useCreateSemesterMutation } from '../../../redux/features/admin/course.management.api';
import { IResponse, ISemester } from '../../../types';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import TextInput from '../../../components/ui/form/TextInput';
import SelectInput from '../../../components/ui/form/SelectInput';
import DateInput from '../../../components/ui/form/DateInput';
import { statusOptions } from '../../../constants';
import toast from 'react-hot-toast';

const SemesterRegistration = () => {
  const { data: academicSemesterData } = useGetAcademicSemesterQuery(undefined);

  const academicSemesterOptions = academicSemesterData?.data?.map(
    (academicSemester) => ({
      label: academicSemester.name,
      value: academicSemester._id,
    })
  );

  const [createSemester] = useCreateSemesterMutation();

  const onSubmit = async (data: FieldValues) => {
    // console.log('🚀 ~ onSubmit ~ data:', data);
    try {
      const semesterData = {
        academicSemester: data.academicSemester,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate,
        minCredit: Number(data.minCredit),
        maxCredit: Number(data.maxCredit),
      };

      const { data: res, error } = (await createSemester(
        semesterData
      )) as IResponse<ISemester>;
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
                  name="academicSemester"
                  options={academicSemesterOptions}
                  placeholder="Academic Semester"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <SelectInput
                  name="status"
                  options={statusOptions}
                  placeholder="Status"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <DateInput
                  name="startDate"
                  placeholder="Start Date"
                  size="middle"
                  inputStyle={{ width: '100%' }}
                />
              </Col>
              <Col span={24}>
                <DateInput
                  name="endDate"
                  placeholder="End Date"
                  size="middle"
                  inputStyle={{ width: '100%' }}
                />
              </Col>
              <Col span={24}>
                <TextInput
                  type="text"
                  name="minCredit"
                  placeholder="Min Credit"
                  size="middle"
                />
              </Col>
              <Col span={24}>
                <TextInput
                  type="text"
                  name="maxCredit"
                  placeholder="Max Credit"
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

export default SemesterRegistration;
