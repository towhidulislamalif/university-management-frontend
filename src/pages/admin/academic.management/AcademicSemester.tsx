import { useState } from 'react';
import { Table, TableColumnsType, TableProps } from 'antd';
import { useGetAcademicSemesterQuery } from '../../../redux/features/admin/academic.management.api';
import { IAcademicSemester, IParams } from '../../../types';

type DataType = Partial<IAcademicSemester>;

const AcademicSemester = () => {
  const [filterParams, setFilterParams] = useState<IParams[]>([]);

  const { data: semesterData, isLoading } =
    useGetAcademicSemesterQuery(filterParams);

  const data: DataType[] | undefined = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        { text: 'Autumn', value: 'Autumn' },
        { text: 'Summer', value: 'Summer' },
        { text: 'Fall', value: 'Fall' },
      ],
    },
    {
      title: 'Year',
      dataIndex: 'year',
      sorter: (a, b) => Number(a.year) - Number(b.year),
    },
    {
      title: 'Start Month',
      dataIndex: 'startMonth',
    },
    {
      title: 'End Month',
      dataIndex: 'endMonth',
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    const params: IParams[] = [];

    if (extra.action === 'filter') {
      filters.name?.forEach((item) => {
        params.push({ name: 'name', value: item });
      });
    }

    // Set filter parameters
    setFilterParams(params);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      onChange={onChange}
    />
  );
};

export default AcademicSemester;
