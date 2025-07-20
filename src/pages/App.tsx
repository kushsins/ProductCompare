import { useState, useRef, useEffect } from "react";
import { useCompare } from "../CompareContext";
import CompareTable from "../ui/CompareTable";
import CompareTray from "../ui/CompareTray";
import ProductList from "../ui/ProductList";

function App() {
  const [showTable, setShowTable] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const { compared } = useCompare();


  useEffect(() => {
    if (compared.length >= 2) {
      setShowTable(true);
    }else{
      setShowTable(false);
    }
  }, [compared]);

  const handleCompare = () => {
    setShowTable(true);
    setTimeout(() => tableRef.current?.scrollIntoView({ behavior: 'smooth' }), 200);
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center flex-col container p-4">
        <CompareTray onCompare={handleCompare} />
        <ProductList />
        {showTable && (
          <div ref={tableRef} className="w-full">
            <CompareTable products={compared} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
