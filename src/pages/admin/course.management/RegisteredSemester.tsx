import {
  Button,
  Dropdown,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from 'antd';
import {
  useGetSemesterQuery,
  useUpdateSemesterStatusMutation,
} from '../../../redux/features/admin/course.management.api';
import { IResponse, ISemester } from '../../../types';
import { useState } from 'react';
import moment from 'moment';
import toast from 'react-hot-toast';

type DataType = Partial<ISemester>;

const RegisteredSemester = () => {
  const [updateStatus] = useUpdateSemesterStatusMutation();
  const [semesterId, setSemesterId] = useState('');

  const handleUpdateStatus = async ({ key }: { key: string }) => {
    try {
      const statusData = {
        id: semesterId,
        data: { status: key },
      };
      const { data: res, error } = (await updateStatus(
        statusData
      )) as IResponse<ISemester>;
      console.log('🚀 ~ onSubmit ~ res:', res);
      if (error) {
        // Handle API error
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        // Handle success
        toast.success('Semester status updated successfully');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong!');
    }
  };

  const items = [
    { label: 'Upcoming', key: 'UPCOMING' },
    { label: 'Ongoing', key: 'ONGOING' },
    { label: 'Ended', key: 'ENDED' },
  ];

  const menuProps = {
    items,
    onClick: handleUpdateStatus,
  };

  const { data: semesterData, isLoading } = useGetSemesterQuery(undefined);

  const dataSource: DataType[] | undefined = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: academicSemester.name,
      status,
      startDate: moment(new Date(startDate)).format('DD-MM-YYYY'),
      endDate: moment(new Date(endDate)).format('DD-MM-YYYY'),
    })
  );

  const columns: TableColumnsType<DataType> = [
    { title: 'Semester Name', dataIndex: 'name' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (item) => {
        let color;
        switch (item) {
          case 'UPCOMING':
            color = 'blue';
            break;
          case 'ONGOING':
            color = 'green';
            break;
          case 'ENDED':
            color = 'red';
            break;
          default:
            color = 'default-color';
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    { title: 'Start date', dataIndex: 'startDate' },
    { title: 'End date', dataIndex: 'endDate' },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <>
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button type="primary" onClick={() => setSemesterId(record.key)}>
              Update Status
            </Button>
          </Dropdown>
        </>
      ),
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

export default RegisteredSemester;
