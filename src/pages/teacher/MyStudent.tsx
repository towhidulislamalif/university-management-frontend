import { useState } from 'react';
import { Button, Col, Form, Modal, Row, Table, TableColumnsType } from 'antd';
import {
  useGetEnrolledCoursesForTeacherQuery,
  useUpdateMarksMutation,
} from '../../redux/features/teacher/faculty.course.api';
import { IResponse } from '../../types';
import FormWrapper from '../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import TextInput from '../../components/ui/form/TextInput';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

type DataType = Partial<any>;

const MyStudent = () => {
  const { semesterId, courseId } = useParams();
  // console.log('🚀 ~ MyStudent ~ courseId:', courseId);
  // console.log('🚀 ~ MyStudent ~ semesterId:', semesterId);

  const { data: teacherEnrolledCoursesData, isLoading } =
    useGetEnrolledCoursesForTeacherQuery([
      {
        name: 'semesterRegistration',
        value: semesterId,
      },
      {
        name: 'course',
        value: courseId,
      },
    ]);

  const data: DataType[] | undefined = teacherEnrolledCoursesData?.data?.map(
    ({ _id, student, courseMarks, semesterRegistration, offeredCourse }) => ({
      key: _id,
      roll: student.id,
      name: student.fullName,
      classTest1: courseMarks.classTest1,
      classTest2: courseMarks.classTest2,
      midTerm: courseMarks.midTerm,
      final: courseMarks.finalTerm,
      student: student._id,
      semesterRegistration: semesterRegistration._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Roll',
      dataIndex: 'roll',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Course Marks',
      children: [
        {
          title: 'Class Test 1',
          dataIndex: 'classTest1',
        },
        {
          title: 'Class Test 2',
          dataIndex: 'classTest2',
        },
        {
          title: 'Mid Term',
          dataIndex: 'midTerm',
        },
        {
          title: 'Final',
          dataIndex: 'final',
        },
      ],
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (record) => <ModalPopup data={record} />,
    },
  ];

  return (
    <Table columns={columns} dataSource={data} bordered loading={isLoading} />
  );
};

// ModalPopup component
const ModalPopup = ({ data }: { data: Record<string, unknown> }) => {
  // console.log('🚀 ~ ModalPopup ~ data:', data);
  const [updateMarks] = useUpdateMarksMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: FieldValues) => {
    console.log('🚀 ~ onSubmit ~ values:', values);
    try {
      const updateMarksData = {
        student: data.student,
        semesterRegistration: data.semesterRegistration,
        offeredCourse: data.offeredCourse,
        courseMarks: {
          classTest1: Number(values.classTest1),
          classTest2: Number(values.classTest2),
          midTerm: Number(values.midTerm),
          finalTerm: Number(values.finalTerm),
        },
      };
      console.log('🚀 ~ onSubmit ~ updateMarksData:', updateMarksData);

      const { data: res, error } = (await updateMarks(
        updateMarksData
      )) as IResponse<any>;
      console.log('🚀 ~ onSubmit ~ res:', res);

      if (error) {
        // Handle API error
        toast.error(error?.data?.message || 'An error occurred.');
      } else {
        // Handle success
        toast.success('Assignment marks updated Successfully');
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
        Update student marks
      </Button>
      <Modal
        title="Update Assignment Marks"
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
                    <TextInput
                      type="text"
                      name="classTest1"
                      placeholder="Class Test 1"
                      size="middle"
                    />
                  </Col>
                  <Col span={24}>
                    <TextInput
                      type="text"
                      name="classTest2"
                      placeholder="Class Test 2"
                      size="middle"
                    />
                  </Col>
                  <Col span={24}>
                    <TextInput
                      type="text"
                      name="midTerm"
                      placeholder="Mid Term"
                      size="middle"
                    />
                  </Col>
                  <Col span={24}>
                    <TextInput
                      type="text"
                      name="finalTerm"
                      placeholder="Final"
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

export default MyStudent;
