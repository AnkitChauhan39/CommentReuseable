import { useState ,useEffect } from "react";
import Comment from "./components/Coment";
import useNode from "./hooks/customhook";
import Navbar from "./components/navbar";
import "./App.css"


const comments = {
  id: 1,
  items: [],
};


const App = () => {
  const [commentsData, setCommentsData] = useState(comments);

  const [sortorder , setSortOrder] = useState("Latest-oldest")

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
    
  };
 
  useEffect(() => {
    const comm = commentsData
    console.log(sortorder)
    if(sortorder === "Oldest-latest")
    {
      comm.items.sort(comm.items.id);
    }
    if(sortorder === "Latest-oldest")
    {
      comm.items.sort(comm.items.id)
      comm.items.reverse()
    }
    if(sortorder === "Replies")
    {
      comm.items.reverse(comm.items.count)
    }
    setCommentsData(comm)
    console.log(commentsData);
  },[sortorder,commentsData]);

  return (
    <div>
     <Navbar/>
     <div className="flex flex-col justify-center items-center py-6 border-4 w-[800px] mx-auto my-5 rounded-md" >
      <div className="flex gap-4 ">

        <button className="border-2 py-2 px-3"
        onClick={ () => {
          setSortOrder("Latest-oldest")
        }}
        >Latest-oldest</button>

        <button
        className="border-2 py-2 px-3"
        onClick={ () => {
          setSortOrder("Oldest-latest")
        }}
        >Oldest-Latest</button>

      </div>
      <Comment 
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
      />
      </div>
    </div>
  );
};

export default App;
