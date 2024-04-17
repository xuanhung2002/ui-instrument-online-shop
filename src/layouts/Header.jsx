import DropdownComponent from "../components/DropdownComponent";
import SearchComponent from "../components/SearchComponent";
import { Row, Col } from "antd";
import { Image, Button } from "antd";
import HeaderItemComponent from "../components/HeaderItemComponent";
import { FormOutlined } from "@ant-design/icons";

export default function Header() {
  return (
    <div style={{ backgroundColor: "#d9f0fa" }}>
      <Row align="middle" justify="space-evenly">
        <Col>
          <Row align="middle">
            <Col>
              <Image
                width={200}
                height={70}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png"
              />
            </Col>
            <Col>
              <DropdownComponent />
            </Col>
          </Row>
        </Col>

        <Col>
          <SearchComponent />
        </Col>

        <Col>
          <HeaderItemComponent />
        </Col>  
        <Col>
          <Button type="primary" icon={<FormOutlined />}>
            Post
          </Button>
        </Col> 
      </Row>
    </div>
  );
}
