import { useState } from "react";

const useMessage = () => {
  const [currentProcess, setCurrentProcess] = useState(undefined);

  const [isAnswering, setIsAnswering] = useState(false);

  return { currentProcess, setCurrentProcess, isAnswering, setIsAnswering };
};

export default useMessage;
