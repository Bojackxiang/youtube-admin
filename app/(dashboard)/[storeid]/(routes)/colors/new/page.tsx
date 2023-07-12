import React from "react";
import ColorForm from "../components/ColorForm";

const NewColorPage = async () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={null} />
      </div>
    </div>
  );
};

export default NewColorPage;
