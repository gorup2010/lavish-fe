import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReturnIcon = () => {
  const navigate = useNavigate();

  return (
    <button className="flex items-center gap-2" onClick={() => navigate(-1)}>
      <Undo2 strokeWidth={1} />
      Return
    </button>
  );
};

export default ReturnIcon;
