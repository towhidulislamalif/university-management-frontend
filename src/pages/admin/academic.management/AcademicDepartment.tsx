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
  useGetAcademicDepartmentQuery,
  useUpdateAcademicDepartmentMutation,
} from '../../../redux/features/admin/academic.management.api';
import { IAcademicDepartment, IResponse } from '../../../types';
import FormWrapper from '../../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import SelectInput from '../../../components/ui/form/SelectInput';
import { departmentNameOptions } from '../../../constants';
import toast from 'react-hot-toast';

type DataType = Partial<IAcademicDepartment>;

const AcademicDepartment = () => {
  const { data: departmentData, isLoading } =
    useGetAcademicDepartmentQuery(undefined);
  const dataSource: DataType[] | undefined = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      faculty: academicFaculty?.name,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Department Name',
      dataIndex: 'name',
    },
    {
      title: 'Faculty Name',
      dataIndex: 'faculty',
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
  const [updateDepartment] = useUpdateAcademicDepartmentMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const onSubmit = async (values: FieldValues) => {
    try {
      const departmentData = {
        id: data?.key, // Ensure data exists before accessing properties
        data: {
          name: values.name,
        },
      };

      const { data: res, error } = (await updateDepartment(
        departmentData
      )) as IResponse<IAcademicDepartment>;
      console.log('🚀 ~ onSubmit ~ res:', res);

      if (error) {
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        toast.success('Department updated successfully');
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
        title="Department"
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
                      name="name"
                      options={departmentNameOptions}
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

export default AcademicDepartment;
