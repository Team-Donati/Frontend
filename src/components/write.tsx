import { useWrite } from "../hooks/useWrite";
import { useState } from "react";

const Write = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const { write } = useWrite(
    "0xDb7481A5E42a5f0bf95BAfb4A050BfeFfd115Bc6",
    content
  );

  const handleWriteBtn = async () => {
    write(content);
  };

  return (
    <div>
      <div className="letter_send_img"></div>
      <input
        type="text"
        id="letter_input"
        name="letter_input"
        placeholder="To. my donor,"
        value={content}
        onChange={handleContentChange}
      ></input>
      <div
        className="send_btn"
        onClick={() => {
          handleWriteBtn();
        }}
      ></div>
    </div>
  );
};

export default Write;
