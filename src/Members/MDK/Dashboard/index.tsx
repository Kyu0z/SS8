import { Col, Row } from "antd";
import { Layout, Space, Typography } from "antd";
import View from "../Sort/View";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import Rooms from "../Rooms";

const { Title } = Typography;

const Dashboard = () => {
  return (
    <div>
      <Row style={{ margin: "1rem" }}>
        <Col span={20} push={4}>
          <Layout>
            <HeaderPage />
          </Layout>
          <Space className="flex items-center justify-between my-5 ml-[1rem]">
            <Space className="flex items-center">
              <Title
                level={3}
                className="relative top-[2px] font-extrabold mr-[1rem] ml-[2rem]"
              >
                Room List
              </Title>
            </Space>
            <View />
          </Space>
          <div className="ml-[3rem]">
            <Rooms />
          </div>
        </Col>
        <Col span={4} pull={20}>
          <Sidebar />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
