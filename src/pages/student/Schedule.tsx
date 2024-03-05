import { Row, Col, Typography, Divider, Card, Tag, Alert } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { useGetEnrolledCoursesQuery } from '../../redux/features/student/student.course.api';

const { Title } = Typography;

const Schedule = () => {
  const { data: enrolledCourseData } = useGetEnrolledCoursesQuery(undefined);

  if (!enrolledCourseData?.data.length) {
    return <Alert message="No enrolled course found" type="info" />;
  }

  return (
    <div style={{ background: '#fff', padding: '24px' }}>
      {enrolledCourseData?.data.map((enrolledCourse: any) => (
        <Row key={enrolledCourse._id} gutter={[16, 16]}>
          <Col span={24}>
            <Title level={2}>My Enrolled Course</Title>
            <Divider />
            <Card
              title={<span>⭐ {enrolledCourse.course.title}</span>}
              bordered={false}
            >
              <div>
                {enrolledCourse.offeredCourse.days.map(
                  (day: any, index: any) => (
                    <Tag
                      key={index}
                      style={{ fontSize: '16px', padding: '3px' }}
                    >
                      {day}
                    </Tag>
                  )
                )}
              </div>
              <Tag
                style={{ fontSize: '16px', marginTop: '10px', padding: '3px' }}
              >
                Start Time {enrolledCourse.offeredCourse.startTime}
              </Tag>
              <Tag
                style={{ fontSize: '16px', marginTop: '10px', padding: '3px' }}
              >
                End Time {enrolledCourse.offeredCourse.endTime}
              </Tag>
            </Card>
            <Card title={<span>🙎 Teacher</span>} bordered={false}>
              <Tag style={{ fontSize: '16px', padding: '3px' }}>
                {enrolledCourse.faculty.fullName}
              </Tag>
            </Card>
            <Card
              title={
                <span>
                  <BulbOutlined /> Grade
                </span>
              }
              bordered={false}
            >
              <Tag color="green" style={{ fontSize: '16px', padding: '3px' }}>
                Grade {enrolledCourse.grade}
              </Tag>
              <Tag color="green" style={{ fontSize: '16px', padding: '3px' }}>
                Points {enrolledCourse.gradePoints}
              </Tag>
            </Card>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Schedule;
