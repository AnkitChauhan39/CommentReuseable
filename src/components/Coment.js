import { useState, useRef, useEffect } from "react";
import { BsCaretUpFill } from "react-icons/bs";
import { BsCaretDownFill } from "react-icons/bs";
import { RiStarSFill } from "react-icons/ri";
import { RiStarSLine } from "react-icons/ri";

const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  sortorder,
  comment,
}) => {
  const [Like, setlike] = useState(false);
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode, comment]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <div className="p-3">
      <div className={comment.id === 1 ? "" : "flex flex-col border-4 border-black rounded-md w-[400px] text-[18px] p-3 bg-gray-700 text-white"}>
        {comment.id === 1 ? (
          <div className="flex gap-6">
            <input
              type="text"
              className=" w-[500px] px-4 py-2 border-2 border-black text-[20px] "
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type..."
            />

            <div
              className="flex justify-center items-center bg-blue-500 rounded-md px-3 text-white font-bold  "
              onClick={onAddComment}
            >
              COMMENT
            </div>
          </div>
        ) : (
          <div className="relative ">
            <span className="flex"
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </span>
            <div className="absolute bottom-[4px] right-[4px] ">
              {Like ? (
                <RiStarSFill onClick={() => {
                  setlike(!Like)
                }}
                  className="text-[24px] text-yellow-400" />
              ) : (
                <RiStarSLine onClick={() => {
                  setlike(!Like)
                }}
                  className="text-[22px] " />
              )}
            </div>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <div className="text-[13px] p-2 flex gap-3 ">
                  <div
                    onClick={onAddComment}
                  >
                    SAVE
                  </div>
                  <div
                    onClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  >
                    CANCEL
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-[14px] font-bold p-1 flex gap-2">
                    {expand ? (
                      <BsCaretUpFill width="10px" height="10px" />
                    ) : (
                      <BsCaretDownFill width="10px" height="10px" />
                    )}
                    <button
                      onClick={handleNewComment}
                    >
                      REPLY
                    </button>
                  </div>

                  <button
                    className="text-[14px] font-bold p-1"
                    onClick={() => {
                      setEditMode(true);
                    }
                    }
                  >
                    EDIT
                  </button>
                  <button
                    className="text-[14px] font-bold p-1"
                    onClick={handleDelete}
                  >
                    DELETE
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <button
            className="text-[14px] p-1 font-semibold"
              onClick={onAddComment}
            >
              REPLY
            </button>
            <button
            className="text-[14px] font-semibold "
            onClick={() => {
              setShowInput(false);
              if (!comment?.items?.length) setExpand(false);
            }}
            >
            CANCEL
            </button>
          </div>
        )}
        {
          comment?.items?.map((cmnt) => {
            return (
              <Comment
                key={cmnt.id}
                handleInsertNode={handleInsertNode}
                handleEditNode={handleEditNode}
                handleDeleteNode={handleDeleteNode}
                comment={cmnt}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Comment;