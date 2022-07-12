import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill , { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./index.css";
import Editor from "react-quill/lib/toolbar";
import axios from "axios";
// import { selectUser } from "../../feature/userSlice";
import { useHistory } from "react-router-dom";
// import ChipsArray from "./TagsInput";
import ImageUploader from "quill-image-uploader";
//import ImageResize from "quill-image-resize-module-react";

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);
function QuillEditor(props) {
  const [body, setBody] = React.useState(props.body);

    useEffect(() => {
      setBody(props.body);
    }, [props.body]);

  // const user = useSelector(selectUser);
  var toolbarOptions = [
    // ["bold", "italic", "underline", "strike"], // toggled buttons
    ["bold", "italic"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    // [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],

    // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    // [{ font: [] }],
    [{ align: [] }],
    ["link"],
    ["image"],

    // ["clean"], // remove formatting button
  ];
  Editor.modules = {
    // syntax: false,
    toolbar: toolbarOptions,
    // imageUploader: {
    //   upload: (file) => {
    //     return new Promise((resolve, reject) => {
    //       const formData = new FormData();
    //       formData.append("file", file);
    //        axios.post(`http://localhost:3001/uploadImage`, formData)
    //       .then(response => {
    //           console.log("inside")
    //           if (response.status === 200) {
    //               console.log("success")
    //               console.log("response",response.data)
    //                resolve("http://localhost:3001/download-file/"+response.data.itemImage);
    //           }
    //           else
    //           {
    //            reject("Upload failed");
    //           }
    //       });
    //      });
    //   }
    // },
     clipboard: {
       // toggle to add extra line breaks when pasting HTML:
       matchVisual: true,
     },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

 
  // const handleQuill = (value) => {
  //   setBody(value);
  // };

  const onChange = (content, delta, source, editor) => {
       //console.log("onchange event",value)
     setBody(content);
     props.onChange(content);
     props.shortText(editor.getText())
    // console.log(editor.getHTML())
  };
  return (
    <ReactQuill
    value={body}
    // onBlur={onBlur}
     onChange={onChange}
    modules={Editor.modules}
    className="react-quill"
    theme="snow"
  />
   
  );
}

export default QuillEditor;
