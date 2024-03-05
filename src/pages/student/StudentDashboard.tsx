import { Col, Row, Typography } from 'antd';
import { useAppSelector } from '../../redux/hooks';
import { useCurrentUser } from '../../redux/features/auth/apiSlice';

const { Title } = Typography;

const StudentDashboard = () => {
  const user = useAppSelector(useCurrentUser);

  return (
    <section
      style={{
        backgroundColor: '#fff',
        padding: '4rem 0',
        textAlign: 'center',
      }}
    >
      <Row align="middle" justify="center">
        <Col span={24}>
          <Title
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '1rem',
            }}
          >
            Welcome to {user?.role} Dashboard
          </Title>
        </Col>
      </Row>
    </section>
  );
};

export default StudentDashboard;
