import React from "react";
import { FiX } from "react-icons/fi";
import { useCompare } from "../CompareContext";

type CompareTrayProps = {
    onCompare: () => void;
};

const CompareTray: React.FC<CompareTrayProps> = ({ onCompare }) => {
    const { compared, removeProduct, clear } = useCompare();

    if (compared.length === 0) return null;

    return (
        <div
            className="
        w-full bg-white shadow border border-gray-200 rounded-2xl
        px-4 py-2 mb-6 flex flex-wrap items-end flex-col sm:flex-row sm:items-start gap-3
        min-h-[56px]
      "
        >
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
                {compared.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center bg-gray-100 rounded-lg pl-2 pr-1 py-1 relative max-w-xs"
                    >
                        <img
                            src={`/assets/images/${item.image_url}.avif`}
                            alt={item.name}
                            className="w-7 h-7 object-cover rounded mr-2"
                        />
                        <span className="text-xs font-medium text-gray-800 truncate max-w-[84px]">{item.name}</span>
                        <button
                            onClick={() => removeProduct(item.id)}
                            aria-label="Remove"
                            className="ml-1 text-gray-300 hover:text-red-500 p-0.5 rounded transition"
                            style={{ lineHeight: 1 }}
                            tabIndex={0}
                            title="Remove"
                            type="button"
                        >
                            <FiX size={13} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 pl-2 flex-shrink-0">
                <button
                    className="px-4 h-10 text-sm font-medium rounded bg-blue-600 text-white disabled:opacity-60 shadow whitespace-nowrap flex items-center"
                    disabled={compared.length < 2}
                    onClick={onCompare}
                    style={{ minWidth: 90 }}
                >
                    Compare
                </button>
                <button
                    onClick={clear}
                    aria-label="Clear all"
                    className="text-gray-500 hover:text-red-500 p-2 rounded-full transition active:scale-95"
                    title="Clear"
                    type="button"
                >
                    <FiX className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default CompareTray;
