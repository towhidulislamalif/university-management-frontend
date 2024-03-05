import React from 'react';
import { Button, Input, Table } from 'antd';
import type { TableColumnType, TableColumnsType, TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useGetAdminsQuery } from '../../../redux/features/admin/user.management.api';
import { IAdmin, IParams } from '../../../types';
import moment from 'moment';

type DataType = Partial<IAdmin>;

type DataIndex = keyof DataType;

const Admins: React.FC = () => {
  const [filterParams, setFilterParams] = React.useState<IParams[]>([]);
  const { data: adminData, isLoading } = useGetAdminsQuery(filterParams);

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          size="small"
          style={{ width: '100%' }}
        >
          Search
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      fixed: 'left',
      width: 150,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      fixed: 'left',
      width: 150,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNo',
      key: 'contactNo',
      width: 150,
    },
    {
      title: 'Present Address',
      dataIndex: 'presentAddress',
      key: 'presentAddress',
      width: 250,
    },
  ];

  const data: DataType[] | undefined = adminData?.data?.map(
    ({ _id, name, gender, dateOfBirth, email, contactNo, presentAddress }) => ({
      key: _id,
      firstName: name.firstName,
      lastName: name.lastName,
      gender: gender.charAt(0).toUpperCase() + gender.slice(1),
      dateOfBirth: moment(new Date(dateOfBirth)).format('YYYY-MM-DD'),
      email: email,
      contactNo: contactNo,
      presentAddress: presentAddress,
    })
  );

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
    const params: IParams[] = [];

    if (extra.action === 'filter') {
      filters.firstName?.forEach((value) => {
        params.push({ name: 'name.firstName', value: value });
      });
    }
    if (extra.action === 'filter') {
      filters.lastName?.forEach((value) => {
        params.push({ name: 'name.lastName', value: value });
      });
    }
    if (extra.action === 'filter') {
      filters.email?.forEach((value) => {
        params.push({ name: 'email', value: value });
      });
    }
    if (extra.action === 'filter') {
      filters.gender?.forEach((value) => {
        params.push({ name: 'gender', value: value });
      });
    }
    setFilterParams(params);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      bordered
      loading={isLoading}
      scroll={{ x: 1300 }}
      pagination={false}
    />
  );
};

export default Admins;
