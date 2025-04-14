import React, { createContext, useCallback, useContext, useState } from "react";
import { IoCheckmarkDone, IoCloseCircle, IoInformation } from "react-icons/io5";
const dataContext = createContext();
const DataContext = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(({message, type = "info", duration = 4000}) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);
  return (
    <dataContext.Provider value={{ showToast, useData }}>
      {children}

      {toast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`px-4 py-2 rounded-xl text-white shadow-lg flex gap-3 justify-center text-xs md:text-sm items-center ${
              toast.type === "error"
                ? "bg-red-600"
                : toast.type === "success"
                ? "bg-green-600"
                : "bg-blue-600"
            }`}
          >
           {
            toast.type=="error"? <IoCloseCircle size={16}/>:toast.type=='success'?<IoCheckmarkDone size={19}/>:<IoInformation size={19}/>
           } {toast.message}
          </div>
        </div>
      )}
    </dataContext.Provider>
  );
};

export default DataContext;

export const useData = () => {
  return useContext(dataContext);
};
