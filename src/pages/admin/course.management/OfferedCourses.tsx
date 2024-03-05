import React from 'react';
import { Table, TableColumnsType, TableProps, Tag } from 'antd';
import { useGetOfferCourseQuery } from '../../../redux/features/admin/course.management.api';
// import { IOfferingCourse } from '../../../types';

// Define the data type for better clarity
type DataType = Partial<any>;

const OfferedCourses: React.FC = () => {
  // Fetch data using react-query
  const { data: offerCourseData, isLoading } =
    useGetOfferCourseQuery(undefined);

  // Map fetched data for table display
  const data: DataType[] | undefined = offerCourseData?.data?.map(
    ({
      _id,
      semesterRegistration,
      academicFaculty,
      academicDepartment,
      course,
      faculty,
      section,
      maxCapacity,
      days,
      startTime,
      endTime,
    }) => ({
      key: _id,
      semesterRegistration: semesterRegistration.status,
      academicFaculty: academicFaculty.name,
      academicDepartment: academicDepartment.name,
      course: course.title,
      teacher: faculty.fullName,
      section,
      maxCapacity,
      days,
      startTime,
      endTime,
    })
  );

  // Define columns for the Ant Design Table component
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Semester Registration',
      dataIndex: 'semesterRegistration',
    },
    {
      title: 'Academic Faculty',
      dataIndex: 'academicFaculty',
    },
    {
      title: 'Academic Department',
      dataIndex: 'academicDepartment',
    },
    {
      title: 'Course',
      dataIndex: 'course',
    },
    {
      title: 'Teacher',
      dataIndex: 'teacher',
    },
    {
      title: 'Section',
      dataIndex: 'section',
    },
    {
      title: 'Max Capacity',
      dataIndex: 'maxCapacity',
    },
    {
      title: 'Schedule',
      dataIndex: 'days',
      render: (item: string[]) => (
        <>
          {item.map((i) => (
            <Tag style={{ margin: '0 0 3px 0' }} color="green" key={i}>
              {i}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
    },
  ];

  // Define the onChange handler for the Table component
  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('Table Change:', pagination, filters, sorter, extra);
  };

  // Render the Ant Design Table component
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      onChange={onChange}
    />
  );
};

export default OfferedCourses;
