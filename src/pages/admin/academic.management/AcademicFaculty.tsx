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
  useGetAcademicFacultyQuery,
  useUpdateAcademicFacultyMutation,
} from '../../../redux/features/admin/academic.management.api';
import { IAcademicFaculty, IResponse } from '../../../types';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import SelectInput from '../../../components/ui/form/SelectInput';
import { facultyNameOptions } from '../../../constants';
import toast from 'react-hot-toast';

type DataType = Partial<IAcademicFaculty>;

const AcademicFaculty = () => {
  const { data: facultyData, isLoading } =
    useGetAcademicFacultyQuery(undefined);
  const dataSource: DataType[] | undefined = facultyData?.data?.map(
    ({ _id, name }) => ({
      key: _id,
      name,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Faculty Name',
      dataIndex: 'name',
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
  const [updateFaculty] = useUpdateAcademicFacultyMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const onSubmit = async (values: FieldValues) => {
    try {
      const facultyData = {
        id: data.key,
        data: {
          name: values.name,
        },
      };

      const { data: res, error } = (await updateFaculty(
        facultyData
      )) as IResponse<IAcademicFaculty>;
      console.log('🚀 ~ onSubmit ~ res:', res);

      if (error) {
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        toast.success('Faculty updated successfully');
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
        Update
      </Button>
      <Modal
        title="Faculty"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={null} // Explicitly set to null
      >
        <div style={{ overflowX: 'hidden' }}>
          <Row justify="center">
            <Col span={24} style={{ maxWidth: '400px' }}>
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

export default AcademicFaculty;
