import { useState } from 'react';
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  Table,
  TableColumnsType,
  TableProps,
} from 'antd';
import {
  useCreateCourseTeacherMutation,
  useGetCoursesQuery,
} from '../../../redux/features/admin/course.management.api';
import { useGetTeachersQuery } from '../../../redux/features/admin/user.management.api';
import { IAssignTeacher, ICourse, IResponse } from '../../../types';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import SelectInput from '../../../components/ui/form/SelectInput';
import toast from 'react-hot-toast';

type DataType = Partial<ICourse>;

const Courses = () => {
  const { data: courseData, isLoading } = useGetCoursesQuery(undefined);
  const dataSource: DataType[] | undefined = courseData?.data?.map(
    ({ _id, title, prefix, code }) => ({
      key: _id,
      title,
      prefix,
      code,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Prefix',
      dataIndex: 'prefix',
    },
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => <ModalPopup data={record} />,
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('Table Change:', pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      onChange={onChange}
    />
  );
};

// ModalPopup component
const ModalPopup = ({ data }: { data: { key: string } }) => {
  const [addTeacher] = useCreateCourseTeacherMutation();
  const { data: teacherData } = useGetTeachersQuery(undefined);

  const teacherOptions = teacherData?.data?.map((teacher) => ({
    label: teacher.fullName,
    value: teacher._id,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: FieldValues) => {
    try {
      const teacherData = {
        id: data.key,
        data: {
          faculties: values.faculties,
        },
      };

      const { data: res, error } = (await addTeacher(
        teacherData
      )) as IResponse<IAssignTeacher>;
      console.log('🚀 ~ onSubmit ~ res:', res);

      if (error) {
        // Handle API error
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        // Handle success
        toast.success('Assigned Successfully');
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Assign Teacher
      </Button>
      <Modal
        title="Assign Teacher"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={null}
      >
        <div style={{ overflowX: 'hidden' }}>
          <Row justify="center">
            <Col span={24} style={{ maxWidth: '400px' }}>
              <FormWrapper onSubmit={onSubmit}>
                <Row gutter={16}>
                  <Col span={24}>
                    <SelectInput
                      name="faculties"
                      options={teacherOptions}
                      mode="multiple"
                      placeholder="Name"
                      size="middle"
                    />
                  </Col>
                </Row>

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
      </Modal>
    </>
  );
};

export default Courses;
