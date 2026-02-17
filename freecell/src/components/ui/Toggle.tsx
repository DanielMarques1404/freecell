import { useEffect, useState } from "react";

export const ToggleButton = ({
  state,
  toggle,
}: {
  state: boolean;
  toggle: () => void;
}) => {
  const [active, setActive] = useState(state);

  useEffect(() => {
    setActive(state);
  }, [state]);

  return (
    <div className="relative w-12 h-7 border-2 border-white rounded-2xl px-2 py-1">
      <div
        className={`absolute w-4 h-4 cursor-pointer rounded-full ${active ? "left-6 bg-white" : "left-1 bg-gray-700"}`}
        onClick={() => {
          toggle();
          setActive(!active);
        }}
      ></div>
    </div>
  );
};
