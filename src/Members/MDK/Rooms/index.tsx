import { useState, useEffect } from "react";
import { db } from "@src/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Space, Typography, Card, Col, Row, Badge, Image, Button } from "antd";
import { Input as MyAntdInput } from "antd";
import { NavLink } from "react-router-dom";
import { useGrid } from "@src/context/view_context";
import feature from "@src/components/icon/feature.svg";

const { Title } = Typography;

const { Search } = MyAntdInput;

const Rooms = () => {
  // set view
  const { grid_view } = useGrid();

  interface Room {
    id: string;
    name: string;
    notify: boolean;
    checkIn: string;
    checkOut: string;
  }

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [showAllRooms, setShowAllRooms] = useState<boolean>(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    const q = query(collection(db, "standard"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const roomsData: Room[] = [];
      querySnapshot.forEach((doc) => {
        roomsData.push({
          id: doc.id,
          name: doc.data().name,
          notify: doc.data().notify,
          checkIn: doc.data().checkIn,
          checkOut: doc.data().checkOut,
        });
      });
      setRooms(roomsData);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const filtered = rooms.filter((room) =>
      room.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredRooms(filtered);
    setShowAllRooms(false);
  }, [rooms, searchKeyword]);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    console.log(value);
  };

  const roomsToDisplay = showAllRooms ? rooms : filteredRooms;

  return (
    <>
      <Row>
        <Search
          style={{ width: "30%", marginBottom: 30 }}
          placeholder="Enter room name..."
          onSearch={handleSearch}
        />
      </Row>
      <Row>
        <Col span={24}>
          <Title level={3} className="!mb-6">
            Standard
          </Title>
        </Col>
        {/* Ràng buộc hiển thị grid/list view */}
        {grid_view ? (
          <>
            {roomsToDisplay.map((room) => {
              const displayBadge = room.notify === true;
              return (
                <Col style={{ flex: "0 0 20%" }} span={5} key={room.id}>
                  {/* Ràng buộc hiển thị grid/list view */}
                  {displayBadge ? (
                    <Badge count={3}>
                      <NavLink to="/standard-detail">
                        <div className="popover">
                          <Card
                            title={room.name}
                            style={{
                              width: 200,
                              height: 160,
                              borderColor: "#ABAFB7",
                            }}
                          >
                            <Space className="flex items-center justify-center">
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            </Space>
                            <Title
                              level={5}
                              className="flex items-center justify-center mt-4"
                            >
                              {room.checkIn} - {room.checkOut}
                            </Title>
                          </Card>
                          <div className="content">
                            <p>Chuẩn bị bữa sáng</p>
                            <p>Lấy thêm mền</p>
                            <p>Đưa thêm đèn đọc sách</p>
                          </div>
                        </div>
                      </NavLink>
                    </Badge>
                  ) : (
                    <NavLink to="/standard-detail">
                      <Card
                        title={room.name}
                        style={{
                          width: 200,
                          height: 160,
                          borderColor: "#ABAFB7",
                        }}
                      >
                        <Space className="flex items-center justify-center">
                          <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                          <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                          <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                        </Space>
                        <Title
                          level={5}
                          className="flex items-center justify-center mt-4"
                        >
                          {room.checkIn} - {room.checkOut}
                        </Title>
                      </Card>
                    </NavLink>
                  )}
                </Col>
              );
            })}
          </>
        ) : (
          <>
            {roomsToDisplay.map((room) => {
              const displayBadge = room.notify === true;
              return (
                <Col
                  style={{ flex: "0 0 100%", marginBottom: "1.5rem" }}
                  key={room.id}
                >
                  {/* Ràng buộc hiển thị badge */}
                  {displayBadge ? (
                    <Badge count={3}>
                      <Row
                        style={{
                          border: " 0.1rem solid rgba(170, 170, 170, 0.4)",
                          padding: "2rem",
                        }}
                      >
                        <Col span={6}>
                          <Card
                            title={room.name}
                            extra={<a href="#">More</a>}
                            style={{
                              width: 200,
                              height: 160,
                              borderColor: "#ABAFB7",
                            }}
                          >
                            <Space className="flex items-center justify-center">
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            </Space>
                            <Title
                              level={5}
                              className="flex items-center justify-center mt-4"
                            >
                              {room.checkIn} - {room.checkOut}
                            </Title>
                          </Card>
                        </Col>
                        <Col span={18}>
                          <div>
                            <Title level={5}>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Dicta at ipsum quae iste totam quam illum
                              officia blanditiis. Ullam voluptas et magnam totam
                              quia facere vitae illo culpa minus eum?
                            </Title>
                            <div className="flex item-center mt-[2.5rem] mb-[2.5rem]">
                              <Image preview={false} src={feature} />
                            </div>
                            <NavLink to="/standard-detail">
                              <Button size="large">READ MORE</Button>
                            </NavLink>
                          </div>
                        </Col>
                      </Row>
                    </Badge>
                  ) : (
                    <Row
                      style={{
                        border: " 0.1rem solid rgba(170, 170, 170, 0.4)",
                        padding: "2rem",
                      }}
                    >
                      <Col span={6}>
                        <Card
                          title={room.name}
                          extra={<a href="#">More</a>}
                          style={{
                            width: 200,
                            height: 160,
                            borderColor: "#ABAFB7",
                          }}
                        >
                          <Space className="flex items-center justify-center">
                            <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                          </Space>
                          <Title
                            level={5}
                            className="flex items-center justify-center mt-4"
                          >
                            {room.checkIn} - {room.checkOut}
                          </Title>
                        </Card>
                      </Col>
                      <Col span={18}>
                        <div>
                          <Title level={5}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dicta at ipsum quae iste totam quam illum
                            officia blanditiis. Ullam voluptas et magnam totam
                            quia facere vitae illo culpa minus eum?
                          </Title>
                          <div className="flex item-center mt-[2.5rem] mb-[2.5rem]">
                            <Image preview={false} src={feature} />
                          </div>
                          <NavLink to="/standard-detail">
                            <Button size="large">READ MORE</Button>
                          </NavLink>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Col>
              );
            })}
          </>
        )}
      </Row>
      <Row className="!my-6">
        <Col span={24}>
          <Title level={3} className="!mb-6">
            Double
          </Title>
        </Col>
        {/* Ràng buộc hiển thị grid/list view */}
        {grid_view ? (
          <>
            {roomsToDisplay.map((room) => {
              const displayBadge = room.notify === true;
              return (
                <Col style={{ flex: "0 0 20%" }} span={5} key={room.id}>
                  {/* Ràng buộc hiển thị grid/list view */}
                  {displayBadge ? (
                    <Badge count={3}>
                      <NavLink to="/double-detail">
                        <div className="popover">
                          <Card
                            title={room.name}
                            style={{
                              width: 200,
                              height: 160,
                              borderColor: "#ABAFB7",
                            }}
                          >
                            <Space className="flex items-center justify-center">
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            </Space>
                            <Title
                              level={5}
                              className="flex items-center justify-center mt-4"
                            >
                              {room.checkIn} - {room.checkOut}
                            </Title>
                          </Card>
                          <div className="content">
                            <p>Chuẩn bị bữa sáng</p>
                            <p>Lấy thêm mền</p>
                            <p>Đưa thêm đèn đọc sách</p>
                          </div>
                        </div>
                      </NavLink>
                    </Badge>
                  ) : (
                    <NavLink to="/double-detail">
                      <Card
                        title={room.name}
                        style={{
                          width: 200,
                          height: 160,
                          borderColor: "#ABAFB7",
                        }}
                      >
                        <Space className="flex items-center justify-center">
                          <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                          <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                          <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                        </Space>
                        <Title
                          level={5}
                          className="flex items-center justify-center mt-4"
                        >
                          {room.checkIn} - {room.checkOut}
                        </Title>
                      </Card>
                    </NavLink>
                  )}
                </Col>
              );
            })}
          </>
        ) : (
          <>
            {roomsToDisplay.map((room) => {
              const displayBadge = room.notify === true;
              return (
                <Col
                  style={{ flex: "0 0 100%", marginBottom: "1.5rem" }}
                  key={room.id}
                >
                  {/* Ràng buộc hiển thị badge */}
                  {displayBadge ? (
                    <Badge count={3}>
                      <Row
                        style={{
                          border: " 0.1rem solid rgba(170, 170, 170, 0.4)",
                          padding: "2rem",
                        }}
                      >
                        <Col span={6}>
                          <Card
                            title={room.name}
                            extra={<a href="#">More</a>}
                            style={{
                              width: 200,
                              height: 160,
                              borderColor: "#ABAFB7",
                            }}
                          >
                            <Space className="flex items-center justify-center">
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            </Space>
                            <Title
                              level={5}
                              className="flex items-center justify-center mt-4"
                            >
                              {room.checkIn} - {room.checkOut}
                            </Title>
                          </Card>
                        </Col>
                        <Col span={18}>
                          <div>
                            <Title level={5}>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Dicta at ipsum quae iste totam quam illum
                              officia blanditiis. Ullam voluptas et magnam totam
                              quia facere vitae illo culpa minus eum?
                            </Title>
                            <div className="flex item-center mt-[2.5rem] mb-[2.5rem]">
                              <Image preview={false} src={feature} />
                            </div>
                            <NavLink to="/double-detail">
                              <Button size="large">READ MORE</Button>
                            </NavLink>
                          </div>
                        </Col>
                      </Row>
                    </Badge>
                  ) : (
                    <Row
                      style={{
                        border: " 0.1rem solid rgba(170, 170, 170, 0.4)",
                        padding: "2rem",
                      }}
                    >
                      <Col span={6}>
                        <Card
                          title={room.name}
                          extra={<a href="#">More</a>}
                          style={{
                            width: 200,
                            height: 160,
                            borderColor: "#ABAFB7",
                          }}
                        >
                          <Space className="flex items-center justify-center">
                            <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                          </Space>
                          <Title
                            level={5}
                            className="flex items-center justify-center mt-4"
                          >
                            {room.checkIn} - {room.checkOut}
                          </Title>
                        </Card>
                      </Col>
                      <Col span={18}>
                        <div>
                          <Title level={5}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dicta at ipsum quae iste totam quam illum
                            officia blanditiis. Ullam voluptas et magnam totam
                            quia facere vitae illo culpa minus eum?
                          </Title>
                          <div className="flex item-center mt-[2.5rem] mb-[2.5rem]">
                            <Image preview={false} src={feature} />
                          </div>
                          <NavLink to="/double-detail">
                            <Button size="large">READ MORE</Button>
                          </NavLink>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Col>
              );
            })}
          </>
        )}
      </Row>
      <Row>
        <Col span={24}>
          <Title level={3} className="!mb-6">
            King
          </Title>
        </Col>
        {/* Ràng buộc hiển thị grid/list view */}
        {grid_view ? (
          <>
            {roomsToDisplay.map((room) => {
              const displayBadge = room.notify === true;
              return (
                <Col style={{ flex: "0 0 20%" }} span={5} key={room.id}>
                  {/* Ràng buộc hiển thị grid/list view */}
                  {displayBadge ? (
                    <Badge count={3}>
                      <NavLink to="/king-detail">
                        <div className="popover">
                          <Card
                            title={room.name}
                            style={{
                              width: 200,
                              height: 160,
                              borderColor: "#ABAFB7",
                            }}
                          >
                            <Space className="flex items-center justify-center">
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            </Space>
                            <Title
                              level={5}
                              className="flex items-center justify-center mt-4"
                            >
                              {room.checkIn} - {room.checkOut}
                            </Title>
                          </Card>
                          <div className="content">
                            <p>Chuẩn bị bữa sáng</p>
                            <p>Lấy thêm mền</p>
                            <p>Đưa thêm đèn đọc sách</p>
                          </div>
                        </div>
                      </NavLink>
                    </Badge>
                  ) : (
                    <NavLink to="/king-detail">
                      <Card
                        title={room.name}
                        style={{
                          width: 200,
                          height: 160,
                          borderColor: "#ABAFB7",
                        }}
                      >
                        <Space className="flex items-center justify-center">
                          <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                          <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                          <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                        </Space>
                        <Title
                          level={5}
                          className="flex items-center justify-center mt-4"
                        >
                          {room.checkIn} - {room.checkOut}
                        </Title>
                      </Card>
                    </NavLink>
                  )}
                </Col>
              );
            })}
          </>
        ) : (
          <>
            {roomsToDisplay.map((room) => {
              const displayBadge = room.notify === true;
              return (
                <Col
                  style={{ flex: "0 0 100%", marginBottom: "1.5rem" }}
                  key={room.id}
                >
                  {/* Ràng buộc hiển thị badge */}
                  {displayBadge ? (
                    <Badge count={3}>
                      <Row
                        style={{
                          border: " 0.1rem solid rgba(170, 170, 170, 0.4)",
                          padding: "2rem",
                        }}
                      >
                        <Col span={6}>
                          <Card
                            title={room.name}
                            extra={<a href="#">More</a>}
                            style={{
                              width: 200,
                              height: 160,
                              borderColor: "#ABAFB7",
                            }}
                          >
                            <Space className="flex items-center justify-center">
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                              <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            </Space>
                            <Title
                              level={5}
                              className="flex items-center justify-center mt-4"
                            >
                              {room.checkIn} - {room.checkOut}
                            </Title>
                          </Card>
                        </Col>
                        <Col span={18}>
                          <div>
                            <Title level={5}>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Dicta at ipsum quae iste totam quam illum
                              officia blanditiis. Ullam voluptas et magnam totam
                              quia facere vitae illo culpa minus eum?
                            </Title>
                            <div className="flex item-center mt-[2.5rem] mb-[2.5rem]">
                              <Image preview={false} src={feature} />
                            </div>
                            <NavLink to="/king-detail">
                              <Button size="large">READ MORE</Button>
                            </NavLink>
                          </div>
                        </Col>
                      </Row>
                    </Badge>
                  ) : (
                    <Row
                      style={{
                        border: " 0.1rem solid rgba(170, 170, 170, 0.4)",
                        padding: "2rem",
                      }}
                    >
                      <Col span={6}>
                        <Card
                          title={room.name}
                          extra={<a href="#">More</a>}
                          style={{
                            width: 200,
                            height: 160,
                            borderColor: "#ABAFB7",
                          }}
                        >
                          <Space className="flex items-center justify-center">
                            <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                            <div className="circle rounded-full bg-[#D9D9D9] w-[30px] h-[30px]"></div>
                          </Space>
                          <Title
                            level={5}
                            className="flex items-center justify-center mt-4"
                          >
                            {room.checkIn} - {room.checkOut}
                          </Title>
                        </Card>
                      </Col>
                      <Col span={18}>
                        <div>
                          <Title level={5}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dicta at ipsum quae iste totam quam illum
                            officia blanditiis. Ullam voluptas et magnam totam
                            quia facere vitae illo culpa minus eum?
                          </Title>
                          <div className="flex item-center mt-[2.5rem] mb-[2.5rem]">
                            <Image preview={false} src={feature} />
                          </div>
                          <NavLink to="/king-detail">
                            <Button size="large">READ MORE</Button>
                          </NavLink>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Col>
              );
            })}
          </>
        )}
      </Row>
    </>
  );
};

export default Rooms;
