import "./style.css";
import { SendOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Typography } from "antd";
import axios from "axios";
import { useState } from "react";

const { Text } = Typography;

const API_KEY = "cd0d60ac-61ad-41f3-9402-20fee3d60c2a";
const API_URL = "https://api.aimlapi.com/v1";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "AI" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { text: input, sender: "User" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await axios.post(
        API_URL,
        { message: input },
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );
      const aiResponse = { text: response.data.reply, sender: "AI" };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error: Unable to get response", sender: "AI" },
      ]);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
      <Col className="h-80 overflow-y-auto p-2 space-y-2 border-b">
        {messages.map((msg, index) => (
          <Card
            key={index}
            className={`p-2 max-w-xs ${
              msg.sender === "User"
                ? "ml-auto bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <Text>{msg.text}</Text>
          </Card>
        ))}
      </Col>
      <footer className="footer ">
        <Input
          size="large"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <Button onClick={handleSendMessage}>
          <SendOutlined size={35} />
        </Button>
      </footer>
    </div>
  );
};

export default ChatApp;
