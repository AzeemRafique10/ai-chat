import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Tooltip } from "antd";
import "./style.css";
function Footer() {
  return (
    <footer className="footer">
      <Row gutter={[8, 16]} style={{ justifyContent: "center" }}>
        <Col span={12}>
          <Input
            size="large"
            placeholder="Basic usage"
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={1}>
          <Tooltip title="search">
            <Button
              size="large"
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
            />
          </Tooltip>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
