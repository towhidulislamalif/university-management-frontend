import { Alert, Button, Card, Tag } from 'antd';
import {
  useEnrollCourseMutation,
  useGetOfferedCoursesQuery,
} from '../../redux/features/student/student.course.api';
import { IEnrolledCourse, IResponse } from '../../types';
import toast from 'react-hot-toast';

type TCourse = {
  [key: string]: any;
};

const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetOfferedCoursesQuery(undefined);
  // console.log('🚀 ~ OfferedCourse ~ offeredCourseData:', offeredCourseData);

  const [courseEnroll] = useEnrollCourseMutation();

  const modifiedData = offeredCourseData?.data?.reduce((acc: TCourse, data) => {
    const {
      _id,
      section,
      days,
      startTime,
      endTime,
      course: { title },
    } = data;

    if (!acc[title]) {
      acc[title] = { title, info: [] };
    }

    acc[title].info.push({
      _id,
      days,
      startTime,
      endTime,
      section,
    });

    return acc;
  }, {});

  // console.log(modifiedData);
  // console.log('Object', Object.values(modifiedData ? modifiedData : {}));

  const modifiedCourseData = Object.values(modifiedData ? modifiedData : {});

  if (!modifiedCourseData.length) {
    return <Alert message="No course found" type="info" />;
  }

  const handleEnroll = async (id: string) => {
    console.log('🚀 ~ handleEnroll ~ id:', id);
    try {
      const enrollData = {
        offeredCourse: id,
      };
      const { data: res, error } = (await courseEnroll(
        enrollData
      )) as IResponse<IEnrolledCourse>;
      console.log('🚀 ~ onSubmit ~ res:', res);
      if (error) {
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        toast.success('Course enrolled successfully');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <Card
      style={{
        maxWidth: 'md',
        padding: '16px',
        margin: 'auto',
        backgroundColor: 'white',
        border: '1px solid #e8e8e8',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      {modifiedCourseData.map((data) => {
        return (
          <div>
            <h2 style={{ fontWeight: 'bold', color: '#333' }}>
              ⭐ {data.title}
            </h2>

            {data.info.map((data: any) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '1rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    <Tag
                      style={{
                        fontSize: '12px',
                        color: '#333',
                        // textDecoration: 'underline',
                        transition: 'color 0.3s',
                        outline: 'none',
                      }}
                    >
                      Section {data.section}
                    </Tag>
                    <Tag
                      style={{
                        fontSize: '12px',
                        color: '#333',
                        // textDecoration: 'underline',
                        transition: 'color 0.3s',
                        outline: 'none',
                      }}
                    >
                      Start Time {data.startTime}
                    </Tag>
                    <Tag
                      style={{
                        fontSize: '12px',
                        color: '#333',
                        // textDecoration: 'underline',
                        transition: 'color 0.3s',
                        outline: 'none',
                      }}
                    >
                      End Time {data.endTime}
                    </Tag>
                  </div>

                  <Button
                    onClick={() => handleEnroll(data._id)}
                    style={{
                      fontSize: '12px',
                      backgroundColor: '#1890ff',
                      color: 'white',
                      borderRadius: '8px',
                      transition: 'background-color 0.3s',
                      outline: 'none',
                    }}
                  >
                    Enroll
                  </Button>
                </div>
              );
            })}
          </div>
        );
      })}
    </Card>
  );
};

export default OfferedCourse;
